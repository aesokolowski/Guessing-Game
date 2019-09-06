//  Andy Sokolowski    2019/09/04    index.js
//  enables index.html to interact with guessinggame.js

function main() {
  const DEFAULT_MSG = 'Enter a number and press "submit guess."';

  let msgBar = document.getElementById('msg-bar');
  let guessBox = document.getElementById('guess-box');
  let submitButton = document.getElementById('submit-button');
  let newGameButton = document.getElementById('new-game-button');
  let hintButton = document.getElementById('hint');
  let guess1 = document.getElementById('guess1');
  let guess2 = document.getElementById('guess2');
  let guess3 = document.getElementById('guess3');
  let guess4 = document.getElementById('guess4');
  let game = newGame();
  let displayGuess = element => {
    if (msgBar.innerHTML !== 'You Win!') {
      element.innerHTML = game.playersGuess;
      element.style.display = 'block';
      guessBox.value = '';
    } else {
      disableAll();
    }
  };
  let disableAll = () => {
    submitButton.disabled = true;
    hint.disabled = true;
    guessBox.disabled = true;
  };
  let reset = () => {
    [guess1, guess2, guess3, guess4].forEach(field => {
      field.innerHTML = '';
      field.style.display = 'none';
    });
    submitButton.disabled = false;
    hint.disabled = false;
    guessBox.disabled = false;
    guessBox.value = '';
    msgBar.innerHTML = DEFAULT_MSG;
    game = newGame();
  };
  let submitClick = () => {
    try {
      msgBar.innerHTML = game.playersGuessSubmission(Number(guessBox.value));
    
      switch (game.pastGuesses.length) {
        case 1:
          displayGuess(guess1);
          break;
        case 2:
          displayGuess(guess2);
          break;
        case 3:
          displayGuess(guess3);
          break;
        case 4:
          displayGuess(guess4);
          break;
        case 5:
          disableAll();
          break;
        default:
          guessBox.value = '';
      }
    } catch (e) {
      msgBar.innerHTML = e;
      guessBox.value = '';
    }

    guessBox.focus();
  };

  msgBar.innerHTML = DEFAULT_MSG;
  guessBox.focus();
  guessBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      submitClick();
    }
  });
  submitButton.addEventListener('click', submitClick); 
  hint.addEventListener('click', () => {
    msgBar.innerHTML = game.provideHint();
    hint.disabled = true;
    guessBox.focus();
  });
  newGameButton.addEventListener('click', reset);
}

main();
