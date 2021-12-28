'use strict';

// // read content
// console.log(document.querySelector('.message').textContent);

// // change textContent to Correct Number!
// document.querySelector('.message').textContent = 'Correct Number!';

// // select number, change to 13
// document.querySelector('.number').textContent = 13;
// // select score, change to 233
// document.querySelector('.score').textContent = 233;

// // change input field value
// document.querySelector('.guess').value = 23;

// // read input field value
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random() * 20) + 1;

// uncomment to debug, applies secret number to '?'
// document.querySelector('.number').textContent = secretNumber;

let score = 20;
let highscore = 0;

//displays message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess, guess);

  // when there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number entered!';
    displayMessage('No number entered!');

    // when player wins
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent =
    displayMessage('You win! You found the secret number!');

    //displays the secret number in place of '?' upon winning
    document.querySelector('.number').textContent = secretNumber;

    //change body bg color to green on win
    document.querySelector('body').style.backgroundColor = '#60b347';

    //increase width of number to 30rem on win
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    //set high score on win
    document.querySelector('.highscore').textContent = score;

    //when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      //   document.querySelector('.message').textContent =
      displayMessage(guess > secretNumber ? 'Too high!' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //   document.querySelector('.message').textContent = 'You lost the game!';
      displayMessage('You lost the game!');

      // displays secret number upon losing
      document.querySelector('.number').textContent = secretNumber;

      document.querySelector('.score').textContent = 0;
    }
    // when guess is too high
    //   } else if (guess > secretNumber) {
    //     // when guess is too low
    //   } else if (guess < secretNumber) {
    //     if (score > 1) {
    //       document.querySelector('.message').textContent = 'Too low!';
    //       score--;
    //       document.querySelector('.score').textContent = score;
    //     } else {
    //       document.querySelector('.message').textContent = 'You lost the game!';
    //       document.querySelector('.score').textContent = 0;
    //     }
  }
});
