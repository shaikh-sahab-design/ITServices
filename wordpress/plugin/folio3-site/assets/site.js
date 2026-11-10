/* Folio3 site behaviour: header menu and mobile sheet, current-page marks, small UI states. */
(function () {
  'use strict';
  var norm = function (p) { return p.replace(/\/+$/, '') || '/'; };
  var here = norm(location.pathname);

  // Mark links to the current page (nav, mega menu, sheet).
  document.querySelectorAll('.f3-nav a[href]').forEach(function (a) {
    try { if (norm(new URL(a.href, location.href).pathname) === here) a.setAttribute('aria-current', 'page'); } catch (e) {}
  });
  var nav = document.querySelector('.f3-nav');
  if (nav) {
    var services = ['/services'];
    nav.querySelectorAll('.f3-mega a[href]').forEach(function (a) { try { services.push(norm(new URL(a.href).pathname)); } catch (e) {} });
    if (services.indexOf(here) > -1) nav.classList.add('is-services');
    // Top-level links stay current across their section (case studies, blog posts, service pages).
    nav.querySelectorAll('.f3-nav__link a[href], .f3-nav__sheet-link a[href]').forEach(function (a) {
      try {
        var p = norm(new URL(a.href).pathname);
        var inSection = p !== '/' && here.indexOf(p + '/') === 0;
        var isServices = p === '/services' && services.indexOf(here) > -1;
        if (inSection || isServices) a.setAttribute('aria-current', 'page');
      } catch (e) {}
    });
    var burger = nav.querySelector('.f3-nav__burger'), sheetToggle = nav.querySelector('.f3-nav__sheet-toggle');
    if (burger) { burger.setAttribute('role', 'button'); burger.setAttribute('tabindex', '0'); burger.setAttribute('aria-label', 'Open menu'); burger.setAttribute('aria-expanded', 'false'); }
    if (sheetToggle) { sheetToggle.setAttribute('role', 'button'); sheetToggle.setAttribute('tabindex', '0'); sheetToggle.setAttribute('aria-label', 'Show all services'); }
    var mo = new MutationObserver(function () {
      if (burger) { var o = nav.classList.contains('is-open'); burger.setAttribute('aria-expanded', String(o)); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); }
      if (sheetToggle) sheetToggle.setAttribute('aria-label', nav.classList.contains('is-services-open') ? 'Hide services' : 'Show all services');
    });
    mo.observe(nav, { attributes: true, attributeFilter: ['class'] });
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var on = function (sel, fn) { var el = nav.querySelector(sel); if (el) el.addEventListener('click', fn); };
    on('.f3-nav__burger', function (e) { e.preventDefault(); nav.classList.toggle('is-open'); document.documentElement.style.overflow = nav.classList.contains('is-open') ? 'hidden' : ''; });
    on('.f3-nav__sheet-toggle', function (e) { e.preventDefault(); nav.classList.toggle('is-services-open'); });
    var toggle = nav.querySelector('.f3-nav__toggle');
    if (toggle) { toggle.setAttribute('role', 'button'); toggle.setAttribute('tabindex', '0'); toggle.setAttribute('aria-label', 'Show services menu'); toggle.setAttribute('aria-expanded', 'false'); }
    var closeMega = function () { nav.classList.remove('is-mega'); nav.classList.add('is-mega-closed'); if (toggle) toggle.setAttribute('aria-expanded', 'false'); };
    on('.f3-nav__toggle', function (e) { e.preventDefault(); var o = nav.classList.toggle('is-mega'); nav.classList.toggle('is-mega-closed', !o); if (toggle) toggle.setAttribute('aria-expanded', String(o)); });
    if (toggle) toggle.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); } });
    nav.addEventListener('mouseleave', function () { nav.classList.remove('is-mega-closed'); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) nav.classList.remove('is-mega'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMega(); nav.classList.remove('is-open'); document.documentElement.style.overflow = ''; } });
  }
})();

