(function () {
  'use strict';

  document.documentElement.classList.add('ka-ready');

  // Mobile menu
  var toggle = document.querySelector('[data-ka-menu]');
  var mobile = document.querySelector('[data-ka-mobile]');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      var open = mobile.hasAttribute('hidden');
      if (open) mobile.removeAttribute('hidden');
      else mobile.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Soft scroll reveal for section centers / cards
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var nodes = document.querySelectorAll(
      '.ka-section__center, .ka-card, .ka-pillar, .ka-editorial, .ka-pdp'
    );
    nodes.forEach(function (el) {
      el.classList.add('ka-inview');
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      io.observe(el);
    });
  }
})();
