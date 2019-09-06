//  Andy Sokolowski      2019/09/04     guessinggame.js

//  error constants:
const OUT_OF_RANGE = 'That is an invalid guess.';
//  numeric constants:
const LOW_BOUND = 1,
      HIGH_BOUND = 100,
      MAX_GUESSES = 5;
//  message constants:
const YOU_WIN = 'You Win!',
      ALREADY = 'You have already guessed that number.',
      YOU_LOSE = 'You Lose.',
      CLOSE = 'You\'re burning up!',
      FAR = 'You\'re lukewarm.',
      FARTHER = 'You\'re a bit chilly.',
      FARTHEST = 'You\'re ice cold!';

let newGame;

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(guessNum) {
    if (guessNum === NaN ||
        guessNum < LOW_BOUND ||
        guessNum > HIGH_BOUND) {
      throw new Error(OUT_OF_RANGE).message;
    }

    this.playersGuess = guessNum;
    return this.checkGuess();
  }

  checkGuess() {
    let diff;

    if (this.playersGuess === this.winningNumber) {
      return YOU_WIN;
    }

    if (this.pastGuesses.includes(this.playersGuess)) {
      return ALREADY;
    }

    this.pastGuesses.push(this.playersGuess);
    if (this.pastGuesses.length === MAX_GUESSES) {
      return YOU_LOSE;
    }

    diff = this.difference();
    if (diff < HIGH_BOUND / 10) {
      return CLOSE;
    }

    if (diff < HIGH_BOUND / 4) {
      return FAR;
    }

    if (diff < HIGH_BOUND / 2) {
      return FARTHER;
    }

    return FARTHEST;
  }

  provideHint() {
    return shuffle([this.winningNumber, generateWinningNumber(),
        generateWinningNumber()]);
  }
}

function generateWinningNumber() {
  return Math.floor(Math.random(HIGH_BOUND) * HIGH_BOUND) + LOW_BOUND;
}

//  Yates-Fischer algorithm, found at https://bost.ocks.org/mike/shuffle/
function shuffle(arr) {
  let back = arr.length;

  while (back > 0) {
    let random = Math.floor(Math.random() * back--);
    let temp = arr[back];

    arr[back] = arr[random];
    arr[random] = temp;
  }

  return arr;
}

newGame = () => new Game;
