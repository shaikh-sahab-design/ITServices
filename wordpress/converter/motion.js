// Records Framer Motion start states (inline opacity/transform in the server HTML) keyed by the same DOM paths convert.py uses.
// usage: node motion.js <outdir> <route...>
const { chromium } = require('playwright');
const fs = require('fs');
const [outdir, ...routes] = process.argv.slice(2);
const SKIP = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META', 'TEMPLATE'];

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto('http://localhost:3000' + r, { waitUntil: 'load' });
    const out = await p.evaluate((SKIP) => {
      const res = {};
      const walk = (el, path) => {
        if (el.namespaceURI === 'http://www.w3.org/2000/svg') return;
        let i = 0;
        for (const c of el.children) {
          if (SKIP.includes(c.tagName)) continue;
          const p = `${path}/${c.tagName.toLowerCase()}.${(c.getAttribute('class') || '').split(' ')[0]}${i}`;
          i++;
          const st = c.style;
          const o = st.opacity, t = st.transform;
          const vars = [...st].filter(n => n.startsWith('--')).map(n => `${n}:${st.getPropertyValue(n).trim()}`);
          if (vars.length) (res.__vars__ = res.__vars__ || {})[p] = vars;
          if ((o !== '' && parseFloat(o) < 1) || (t && t !== 'none' && !/^translate[XY]?\(0(px|%)?\)$|^none$/.test(t))) {
            res[p] = { o: o === '' ? null : parseFloat(o), t: t || null, cls: c.getAttribute('class') || '' };
          }
          walk(c, p);
        }
      };
      walk(document.body, '');
      return res;
    }, SKIP);
    const name = r === '/' ? 'home' : r.slice(1).replace(/\//g, '__');
    fs.writeFileSync(`${outdir}/${name}.json`, JSON.stringify(out));
    console.log(name, Object.keys(out).length);
  }
  await b.close();
})();
