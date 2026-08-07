```javascript
// ---------- CARD DECK ----------

(function () {

  var deck = document.querySelector(".card-deck");
  var cards = document.querySelectorAll(".playing-card");

  if (!deck || !cards.length) return;


  var reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  // Immediately show cards when reduced motion
  // is enabled or IntersectionObserver is unavailable.

  function revealInstantly() {

    deck.classList.add("in-view");

    cards.forEach(function (card) {
      card.classList.add("is-floating");
    });

  }


  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealInstantly();

  } else {

    var dealDuration = 850;
    var maxStagger = 450;


    var observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;


            deck.classList.add("in-view");


            setTimeout(function () {

              cards.forEach(function (card) {
                card.classList.add("is-floating");
              });

            }, dealDuration + maxStagger);


            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.35
        }
      );


    observer.observe(deck);

  }


  // Desktop:
  // hover automatically flips the card.
  //
  // Touch devices:
  // first tap flips the card.
  // The second tap follows the link.

  var hasHover =
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (hasHover) return;


  cards.forEach(function (card) {

    card.addEventListener(
      "click",
      function (event) {

        if (!card.classList.contains("is-flipped")) {

          event.preventDefault();

          card.classList.add("is-flipped");

        }

      }
    );

  });

})();
```
