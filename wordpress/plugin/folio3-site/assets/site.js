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