/* Home and inner-page widgets. */
(function () {
  'use strict';
  // Service cards: tap to turn over on touch screens.
  document.querySelectorAll('.f3-service-card').forEach(function (c) {
    c.addEventListener('click', function (e) {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (e.target.closest('a')) return;
      c.classList.toggle('is-flipped');
    });
  });
  // Carousels: "next" arrow on Verticals, prev/next arrows on card rails.
  var step = function (track, dir) {
    var card = track.querySelector('.f3-vertical-card, .f3-rail__card') || track.querySelector('.e-con .e-con');
    var w = card ? card.offsetWidth + 22 : 320;
    track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  document.querySelectorAll('.f3-verticals__next').forEach(function (b) {
    var track = b.closest('.f3-verticals') && b.closest('.f3-verticals').querySelector('.f3-verticals__track');
    if (!track) return;
    b.addEventListener('click', function () {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) track.scrollTo({ left: 0, behavior: 'smooth' });
      else step(track, 1);
    });
  });
  // Each arrow pair scrolls the nearest rail viewport in its section (card rails and numbered-card rails).
  document.querySelectorAll('.f3-rail__arrows').forEach(function (group) {
    var arrows = group.querySelectorAll('.f3-rail__arrow');
    var scope = group.parentElement, track = null;
    while (scope && !(track = scope.querySelector('.f3-rail__viewport'))) scope = scope.parentElement;
    if (!track || arrows.length < 2) return;
    var go = function (dir) {
      var card = track.querySelector('.f3-rail__card, .f3-num-card') || track.querySelector('.e-con .e-con');
      var inner = track.querySelector('.f3-rail__track') || track.firstElementChild;
      var gap = inner ? parseFloat(getComputedStyle(inner).columnGap) || 20 : 20;
      track.scrollBy({ left: dir * ((card ? card.getBoundingClientRect().width : 316) + gap), behavior: 'smooth' });
    };
    [[arrows[0], -1], [arrows[1], 1]].forEach(function (a) {
      var b = a[0];
      b.setAttribute('role', 'button'); b.setAttribute('tabindex', '0');
      b.setAttribute('aria-label', a[1] < 0 ? 'Previous' : 'Next');
      b.style.cursor = 'pointer';
      b.addEventListener('click', function (e) { e.preventDefault(); go(a[1]); });
      b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(a[1]); } });
    });
  });
  // FAQ: open the item the design opens by default.
  document.querySelectorAll('.f3-faq').forEach(function (f) {
    var m = f.className.match(/f3-faq-open-(\d+)/);
    if (!m) return;
    var d = f.querySelectorAll('details')[+m[1]];
    if (d) d.open = true;
  });
})();

/* Home hero: drag the diagonal to compare the light and dark dashboards. */
(function () {
  'use strict';
  var stage = document.querySelector('.f3-hero__dash-inner');
  if (!stage) return;
  var dark = stage.querySelector('.f3-hero__dash-dark');
  var cmp = stage.querySelector('.f3-hero__compare');
  var handle = stage.querySelector('.f3-hero__handle');
  var divider = stage.querySelector('.f3-hero__divider');
  if (!dark || !cmp || !handle) return;
  var W = 1050, LEAN = 532, START = 508, MIN = -LEAN, MAX = W;
  var pct = function (v) { return (v / W) * 100 + '%'; };
  var line = null;
  if (divider) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 1050 512'); svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none';
    line = document.createElementNS(ns, 'line');
    line.setAttribute('y1', '0'); line.setAttribute('y2', '512');
    line.setAttribute('vector-effect', 'non-scaling-stroke');
    line.style.cssText = 'stroke:rgba(255,255,255,.9);stroke-width:2';
    svg.appendChild(line);
    divider.style.visibility = 'hidden';
    cmp.insertBefore(svg, cmp.firstChild);
  }
  handle.setAttribute('role', 'slider'); handle.setAttribute('tabindex', '0');
  handle.setAttribute('aria-label', 'Dark version shown, in percent');
  handle.setAttribute('aria-valuemin', '0'); handle.setAttribute('aria-valuemax', '100');
  var cur = MAX;
  var set = function (v) {
    cur = Math.min(MAX, Math.max(MIN, v));
    dark.style.clipPath = 'polygon(' + pct(cur + LEAN) + ' 0%, 100% 0%, 100% 100%, ' + pct(cur) + ' 100%)';
    if (line) { line.setAttribute('x1', cur + LEAN); line.setAttribute('x2', cur); }
    var f = (cur - MIN) / (MAX - MIN);
    var hx = f * W;
    handle.style.left = f * 100 + '%';
    handle.style.top = (1 - (hx - cur) / LEAN) * 100 + '%';
    handle.setAttribute('aria-valuenow', Math.round(((MAX - cur) / (MAX - MIN)) * 100));
  };
  // Settle from fully light onto the design's split (1.1s ease-in-out, after 1s).
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var anim = null;
  var tween = function (to, ms, delay, ease) {
    if (anim) cancelAnimationFrame(anim);
    var from = cur, t0 = null;
    var tick = function (t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / ms);
      set(from + (to - from) * ease(k));
      anim = k < 1 && !dragging ? requestAnimationFrame(tick) : null;
    };
    setTimeout(function () { anim = requestAnimationFrame(tick); }, delay);
  };
  var inOut = function (k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  var springy = function (k) { return 1 - Math.pow(1 - k, 3) * Math.cos(k * 2.2); };
  set(MAX);
  if (reduce) set(START); else tween(START, 1100, 1000, inOut);
  var dragging = false;
  var move = function (x) { var b = cmp.getBoundingClientRect(); set(MIN + ((x - b.left) / b.width) * (MAX - MIN)); };
  cmp.style.touchAction = 'pan-y';
  cmp.style.cursor = 'ew-resize';
  cmp.addEventListener('pointerdown', function (e) { dragging = true; cmp.setPointerCapture(e.pointerId); move(e.clientX); });
  cmp.addEventListener('pointermove', function (e) { if (dragging) move(e.clientX); });
  cmp.addEventListener('pointerup', function () { dragging = false; });
  cmp.addEventListener('pointercancel', function () { dragging = false; });
  handle.addEventListener('keydown', function (e) {
    var st = e.shiftKey ? 150 : 50;
    var to = e.key === 'ArrowLeft' ? cur - st : e.key === 'ArrowRight' ? cur + st : e.key === 'Home' ? MIN : e.key === 'End' ? MAX : null;
    if (to === null) return;
    e.preventDefault(); tween(Math.min(MAX, Math.max(MIN, to)), 450, 0, springy);
  });
  cmp.addEventListener('pointerdown', function () { if (anim) { cancelAnimationFrame(anim); anim = null; } }, true);
})();

