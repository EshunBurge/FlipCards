// card deck deal-in + flip
(function () {
  var deck = document.querySelector('.card-deck');
  var cards = document.querySelectorAll('.playing-card');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealInstantly() {
    deck.classList.add('in-view');
    cards.forEach(function (card) { card.classList.add('is-floating'); });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealInstantly();
  } else {
    var dealDuration = 850, maxStagger = 450;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        deck.classList.add('in-view');
        setTimeout(function () {
          cards.forEach(function (card) { card.classList.add('is-floating'); });
        }, dealDuration + maxStagger);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });
    observer.observe(deck);
  }

  var hasHover = window.matchMedia('(hover: hover)').matches;
  if (hasHover) return;
  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (!card.classList.contains('is-flipped')) {
        e.preventDefault();
        card.classList.add('is-flipped');
      }
    });
  });
})();

// generic scroll-reveal for heading
(function () {
  var items = document.querySelectorAll('.eb-reveal');
  if (!items.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { revealObserver.observe(el); });
})();
