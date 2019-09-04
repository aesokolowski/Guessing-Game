//  Andy Sokolowski      2019/09/04     guessinggame.js

class Game {
  constructor() {
    this.cons = Object.freeze({
      OUT_OF_RANGE: 'ERROR: number outside of accepted range (1-100, ' +
                     'inclusive).'
    });
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
    if (guessNum < 1 || guessNum > 100) {
      throw this.cons.OUT_OF_RANGE;
    }

    this.playersGuess = guessNum;
  }
}

function generateWinningNumber() {
  return Math.floor(Math.random(100) * 100) + 1;
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