/* Home hero: pinned so the page slides over it, and the dashboard drifts with scroll. */
(function () {
  'use strict';
  var hero = document.querySelector('.f3-hero');
  var nav = document.querySelector('.f3-nav');
  if (hero) {
    var place = function () {
      var navH = nav ? nav.offsetHeight : 0;
      hero.style.top = Math.min(navH, window.innerHeight - hero.offsetHeight) + 'px';
    };
    place();
    window.addEventListener('resize', place);
    if (window.ResizeObserver) new ResizeObserver(place).observe(hero);
  }
  var stage = document.querySelector('.f3-hero__stage');
  var inner = stage && stage.querySelector('.f3-hero__dash-inner');
  if (!inner || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ticking = false;
  var update = function () {
    ticking = false;
    var r = stage.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    inner.style.transform = 'translateY(' + (30 - 60 * p).toFixed(2) + 'px)';
  };
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();

/* Scroll and load reveals (the Framer Reveal / Stagger / animate-on-load effects). */
(function () {
  'use strict';
  var els = [].slice.call(document.querySelectorAll('.f3-rv, .f3-rv-lines'));
  // FAQ rows fade up one after another.
  document.querySelectorAll('.f3-faq').forEach(function (f) {
    f.querySelectorAll('.e-n-accordion-item').forEach(function (it, i) {
      it.style.setProperty('--f3d', (i * 0.08) + 's');
      it.classList.add('f3-rv-faq');
      els.push(it);
    });
  });
  // Title lines: wrap each line in a mask so it can slide up.
  document.querySelectorAll('.f3-rv-lines').forEach(function (w) {
    var t = w.querySelector('.elementor-heading-title') || w.querySelector('.elementor-widget-container') || w;
    var lines = t.innerHTML.split(/<br\s*\/?>/i);
    t.innerHTML = lines.map(function (l, i) {
      return '<span class="f3-lm"><span style="--f3d:' + (0.15 + i * 0.1) + 's">' + l + '</span></span>';
    }).join('');
    w.classList.add('f3-lines-ready');
  });
  var groupOf = function (el) {
    var m = (el.className.match(/\bf3g-\w+/) || [])[0];
    return m ? [].slice.call(document.querySelectorAll('.' + m)) : [el];
  };
  var finish = function (el) {
    var d = parseFloat(getComputedStyle(el).getPropertyValue('--f3d')) || 0;
    var t = parseFloat(getComputedStyle(el).getPropertyValue('--f3t')) || 0.5;
    setTimeout(function () { el.classList.add('f3-done'); }, (d + t) * 1000 + 300);
  };
  var show = function (el) {
    groupOf(el).forEach(function (g) {
      if (g.classList.contains('f3-in')) return;
      g.classList.add('f3-in');
      finish(g);
      if (io) io.unobserve(g);
    });
  };
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (e) { e.classList.add('f3-in', 'f3-done'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) show(en.target); });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
  // Paint the hidden start state first, then watch.
  requestAnimationFrame(function () { els.forEach(function (e) { io.observe(e); }); sweep(); });
  // Safety net for zero-size or absolutely placed elements and the last rows of the page.
  var sweep = function () {
    var vh = window.innerHeight, atEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
    els.forEach(function (e) {
      if (e.classList.contains('f3-in')) return;
      var r = e.getBoundingClientRect();
      if (r.top < vh * (atEnd ? 1 : 0.88) && r.bottom > -vh) show(e);
    });
  };
  var pending = false;
  window.addEventListener('scroll', function () { if (!pending) { pending = true; setTimeout(function () { pending = false; sweep(); }, 120); } }, { passive: true });
})();

/* Service cards: the back side tilts toward the pointer and catches a glare. */
(function () {
  'use strict';
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.f3-service-card').forEach(function (card) {
    var tilt = card.querySelector('.f3-service-card__tilt');
    var glare = card.querySelector('.f3-service-card__glare');
    var back = card.querySelector('.f3-service-card__face--back');
    if (!tilt) return;
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = card.getBoundingClientRect();
      var ox = e.clientX - r.left - r.width / 2, oy = e.clientY - r.top - r.height / 2;
      var rx = (oy / (r.height / 2)) * -12, ry = (ox / (r.width / 2)) * 12;
      card.classList.add('is-tilting');
      tilt.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale(1.05)';
      if (glare) {
        glare.style.opacity = '0.5';
        glare.style.background = 'radial-gradient(circle at ' + ((e.clientX - r.left) / r.width * 100).toFixed(1) + '% ' + ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%, rgba(255,255,255,.6), rgba(255,255,255,0) 60%)';
      }
      if (back) back.style.boxShadow = (-ry * 1.5).toFixed(1) + 'px ' + (10 + rx * 1.5).toFixed(1) + 'px 48px rgba(11,27,43,.15)';
    });
    card.addEventListener('pointerleave', function () {
      card.classList.remove('is-tilting');
      tilt.style.transform = '';
      if (glare) glare.style.opacity = '0';
      if (back) back.style.boxShadow = '';
    });
  });
})();

