'use strict';

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
//wybieramy element po jego ID - są dwa sposoby
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');
const btnCloseRules = document.querySelector('.zamknij-zasady');
const zasady = document.querySelector('.zasady');
const statsTable = document.querySelector('.stats-table');

//starting conditions
diceElement.classList.add('hidden');
score0Element.textContent = 0;
score1Element.textContent = 0;
const WINNING_SCORE = 100;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const statsPlayer0 = {
  wins: 0,
  lose: 0,
  hold: 0,
  losePoints: 0,
  roll1: 0,
  roll2: 0,
  roll3: 0,
  roll4: 0,
  roll5: 0,
  roll6: 0,
};

// const statsPlayer1 = statsPlayer0;
const statsPlayer1 = {
  wins: 0,
  lose: 0,
  hold: 0,
  losePoints: 0,
  roll1: 0,
  roll2: 0,
  roll3: 0,
  roll4: 0,
  roll5: 0,
  roll6: 0,
};

//pokazujemy tabelkę ze statystykami na koniec gry
function showStatsTable() {
  //pokazujemy tabelę
  statsTable.classList.remove('hidden');

  //wypełniamy tabelę danymi z gry dla gracza 0
  document.getElementById('player0--wins').textContent = statsPlayer0.wins;
  document.getElementById('player0--lose').textContent = statsPlayer0.lose;
  document.getElementById('player0--hold').textContent = statsPlayer0.hold;
  document.getElementById('player0--losePoints').textContent =
    statsPlayer0.losePoints;
  document.getElementById('player0--roll1').textContent = statsPlayer0.roll1;
  document.getElementById('player0--roll2').textContent = statsPlayer0.roll2;
  document.getElementById('player0--roll3').textContent = statsPlayer0.roll3;
  document.getElementById('player0--roll4').textContent = statsPlayer0.roll4;
  document.getElementById('player0--roll5').textContent = statsPlayer0.roll5;
  document.getElementById('player0--roll6').textContent = statsPlayer0.roll6;

  //wypełniamy tabelę danymi z gry dla gracza 1
  document.getElementById('player1--wins').textContent = statsPlayer1.wins;
  document.getElementById('player1--lose').textContent = statsPlayer1.lose;
  document.getElementById('player1--hold').textContent = statsPlayer1.hold;
  document.getElementById('player1--losePoints').textContent =
    statsPlayer1.losePoints;
  document.getElementById('player1--roll1').textContent = statsPlayer1.roll1;
  document.getElementById('player1--roll2').textContent = statsPlayer1.roll2;
  document.getElementById('player1--roll3').textContent = statsPlayer1.roll3;
  document.getElementById('player1--roll4').textContent = statsPlayer1.roll4;
  document.getElementById('player1--roll5').textContent = statsPlayer1.roll5;
  document.getElementById('player1--roll6').textContent = statsPlayer1.roll6;
}

const updateStats = function (dice) {
  if (activePlayer === 0) {
    switch (dice) {
      case 1:
        statsPlayer0.roll1 += 1;
        statsPlayer0.losePoints += currentScore;
        break;
      case 2:
        statsPlayer0.roll2 += 1;
        break;
      case 3:
        statsPlayer0.roll3 += 1;
        break;
      case 4:
        statsPlayer0.roll4 += 1;
        break;
      case 5:
        statsPlayer0.roll5 += 1;
        break;
      case 6:
        statsPlayer0.roll6 += 1;
        break;
    }
  }

  if (activePlayer === 1) {
    switch (dice) {
      case 1:
        statsPlayer1.roll1 += 1;
        statsPlayer1.losePoints += currentScore;
        break;
      case 2:
        statsPlayer1.roll2 += 1;
        break;
      case 3:
        statsPlayer1.roll3 += 1;
        break;
      case 4:
        statsPlayer1.roll4 += 1;
        break;
      case 5:
        statsPlayer1.roll5 += 1;
        break;
      case 6:
        statsPlayer1.roll6 += 1;
        break;
    }
  }
  // console.log(statsPlayer0, statsPlayer1);
  // console.log(activePlayer);
};

