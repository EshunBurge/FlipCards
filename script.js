document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".playing-card");


  cards.forEach((card) => {

    card.addEventListener("click", (event) => {

      /*
       * If the card has already been flipped,
       * allow the link to work normally.
       */
      if (card.classList.contains("is-flipped")) {
        return;
      }

      /*
       * First click flips the card instead
       * of immediately navigating away.
       */
      event.preventDefault();

      /*
       * Remove the flipped state from
       * all other cards.
       */
      cards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("is-flipped");
        }
      });

      /*
       * Flip the selected card.
       */
      card.classList.add("is-flipped");

    });

  });

});