/* Verticals arrow turns round at the end of the rail. */
(function () {
  'use strict';
  document.querySelectorAll('.f3-verticals').forEach(function (v) {
    var track = v.querySelector('.f3-verticals__track'), btn = v.querySelector('.f3-verticals__next');
    if (!track || !btn) return;
    btn.setAttribute('role', 'button'); btn.setAttribute('tabindex', '0'); btn.setAttribute('aria-label', 'Next');
    var upd = function () { btn.classList.toggle('is-end', track.scrollLeft + track.clientWidth >= track.scrollWidth - 4); };
    track.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
    btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
  });
})();

/* Article: highlight the section in view in the table of contents, with a sliding bar. */
(function () {
  'use strict';
  var list = document.querySelector('.f3-toc__list');
  if (!list) return;
  var links = [].slice.call(list.querySelectorAll('a[href^="#"]'));
  var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); });
  list.querySelectorAll('.f3-toc__bar').forEach(function (b) { b.style.display = 'none'; });
  list.style.position = 'relative';
  var bar = document.createElement('span');
  bar.className = 'f3-toc-bar';
  list.appendChild(bar);
  var setActive = function (i) {
    links.forEach(function (a, j) {
      var row = a.closest('.e-con') || a.parentNode;
      row.classList.toggle('is-current', i === j);
      if (i === j) { a.setAttribute('aria-current', 'location'); } else { a.removeAttribute('aria-current'); }
    });
    var row = links[i] && (links[i].closest('.f3-toc__list > .e-con') || links[i].closest('.e-con'));
    if (!row) return;
    var lr = list.getBoundingClientRect(), rr = row.getBoundingClientRect();
    bar.style.width = rr.width + 'px';
    bar.style.transform = 'translate(' + (rr.left - lr.left) + 'px,' + (rr.bottom - lr.top + list.scrollTop) + 'px)';
    // The list scrolls inside a 500px box: keep the current section in view.
    if (list.scrollHeight > list.clientHeight + 1 && (row.offsetTop < list.scrollTop || row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight)) {
      list.scrollTo({ top: Math.max(0, row.offsetTop - list.clientHeight / 3), behavior: 'smooth' });
    }
    bar.style.bottom = 'auto'; bar.style.top = '-1px';
  };
  setActive(0);
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    var hit = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
    if (hit) setActive(heads.indexOf(hit.target));
  }, { rootMargin: '-96px 0px -60% 0px' });
  heads.forEach(function (h) { if (h) { h.style.scrollMarginTop = '96px'; io.observe(h); } });
  window.addEventListener('resize', function () { var i = links.findIndex(function (a) { return a.hasAttribute('aria-current'); }); setActive(i < 0 ? 0 : i); });
})();