let id = null;
function addAnimationScore(activePlayer) {
  const elem = document.getElementById(`current--${activePlayer}-hidden`);
  elem.classList.remove('hidden');

  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (pos == -350) {
      clearInterval(id);
      elem.style.top = '50px';
      elem.classList.add('hidden');
    } else {
      pos -= 10;
      elem.style.top = pos + 'px';
    }
  }
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //usuwamy klasy umiejscowienia przyciskow dla aktywnego gracza
  btnRoll.classList.remove(`btn--player--${activePlayer}`);
  btnHold.classList.remove(`btn--player--${activePlayer}`);

  //zmieniamy aktywnego playera
  activePlayer = activePlayer === 0 ? 1 : 0;

  //toggle - sprawdza czy podana klasa jest aktywna, jak jest usuwa ją, jak nie jest to dodaje ją
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');

  //przesuwamy przyciski pod aktywnego gracza
  btnRoll.classList.add(`btn--player--${activePlayer}`);
  btnHold.classList.add(`btn--player--${activePlayer}`);
};

const addDiceSpinner = function (dice) {
  diceElement.classList.remove('hidden');
  diceElement.classList.add('dice-rolling');
  diceElement.src = `dice-move.png`;
  setTimeout(removeDiceSpinner, 500, dice);
};

const removeDiceSpinner = function (dice) {
  diceElement.classList.remove('dice-rolling');
  diceElement.src = `dice-${dice}.png`;
};

//GRAMY - rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    btnRules.classList.add('hidden');
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    addDiceSpinner(dice);

    //check for rolled 1: change player
    if (dice !== 1) {
      //add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      document.getElementById(`current--${activePlayer}-hidden`).textContent =
        currentScore;
      //dodajemy rzut do statystyk gracza
      updateStats(dice);
    } else {
      //dodajemy rzut do statystyk gracza
      updateStats(dice);

      //switch player
      switchPlayer();
    }
  }
});

const closeRules = function () {
  zasady.classList.add('hidden');
};

//otwieramy zasady gry
btnRules.addEventListener('click', function () {
  zasady.classList.remove('hidden');
  document.getElementById('winning-score').textContent = WINNING_SCORE;
});

//zamykamy zasady gry
btnCloseRules.addEventListener('click', closeRules);

// wciśniecie przycisku Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    addAnimationScore(activePlayer);
    //add current score to scores array
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //update stats
    if (activePlayer === 0) statsPlayer0.hold += 1;
    else statsPlayer1.hold += 1;
    // console.log(statsPlayer0, statsPlayer1);

    //check score if jest WINNING_SCORE, domyślnie 100
    if (scores[activePlayer] >= WINNING_SCORE) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document
        .getElementById(`winner--${activePlayer}`)
        .classList.remove('hidden');

      //update stats
      if (activePlayer === 0) {
        statsPlayer0.wins += 1;
        statsPlayer1.lose += 1;
      } else {
        statsPlayer1.wins += 1;
        statsPlayer0.lose += 1;
      }
      // console.log(statsPlayer0, statsPlayer1);

      //removing dice img from dom
      diceElement.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');

      showStatsTable();
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//wciśniecie przycisku New Game - reseting game
btnNew.addEventListener('click', function () {
  //chowamy tabelę statystyk
  statsTable.classList.add('hidden');

  //usuwamy klasy zwycięzca z aktywnego gracza
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //odkrywamy przycisk zasady gry
  btnRules.classList.remove('hidden');

  //usuwamy napis Zwycięzca
  document.getElementById(`winner--${activePlayer}`).classList.add('hidden');

  //activePlayer = 0;
  //aktywujemy gre, zerujemy wyniki
  playing = true;
  currentScore = 0;
  scores = [0, 0];

  //aktywujemy gracza który wygrał ostanią rundę
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  //ukrywamy kostkę do gry
  diceElement.classList.add('hidden');

  //odkrywamy przyciski rzut i wstrzymaj
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  //ustawiamy wyniki na 0
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
});
