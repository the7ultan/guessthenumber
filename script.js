'use strict';
const playAgain = document.querySelector('.again');
const randomNumberFieldEl = document.querySelector('.number');
const guessFieldEl = document.querySelector('.guess');
const checkBtnEl = document.querySelector('.check');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');

let randomNumber = Math.trunc(Math.random() * 20) + 1;
console.log(randomNumber);
let score = 10;
let highscore = 0;

const displayMessage = function (message) {
  messageEl.textContent = message;
};
const colors = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

checkBtnEl.addEventListener('click', function () {
  const guess = Number(guessFieldEl.value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMessage('No Number Enter...');
  } else if (guess === randomNumber) {
    displayMessage('You Won the Game');
    colors('#60b347');
    randomNumberFieldEl.style.width = '30rem';
    randomNumberFieldEl.textContent = randomNumber;
    guessFieldEl.disabled = true;
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      localStorage.setItem('score', JSON.stringify(highscore));
    }
  } else if (guess !== randomNumber) {
    if (score > 1) {
      displayMessage(guess > randomNumber ? '📈 HIGH' : '📉 LOW');
      score--;
      scoreEl.textContent = score;
      if (score === 3) {
        displayMessage('3 chance left');
        colors('#1D5D9B');
      }
    } else {
      displayMessage('You lose 🔥');
      colors('#F31559');
      guessFieldEl.disabled = true;
    }
  }
});

playAgain.addEventListener('dblclick', function () {
  score = 10;
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start Guessing');
  scoreEl.textContent = score;
  randomNumberFieldEl.textContent = '?';
  guessFieldEl.value = '';
  highscoreEl.textContent = localStorage.getItem('score');
  guessFieldEl.disabled = false;
  colors('#222');
  randomNumberFieldEl.style.width = '15rem';
});
