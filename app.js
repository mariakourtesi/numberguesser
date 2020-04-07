/*
GAME FUNCTION

-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify Player of guesses remaining
-Notify the player of the correct answer if lose
-Let player choose to play again
*/


// Game values

let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;


// UI elements

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// assign min and max numbers
minNum.textContent = min;
maxNum.textContent = max;


// Play again event listener

game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again'){
    window.location.reload();
  }
})

//Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);


  // validate 
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }


// check if won
if(guess === winningNum){
// game over - won

gameOver(true, `${winningNum} is correct, YOU WIN!`);


} else{

    //wrong number
    guessesLeft -= 1;

    if( guessesLeft === 0){
  // Game over - lost
  gameOver(false,`Game Over, you lost. The corect number was ${winningNum}`);

    } else {
  // Game continues - answer wrong
      
        //change border colour
      guessInput.style.borderColor ='red';

      //clear input
      guessInput.value = '';

      // tell user it's the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
}

});


// Game over 

function gameOver (won, msg){

  let color;

  won === true ? color = 'green' : color = 'red';
  // Disable input
  guessInput.disabled = true;
  //change border colour
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;

  // set message
  setMessage(msg);


  // play again

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}


// Get winning number

function getRandomNum(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}


// Set message
function setMessage(msg, color){

  message.style.color = color;
  message.textContent = msg;

}