/* 
Game function:
- player guesses number between min and max
- player gets some amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if loose
- let player choose to play again
*/

//game values
let min=1,
    max=10,
    winningNum=getRandomNum(min,max),
    guessesLeft=3;

//UI elements
const game=document.querySelector('#game'),
minNum=document.querySelector('.min-num'),
maxNum=document.querySelector('.max-num'),
guessBtn=document.querySelector('#guess-btn'),
guessInput=document.querySelector('#guess-input'),
message=document.querySelector('.message');
// assign ui min and max
minNum.textContent=min;
maxNum.textContent=max;

//play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className==='play-again'){
        window.location.reload();
  }
})

//event listener for guessBtn click
guessBtn.addEventListener('click', function(){
  let guess=parseInt(guessInput.value);
  
 //validate
  if(isNaN(guess)||guess<min||guess>max){setMessage(`Please enter a number between ${min} and ${max}`, 'red');}

//check if won
if(guess === winningNum){
  gameOver(true,`YOU WIN! ${winningNum} is correct.`);
}else{
//wrong number
guessesLeft -= 1;
if (guessesLeft===0){
  //Game is over - lost
  gameOver(false,`GAME OVER, You lost! The correct number is ${winningNum}.`);
} else {
  //Game continues - answer's wrong
  guessInput.style.borderColor='red';
  guessInput.value='';
  setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
}
}});

function gameOver(won,msg){
let color;
won===true ? color='green' : color='red';
  guessInput.disabled=true;
  guessInput.style.borderColor=color;
  message.style.color=color;
  setMessage(msg);

  //Play Again?
  guessBtn.value='Play again';
  guessBtn.className+='play-again';
}

//get winning number
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg,color){
  message.style.color=color;
  message.textContent=msg;
  
}