// Reads a rendered page of the Next.js site and dumps a style tree that convert.py turns into Elementor data.
// usage: node extract.js <outdir> <width> <route...>
const { chromium } = require('playwright');
const fs = require('fs');
const [outdir, widthArg, ...routes] = process.argv.slice(2);
const W = parseInt(widthArg, 10);

const COMPUTED = ['display','position','flexDirection','flexWrap','justifyContent','alignItems','alignSelf','alignContent','rowGap','columnGap',
  'gridTemplateColumns','gridTemplateRows','gridColumnStart','gridColumnEnd','gridAutoFlow',
  'paddingTop','paddingRight','paddingBottom','paddingLeft','marginTop','marginRight','marginBottom','marginLeft',
  'backgroundColor','backgroundImage','backgroundSize','backgroundPosition','backgroundRepeat',
  'borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle',
  'borderTopColor','borderRightColor','borderBottomColor','borderLeftColor',
  'borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius','boxShadow',
  'color','fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing','textTransform','textAlign','textDecorationLine','whiteSpace',
  'top','right','bottom','left','zIndex','opacity','overflow','overflowX','objectFit','objectPosition','aspectRatio','visibility',
  'width','height','maxWidth','minHeight','flexGrow','flexShrink','flexBasis','mixBlendMode','filter','backdropFilter','listStyleType','transform','order','maskImage','webkitMaskImage','clipPath'];
const AUTHORED = ['width','max-width','min-width','height','min-height','max-height','flex','flex-grow','flex-shrink','flex-basis',
  'grid-template-columns','grid-column','aspect-ratio','margin-left','margin-right','margin-inline','margin','top','left','right','bottom','inset','align-self','justify-self'];

