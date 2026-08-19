(function () {
  'use strict';

  document.documentElement.classList.add('ka-ready');

  var isAr = (document.documentElement.lang || 'ar').toLowerCase().indexOf('en') !== 0;

  var CATALOG = [
    { keys: ['VAL', 'فالنسيا', 'valencia'], cat: { en: 'Citrus', ar: 'الموالح' }, moq: { en: 'From 24 MT', ar: 'من 24 طن' }, pack: { en: 'Telescopic Carton 15kg', ar: 'كرتون تلسكوبي 15 كجم' }, season: { en: 'Feb – May', ar: 'فبراير – مايو' }, price: '$420/MT' },
    { keys: ['NAV', 'نافيل', 'navel'], cat: { en: 'Citrus', ar: 'الموالح' }, moq: { en: 'From 24 MT', ar: 'من 24 طن' }, pack: { en: 'Telescopic Carton 15kg', ar: 'كرتون تلسكوبي 15 كجم' }, season: { en: 'Dec – Mar', ar: 'ديسمبر – مارس' }, price: '$450/MT' },
    { keys: ['MED', 'مجدول', 'medjool'], cat: { en: 'Dates', ar: 'التمور' }, moq: { en: 'From 10 MT', ar: 'من 10 طن' }, pack: { en: '5kg Cartons', ar: 'كراتين 5 كجم' }, season: { en: 'Sep – Nov', ar: 'سبتمبر – نوفمبر' }, price: '$3200/MT' },
    { keys: ['BAR', 'برحي', 'barhi'], cat: { en: 'Dates', ar: 'التمور' }, moq: { en: 'From 8 MT', ar: 'من 8 طن' }, pack: { en: '5kg Cartons', ar: 'كراتين 5 كجم' }, season: { en: 'Aug – Oct', ar: 'أغسطس – أكتوبر' }, price: '$2400/MT' },
    { keys: ['HASS', 'أفوكادو', 'افوكادو', 'avocado'], cat: { en: 'Fruits', ar: 'الفواكه' }, moq: { en: 'From 12 MT', ar: 'من 12 طن' }, pack: { en: '4kg Cartons', ar: 'كراتين 4 كجم' }, season: { en: 'Oct – Feb', ar: 'أكتوبر – فبراير' }, price: '$1850/MT' },
    { keys: ['POM', 'رمان', 'pomegranate'], cat: { en: 'Fruits', ar: 'الفواكه' }, moq: { en: 'From 12 MT', ar: 'من 12 طن' }, pack: { en: '5kg Cartons', ar: 'كراتين 5 كجم' }, season: { en: 'Sep – Dec', ar: 'سبتمبر – ديسمبر' }, price: '$980/MT' },
    { keys: ['SPU', 'بطاطس', 'spunta', 'potato'], cat: { en: 'Vegetables', ar: 'الخضروات' }, moq: { en: 'From 28 MT', ar: 'من 28 طن' }, pack: { en: '25kg Mesh Bags', ar: 'أكياس شبكية 25 كجم' }, season: { en: 'Year-round', ar: 'على مدار العام' }, price: '$380/MT' },
    { keys: ['ONI', 'بصل', 'onion'], cat: { en: 'Vegetables', ar: 'الخضروات' }, moq: { en: 'From 24 MT', ar: 'من 24 طن' }, pack: { en: '20kg Mesh Bags', ar: 'أكياس شبكية 20 كجم' }, season: { en: 'Year-round', ar: 'على مدار العام' }, price: '$420/MT' },
    { keys: ['GAR', 'ثوم', 'garlic'], cat: { en: 'Vegetables', ar: 'الخضروات' }, moq: { en: 'From 10 MT', ar: 'من 10 طن' }, pack: { en: '10kg Cartons', ar: 'كراتين 10 كجم' }, season: { en: 'Year-round', ar: 'على مدار العام' }, price: '$1100/MT' },
    { keys: ['MANGO', 'مانجو', 'mango'], cat: { en: 'Fruits', ar: 'الفواكه' }, moq: { en: 'From 15 MT', ar: 'من 15 طن' }, pack: { en: '4kg Cartons', ar: 'كراتين 4 كجم' }, season: { en: 'Jul – Sep', ar: 'يوليو – سبتمبر' }, price: '$1100/MT' },
    { keys: ['STR', 'فراولة', 'strawberr'], cat: { en: 'Frozen', ar: 'المجمدات' }, moq: { en: 'From 1 ctr', ar: 'من 1 حاوية' }, pack: { en: '10kg Cartons', ar: 'كراتين 10 كجم' }, season: { en: 'Year-round', ar: 'على مدار العام' }, price: '$2800/MT' },
    { keys: ['VEG', 'مشكلة', 'mixed-veg', 'frozen-mixed', 'frozen-veg'], cat: { en: 'Frozen', ar: 'المجمدات' }, moq: { en: 'From 1 ctr', ar: 'من 1 حاوية' }, pack: { en: '10kg Cartons', ar: 'كراتين 10 كجم' }, season: { en: 'Year-round', ar: 'على مدار العام' }, price: '$1450/MT' }
  ];

  function findMeta(hay) {
    var text = (hay || '').toUpperCase();
    for (var i = 0; i < CATALOG.length; i++) {
      var keys = CATALOG[i].keys;
      for (var k = 0; k < keys.length; k++) {
        if (text.indexOf(keys[k].toUpperCase()) !== -1) return CATALOG[i];
      }
    }
    return null;
  }

  function enrichCards() {
    var cards = document.querySelectorAll('.ka-card');
    cards.forEach(function (card) {
      var sku = card.getAttribute('data-sku') || '';
      var name = card.getAttribute('data-name') || '';
      var titleEl = card.querySelector('.ka-card__title');
      var img = card.querySelector('.ka-card__media img');
      var hay = [sku, name, titleEl ? titleEl.textContent : '', img ? img.getAttribute('src') : ''].join(' ');
      var meta = findMeta(hay);
      if (!meta) return;

      var loc = isAr ? 'ar' : 'en';
      var cat = card.querySelector('.ka-card__cat');
      if (cat && !cat.textContent.trim()) cat.textContent = meta.cat[loc];

      var price = card.querySelector('.ka-card__price');
      if (price) {
        price.hidden = false;
        price.innerHTML = meta.price + '<span>' + (isAr ? 'استرشادي' : 'Indicative') + '</span>';
      }

      var specs = card.querySelector('.ka-card__specs');
      if (!specs) {
        specs = document.createElement('ul');
        specs.className = 'ka-card__specs';
        var body = card.querySelector('.ka-card__body');
        if (body) body.appendChild(specs);
      }
      specs.hidden = false;
      var ico = function (d) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' + d + '</svg>';
      };
      specs.innerHTML =
        '<li class="ka-card__moq">' + ico('<path d="M4 7h16M4 12h10M4 17h7"/>') + meta.moq[loc] + '</li>' +
        '<li class="ka-card__pack">' + ico('<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M12 11v10M3 7l9 4 9-4"/>') + meta.pack[loc] + '</li>' +
        '<li class="ka-card__season">' + ico('<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 11h16"/>') + meta.season[loc] + '</li>';
    });
  }

  function initSlider() {
    var wrap = document.querySelector('[data-ka-slider]');
    if (!wrap) return;
    var imgs = (wrap.getAttribute('data-slide-imgs') || '').split('|');
    var cats = (wrap.getAttribute('data-slide-cats') || '').split('|');
    var titles = (wrap.getAttribute('data-slide-titles') || '').split('|');
    if (imgs.length < 2) return;
    var i = 0;
    var imgEl = wrap.querySelector('[data-ka-slide-img]');
    var catEl = wrap.querySelector('[data-ka-slide-cat]');
    var titleEl = wrap.querySelector('[data-ka-slide-title]');
    var dots = document.querySelector('[data-ka-dots]');

    function render() {
      if (imgEl) imgEl.src = imgs[i];
      if (catEl) catEl.textContent = cats[i] || '';
      if (titleEl) titleEl.textContent = titles[i] || '';
      if (dots) {
        dots.innerHTML = imgs.map(function (_, d) {
          return '<button type="button" class="' + (d === i ? 'is-on' : '') + '" data-i="' + d + '"></button>';
        }).join('');
      }
    }

    wrap.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ka-prev], [data-ka-next], [data-i]');
      if (!t) return;
      if (t.hasAttribute('data-ka-prev')) i = (i - 1 + imgs.length) % imgs.length;
      else if (t.hasAttribute('data-ka-next')) i = (i + 1) % imgs.length;
      else i = parseInt(t.getAttribute('data-i'), 10) || 0;
      render();
    });
    if (dots) {
      dots.addEventListener('click', function (e) {
        var b = e.target.closest('[data-i]');
        if (!b) return;
        i = parseInt(b.getAttribute('data-i'), 10) || 0;
        render();
      });
    }
    render();
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroVideo = document.querySelector('.ka-hero__video');
  if (heroVideo && !reduce) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    var tryPlay = function () {
      var p = heroVideo.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    };

    if ('IntersectionObserver' in window) {
      var heroIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) tryPlay();
            else heroVideo.pause();
          });
        },
        { threshold: 0.2 }
      );
      heroIo.observe(heroVideo.closest('.ka-hero') || heroVideo);
    } else {
      if (heroVideo.readyState >= 2) tryPlay();
      else heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
    }

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay();
      else heroVideo.pause();
    });
  } else if (heroVideo && reduce) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
  }

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

  function waitForZid(done, tries) {
    if (window.zid && zid.store && zid.store.cart && typeof zid.store.cart.addProduct === 'function') {
      done(true);
      return;
    }
    if (tries <= 0) {
      done(false);
      return;
    }
    window.setTimeout(function () {
      waitForZid(done, tries - 1);
    }, 80);
  }

  function setCartMsg(form, text, ok) {
    var msg = form.querySelector('[data-ka-cart-msg]');
    if (!msg) return;
    msg.hidden = !text;
    msg.textContent = text || '';
    msg.classList.toggle('is-ok', !!ok);
    msg.classList.toggle('is-err', !ok && !!text);
  }

  function addProductToCart(form) {
    var btn = form.querySelector('#ka-add-to-cart');
    var fail = form.getAttribute('data-msg-fail') || '';
    var ok = form.getAttribute('data-msg-ok') || '';
    var cartUrl = form.getAttribute('data-cart-url') || '/cart';
    var productIdEl = document.getElementById('product-id');
    var qtyEl = document.getElementById('product-quantity');

    waitForZid(function (ready) {
      if (!ready) {
        setCartMsg(form, fail, false);
        return;
      }

      if (btn) btn.disabled = true;
      setCartMsg(form, '', false);

      var payload = { formId: form.id || 'product-form' };
      if (productIdEl && productIdEl.value) payload.productId = productIdEl.value;
      if (qtyEl && qtyEl.value) payload.quantity = qtyEl.value;

      zid.store.cart.addProduct(payload).then(function (response) {
        if (btn) btn.disabled = false;
        if (response && response.status === 'success') {
          setCartMsg(form, ok, true);
          window.setTimeout(function () {
            window.location.href = cartUrl;
          }, 450);
          return;
        }
        setCartMsg(form, fail, false);
      }).catch(function () {
        if (btn) btn.disabled = false;
        setCartMsg(form, fail, false);
      });
    }, 25);
  }

  function initAddToCart() {
    var form = document.getElementById('product-form');
    if (!form) return;
    var btn = document.getElementById('ka-add-to-cart');
    if (btn) {
      btn.addEventListener('click', function () {
        addProductToCart(form);
      });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      addProductToCart(form);
    });
  }

  window.productOptionsChanged = function (selectedProduct) {
    var input = document.getElementById('product-id');
    var btn = document.getElementById('ka-add-to-cart');
    if (!input) return;
    if (selectedProduct && selectedProduct.id) {
      input.value = selectedProduct.id;
      if (btn) {
        btn.disabled = !!selectedProduct.unavailable;
      }
    } else if (btn) {
      btn.disabled = true;
    }
  };

  enrichCards();
  initSlider();
  initAddToCart();
})();