/* Contact form: sliding highlight behind the company size, and the button confirms before sending. */
(function () {
  'use strict';
  document.querySelectorAll('.f3-chips').forEach(function (chips) {
    var hl = document.createElement('span');
    hl.className = 'f3-chip-hl';
    chips.appendChild(hl);
    chips.classList.add('has-hl');
    var place = function (instant) {
      var on = chips.querySelector('input:checked');
      if (!on) { hl.style.opacity = '0'; return; }
      var lab = on.closest('.f3-chip'), cr = chips.getBoundingClientRect(), r = lab.getBoundingClientRect();
      if (instant) hl.style.transition = 'none';
      hl.style.opacity = '1';
      hl.style.width = r.width + 'px'; hl.style.height = r.height + 'px';
      hl.style.transform = 'translate(' + (r.left - cr.left) + 'px,' + (r.top - cr.top) + 'px)';
      if (instant) { hl.getBoundingClientRect(); hl.style.transition = ''; }
    };
    chips.addEventListener('change', function () { place(false); });
    window.addEventListener('resize', function () { place(true); });
    place(true);
  });
  document.querySelectorAll('form.f3-form, .f3-form form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var btn = form.querySelector('.f3-form__submit'), lab = btn && btn.querySelector('.f3-form__submit-label');
      if (!lab || form.dataset.sent) return;
      e.preventDefault();
      form.dataset.sent = '1';
      lab.classList.add('is-out');
      setTimeout(function () {
        lab.textContent = 'Inquiry Sent';
        lab.classList.remove('is-out'); lab.classList.add('is-in');
        setTimeout(function () { HTMLFormElement.prototype.submit.call(form); }, 450);
      }, 200);
    });
  });
})();

/* HubSpot contact form: after a successful submit, go to the Thank You page like the built-in form did. */
(function () {
  'use strict';
  window.addEventListener('hs-form-event:on-submission:success', function () {
    var base = (window.folio3Site && window.folio3Site.home) || (location.origin + '/');
    window.location.href = new URL('thank-you/', base).href;
  });
})();

