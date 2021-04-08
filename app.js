"use strict";
// selected elements
const scoreDis0 = document.querySelector("#score--0");
const scoreDis1 = document.querySelector("#score--1");
const dicePic = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const holdBtn = document.querySelector(".btn--hold");
const resetBtn = document.querySelector(".btn--new");
const currentEl1 = document.querySelector("#current--1");
const currentEl2 = document.querySelector("#current--0");

let scores, currentScore, activePlayer, playing;
// function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  dicePic.classList.add("hidden");
  scoreDis0.textContent = 0;
  scoreDis1.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

rollBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dicePic.classList.remove("hidden");
    dicePic.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    playing = false;
    dicePic.style.display = "none";
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

resetBtn.addEventListener("click", init);
