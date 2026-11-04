/* Folio3 site behaviour: header menu, mark the current page in the nav. */
(function () {
  'use strict';
  var path = location.pathname.replace(/\/+$/, '/') ;
  document.querySelectorAll('.f3-nav a[href], .f3-mega a[href]').forEach(function (a) {
    try {
      var p = new URL(a.href, location.href).pathname.replace(/\/+$/, '/');
      if (p === path) a.setAttribute('aria-current', 'page');
    } catch (e) {}
  });
})();