/* Blog: category tabs (pill nav, hover effect after React Bits' PillNav) and pages of nine cards. */
(function () {
  'use strict';
  var grid = document.querySelector('.f3-blog-grid__inner');
  if (!grid) return;
  var PER = 9;
  var cards = [].slice.call(grid.children).filter(function (el) { return el.tagName === 'ARTICLE'; });
  var tabs = [].slice.call(grid.querySelectorAll('.f3-pill'));
  var pager = grid.querySelector('.f3-blog-pager');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cats = tabs.map(function (t) { return t.getAttribute('data-cat'); });
  var state = { cat: '', page: 1 };
  var read = function () {
    var q = new URLSearchParams(location.search);
    state.cat = cats.indexOf(q.get('category') || '') >= 0 ? (q.get('category') || '') : '';
    state.page = Math.max(1, parseInt(q.get('pg'), 10) || 1);
  };
  var href = function (cat, page) {
    var u = new URL(location.href);
    u.searchParams.delete('category'); u.searchParams.delete('pg'); u.hash = '';
    if (cat) u.searchParams.set('category', cat);
    if (page > 1) u.searchParams.set('pg', page);
    return u.pathname + u.search;
  };
  var top = function () {
    var y = grid.getBoundingClientRect().top + window.pageYOffset - 110;
    if (window.pageYOffset > y) window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  };
  var render = function (animate) {
    var list = cards.filter(function (c) { return !state.cat || (' ' + (c.getAttribute('data-cats') || '') + ' ').indexOf(' ' + state.cat + ' ') >= 0; });
    var pages = Math.max(1, Math.ceil(list.length / PER));
    if (state.page > pages) state.page = pages;
    var shown = list.slice((state.page - 1) * PER, state.page * PER);
    cards.forEach(function (c) {
      var i = shown.indexOf(c);
      c.hidden = i < 0;
      c.classList.remove('f3-blog-card--enter');
      if (i >= 0 && animate) {
        c.classList.add('f3-in');
        if (!reduce) { void c.offsetWidth; c.style.animationDelay = (i * 40) + 'ms'; c.classList.add('f3-blog-card--enter'); }
      }
    });
    grid.classList.add('is-paged');
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-cat') === state.cat;
      t.classList.toggle('is-active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    if (!pager) return;
    pager.innerHTML = '';
    pager.hidden = pages < 2;
    if (pages < 2) return;
    var add = function (label, page, opts) {
      var a = document.createElement('a');
      a.className = 'f3-blog-pager__btn' + (opts && opts.cls ? ' ' + opts.cls : '');
      a.innerHTML = label;
      if (opts && opts.aria) a.setAttribute('aria-label', opts.aria);
      if (opts && opts.disabled) { a.setAttribute('aria-disabled', 'true'); a.classList.add('is-disabled'); }
      else {
        a.href = href(state.cat, page);
        a.addEventListener('click', function (e) { e.preventDefault(); go(state.cat, page); });
      }
      if (page === state.page && !(opts && opts.cls)) { a.classList.add('is-current'); a.setAttribute('aria-current', 'page'); }
      pager.appendChild(a);
    };
    add('<span aria-hidden="true">&larr;</span>', state.page - 1, { cls: 'f3-blog-pager__btn--prev', aria: 'Previous page', disabled: state.page === 1 });
    for (var p = 1; p <= pages; p++) add(String(p), p, { aria: 'Page ' + p });
    add('<span aria-hidden="true">&rarr;</span>', state.page + 1, { cls: 'f3-blog-pager__btn--next', aria: 'Next page', disabled: state.page === pages });
  };
  var go = function (cat, page) {
    state.cat = cat; state.page = page;
    history.pushState(null, '', href(cat, page));
    render(true);
    top();
  };
  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) { e.preventDefault(); if (t.getAttribute('data-cat') !== state.cat || state.page !== 1) go(t.getAttribute('data-cat'), 1); });
  });
  window.addEventListener('popstate', function () { read(); render(true); });
  read();
  render(false);

  // Pill hover circle: sized so that, scaled up, it covers the whole pill from its bottom edge.
  var layout = function () {
    tabs.forEach(function (p) {
      var w = p.offsetWidth, h = p.offsetHeight;
      if (!w || !h) return;
      var R = ((w * w) / 4 + h * h) / (2 * h);
      var D = Math.ceil(2 * R) + 2;
      var delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      p.style.setProperty('--f3p-d', D + 'px');
      p.style.setProperty('--f3p-b', -delta + 'px');
      p.style.setProperty('--f3p-oy', (D - delta) + 'px');
      p.style.setProperty('--f3p-h', h + 'px');
    });
  };
  layout();
  window.addEventListener('resize', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();

/* HubSpot form: the company size dropdown is shown as single-select pills with the sliding highlight
   of the old form. The pills drive HubSpot's own dropdown, so validation and submission are unchanged;
   if a pill cannot set the dropdown, the dropdown is shown again. */
(function () {
  'use strict';
  var forms = document.querySelectorAll('.f3-form--hubspot');
  if (!forms.length) return;
  var ITEM = '.hsfc-DropdownOptions__List__ListItem, [role="option"]';
  var clean = function (s) { return (s || '').replace(/\s+/g, ' ').trim(); };
  var fieldOf = function (dd) {
    var n = dd.parentElement;
    while (n && !n.querySelector('.hsfc-FieldLabel')) n = n.parentElement;
    return n;
  };
  var trigger = function (dd) { return dd.querySelector('.hsfc-TextInput--button, button, [role="combobox"], input'); };
  var press = function (el) {
    ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(function (t) {
      el.dispatchEvent(new MouseEvent(t, { bubbles: true, cancelable: true, view: window }));
    });
  };
  var items = function (field) { return [].slice.call(field.querySelectorAll(ITEM)).filter(function (li) { var t = clean(li.textContent); return t && li.getAttribute('aria-disabled') !== 'true' && !/^(please\s+)?select\b/i.test(t); }); };
  var withList = function (dd, field, fn) {
    var list = items(field);
    if (list.length) return fn(list, false);
    var t = trigger(dd);
    if (!t) return fn([], false);
    press(t);
    requestAnimationFrame(function () { setTimeout(function () { fn(items(field), true); }, 30); });
  };
  var close = function (dd) {
    var t = trigger(dd);
    if (t) t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  };
  var current = function (dd) { var t = trigger(dd); return t ? clean(t.value || t.textContent) : ''; };

  var build = function (dd, field, labels) {
    if (field.querySelector('.f3-chips--hs')) return;
    var name = 'f3-hs-size-' + Math.random().toString(36).slice(2, 7);
    var wrap = document.createElement('div');
    wrap.className = 'f3-chips f3-chips--hs';
    wrap.setAttribute('role', 'radiogroup');
    var lab = field.querySelector('.hsfc-FieldLabel');
    if (lab) { if (!lab.id) lab.id = name + '-label'; wrap.setAttribute('aria-labelledby', lab.id); }
    labels.forEach(function (text) {
      var l = document.createElement('label');
      l.className = 'f3-chip';
      var i = document.createElement('input');
      i.type = 'radio'; i.name = name; i.value = text;
      var s = document.createElement('span');
      s.textContent = text;
      l.appendChild(i); l.appendChild(s);
      wrap.appendChild(l);
    });
    var hl = document.createElement('span');
    hl.className = 'f3-chip-hl';
    wrap.appendChild(hl);
    wrap.classList.add('has-hl');
    var place = function (instant) {
      var on = wrap.querySelector('input:checked');
      if (!on) { hl.style.opacity = '0'; return; }
      var r = on.closest('.f3-chip').getBoundingClientRect(), cr = wrap.getBoundingClientRect();
      if (instant) hl.style.transition = 'none';
      hl.style.opacity = '1';
      hl.style.width = r.width + 'px'; hl.style.height = r.height + 'px';
      hl.style.transform = 'translate(' + (r.left - cr.left) + 'px,' + (r.top - cr.top) + 'px)';
      if (instant) { hl.getBoundingClientRect(); hl.style.transition = ''; }
    };
    var sync = function (instant) {
      var v = current(dd);
      wrap.querySelectorAll('input').forEach(function (i) { i.checked = i.value === v; });
      place(instant);
    };
    var fail = function () { field.classList.remove('f3-hs-pills'); wrap.remove(); };
    wrap.addEventListener('change', function (e) {
      var want = e.target.value;
      place(false);
      withList(dd, field, function (list) {
        var hit = list.filter(function (li) { return clean(li.textContent) === want; })[0];
        if (!hit) { fail(); return; }
        press(hit);
        setTimeout(function () { if (current(dd) !== want) fail(); }, 120);
      });
    });
    window.addEventListener('resize', function () { place(true); });
    dd.parentNode.insertBefore(wrap, dd.nextSibling);
    field.classList.add('f3-hs-pills');
    sync(true);
  };

  var tried = new WeakSet();
  var scan = function (form) {
    form.querySelectorAll('.hsfc-DropdownInput').forEach(function (dd) {
      var field = fieldOf(dd);
      if (!field || field.querySelector('.f3-chips--hs') || tried.has(dd)) return;
      var lab = field.querySelector('.hsfc-FieldLabel');
      if (!lab || !/company\s*size/i.test(lab.textContent)) return;
      tried.add(dd);
      withList(dd, field, function (list, opened) {
        var labels = list.map(function (li) { return clean(li.textContent); });
        if (opened) close(dd);
        tried.delete(dd);
        if (labels.length) build(dd, field, labels);
      });
    });
  };
  /* Wait until HubSpot has finished rendering (its ready event, or no DOM changes for a moment), so the
     pills are never added while React is still hydrating the form. */
  forms.forEach(function (form) {
    var timer = 0, ready = false;
    var later = function (ms) { clearTimeout(timer); timer = setTimeout(function () { scan(form); }, ms); };
    new MutationObserver(function () { later(ready ? 60 : 700); }).observe(form, { childList: true, subtree: true });
    window.addEventListener('hs-form-event:on-ready', function () { ready = true; later(60); });
    later(1500);
  });
})();