const PAGE_FN = (args) => {
  const { COMPUTED, AUTHORED } = args;
  // ---- authored cascade from CSSOM ----
  const rules = [];
  let order = 0;
  const spec = (sel) => {
    let s = sel.replace(/::?(before|after|placeholder|selection|-webkit-[a-z-]+)/g, '');
    let a = (s.match(/#[\w-]+/g) || []).length;
    let b = (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!not|is|where|has)[\w-]+(\([^)]*\))?/g) || []).length;
    let c = (s.replace(/\[[^\]]+\]|\([^)]*\)/g, '').match(/(^|[\s>+~])[a-zA-Z][\w-]*/g) || []).length;
    return a * 10000 + b * 100 + c;
  };
  const collect = (list, media) => {
    for (const r of list) {
      if (r.type === 1) {
        const parts = r.selectorText.split(',').map(s => s.trim()).filter(s => !/::?(before|after|placeholder|-webkit)/.test(s) && !/:hover|:focus|:active/.test(s));
        if (parts.length) rules.push({ parts, media, style: r.style, order: order++ });
      } else if (r.type === 4) {
        collect(r.cssRules, media ? media + ' and ' + r.conditionText : r.conditionText);
      } else if (r.cssRules) {
        collect(r.cssRules, media);
      }
    }
  };
  for (const ss of document.styleSheets) { try { collect(ss.cssRules, null); } catch (e) {} }
  const live = rules.filter(r => !r.media || window.matchMedia(r.media).matches);
  const authored = (el) => {
    const out = {};
    const matched = [];
    for (const r of live) {
      let best = -1;
      for (const p of r.parts) { try { if (el.matches(p)) best = Math.max(best, spec(p)); } catch (e) {} }
      if (best >= 0) matched.push([best, r.order, r.style]);
    }
    matched.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    for (const [, , st] of matched) for (const p of AUTHORED) { const v = st.getPropertyValue(p); if (v) out[p] = v; }
    for (const p of AUTHORED) { const v = el.style.getPropertyValue(p); if (v && p !== 'transform') out[p] = v; }
    // CSS custom properties set inline (hero image etc.)
    return out;
  };
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META', 'TEMPLATE']);
  let eid = 0;
  const pick = (cs) => { const o = {}; for (const k of COMPUTED) o[k] = cs[k]; return o; };
  const pseudo = (el, which) => {
    const cs = getComputedStyle(el, which);
    if (!cs || cs.content === 'none' || cs.content === 'normal') return null;
    return { content: cs.content, width: cs.width, height: cs.height, bg: cs.backgroundColor, radius: cs.borderTopLeftRadius, position: cs.position, display: cs.display, top: cs.top, marginTop: cs.marginTop };
  };
  const walk = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const node = { eid: eid++, tag: el.tagName.toLowerCase(), cls: el.getAttribute('class') || '', cs: pick(cs), au: authored(el),
      rect: [Math.round(r.left), Math.round(r.top + window.scrollY), Math.round(r.width), Math.round(r.height)], kids: [] };
    const attrs = {};
    for (const a of ['href', 'src', 'alt', 'type', 'placeholder', 'aria-label', 'name', 'poster', 'id', 'role', 'aria-current', 'data-open', 'data-active', 'target', 'data-answer', 'data-was-open']) {
      if (el.hasAttribute(a)) attrs[a] = el.getAttribute(a);
    }
    if (el.tagName === 'IMG') attrs.currentSrc = el.currentSrc;
    node.attrs = attrs;
    const b = pseudo(el, '::before'), a = pseudo(el, '::after');
    if (b) node.before = b; if (a) node.after = a;
    if (el.tagName === 'svg' || el.tagName === 'SVG' || el.namespaceURI === 'http://www.w3.org/2000/svg') {
      // resolve currentColor so the exported file keeps its colour
      const clone = el.cloneNode(true);
      const color = cs.color;
      const fix = (src, dst) => {
        const s = getComputedStyle(src);
        for (const p of ['fill', 'stroke']) {
          const att = src.getAttribute(p);
          if (att === 'currentColor' || (att === null && src === el && p === 'fill' && false)) dst.setAttribute(p, s[p] === 'none' ? 'none' : s.color);
          else if (att && att.includes('currentColor')) dst.setAttribute(p, s.color);
        }
        if (src.getAttribute('style') && src.getAttribute('style').includes('currentColor')) dst.setAttribute('style', src.getAttribute('style').replace(/currentColor/g, s.color));
        for (let i = 0; i < src.children.length; i++) fix(src.children[i], dst.children[i]);
      };
      fix(el, clone);
      if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      if (!clone.getAttribute('fill') && el.getAttribute('fill') === null) { /* default black fill is fine */ }
      clone.setAttribute('width', Math.round(r.width)); clone.setAttribute('height', Math.round(r.height));
      node.svg = clone.outerHTML; node.color = color;
      return node;
    }
    for (const c of el.childNodes) {
      if (c.nodeType === 3) { const t = c.textContent; if (t.trim()) node.kids.push({ text: t }); else if (t.length) node.kids.push({ text: ' ', ws: true }); }
      else if (c.nodeType === 1 && !SKIP.has(c.tagName)) {
        const ccs = getComputedStyle(c);
        if (ccs.display === 'none' && c.tagName !== 'BR') { node.kids.push({ hidden: true, tag: c.tagName.toLowerCase(), cls: c.getAttribute('class') || '', eid: eid++, html: c.outerHTML.length < 4000 ? c.outerHTML : '' }); continue; }
        node.kids.push(walk(c));
      }
    }
    return node;
  };
  return walk(document.body);
};

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: 900 }, reducedMotion: 'no-preference' });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto('http://localhost:3000' + r, { waitUntil: 'networkidle' });
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h + 900; y += 400) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(1200);
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(300);
    // freeze motion: clear framer inline transforms/opacity
    await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
    await p.evaluate(() => document.querySelectorAll('[style]').forEach(e => { e.style.transform = ''; e.style.opacity = ''; }));
    // FAQ answers only exist in the DOM while open: open each one and keep its text on the item.
    await p.evaluate(async () => {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      const items = [...document.querySelectorAll('.faq__item')];
      items.forEach((it, i) => { it.dataset.idx = i; if (it.dataset.open === 'true') it.dataset.wasOpen = '1'; });
      for (const it of items) {
        const btn = it.querySelector('.faq__q');
        if (!it.querySelector('.faq__a') && btn && !btn.disabled) { btn.click(); await wait(450); }
        const a = it.querySelector('.faq__a');
        it.dataset.answer = a ? a.innerHTML : '';
      }
      const first = items.find(it => it.dataset.wasOpen === '1');
      if (first && !first.querySelector('.faq__a')) { first.querySelector('.faq__q').click(); await wait(450); }
    });
    const tree = await p.evaluate(PAGE_FN, { COMPUTED, AUTHORED });
    const name = r === '/' ? 'home' : r.slice(1).replace(/\//g, '__');
    fs.writeFileSync(`${outdir}/${name}.${W}.json`, JSON.stringify(tree));
    console.log(name, W, JSON.stringify(tree).length);
  }
  await b.close();
})();
