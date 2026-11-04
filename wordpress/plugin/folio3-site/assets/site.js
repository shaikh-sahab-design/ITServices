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
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var on = function (sel, fn) { var el = nav.querySelector(sel); if (el) el.addEventListener('click', fn); };
    on('.f3-nav__burger', function (e) { e.preventDefault(); nav.classList.toggle('is-open'); document.documentElement.style.overflow = nav.classList.contains('is-open') ? 'hidden' : ''; });
    on('.f3-nav__sheet-toggle', function (e) { e.preventDefault(); nav.classList.toggle('is-services-open'); });
    on('.f3-nav__toggle', function (e) { e.preventDefault(); nav.classList.toggle('is-mega'); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) nav.classList.remove('is-mega'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { nav.classList.remove('is-mega', 'is-open'); document.documentElement.style.overflow = ''; } });
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
    var card = track.querySelector('.e-con .e-con');
    var w = card ? card.getBoundingClientRect().width + 22 : 320;
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
  document.querySelectorAll('.f3-rail').forEach(function (rail) {
    var track = rail.querySelector('.f3-rail__viewport');
    var arrows = rail.querySelectorAll('.f3-rail__arrow');
    if (!track || arrows.length < 2) return;
    arrows[0].addEventListener('click', function () { step(track, -1); });
    arrows[1].addEventListener('click', function () { step(track, 1); });
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
    cmp.appendChild(svg);
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
  // Settle from fully light onto the design's split.
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) set(START);
  else {
    set(MAX);
    var t0 = null;
    var tick = function (t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 4);
      set(MAX + (START - MAX) * e);
      if (k < 1 && !dragging) requestAnimationFrame(tick);
    };
    setTimeout(function () { requestAnimationFrame(tick); }, 600);
  }
  var dragging = false;
  var move = function (x) { var b = cmp.getBoundingClientRect(); set(MIN + ((x - b.left) / b.width) * (MAX - MIN)); };
  cmp.style.touchAction = 'pan-y';
  cmp.addEventListener('pointerdown', function (e) { dragging = true; cmp.setPointerCapture(e.pointerId); move(e.clientX); });
  cmp.addEventListener('pointermove', function (e) { if (dragging) move(e.clientX); });
  cmp.addEventListener('pointerup', function () { dragging = false; });
  cmp.addEventListener('pointercancel', function () { dragging = false; });
  handle.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
    if (!d) return;
    e.preventDefault(); set(cur + d * (MAX - MIN) / 20);
  });
})();
