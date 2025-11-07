let randNumber=parseInt(Math.random()*100+1);

const submit=document.querySelector('#submit')
const userInput=document.querySelector("#guessField")
const guessSlot=document.querySelector('.guesses')
const remaining=document.querySelector('.lastResult')
const lowOrHi=document.querySelector('.lowOrHi')
const startOver=document.querySelector(".resultParas")

const p=document.createElement('p')

let prevGuess=[];
let numberOfGuess=1;
let playGame=true
if(playGame){
    submit.addEventListener('click',(evt)=>{
        evt.preventDefault();
        const guess=parseInt(userInput.value)
        validateGuess(guess)
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert("Enter a valid number")
    }else if(guess<1){
        alert("Enter a number more than 1");
    }else if(guess>100){
        alert("Enter a number less than 100")
    }else{
        prevGuess.push(guess)
        if(numberOfGuess===6){
            if(guess===randNumber){
               
                displayGuess(guess)
                checkGuess(guess)
                endGame();
            }
            else{
                displayGuess(guess)
                displayMessage(`😢 Game Over! The number was ${randNumber}`,"red")
                endGame();
            }
        // displayGuess(guess)
        // displayMessage(`Ooops!! Game Over!!->Random No. was ${randNumber}`,"red")
        
        // endGame();
        }else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess===randNumber){
      displayMessage("🎉 Congratulations! You guessed it right! 🎉","green")  ;
     endGame();
    }else if(guess<randNumber){
        displayMessage("📈 Too low! Try a higher number");
    }else{
        displayMessage("📉 Too high! Try a lower number")
    }
}

function displayGuess(guess){
    userInput.value='';
    if(guessSlot.innerHTML === ''){
        guessSlot.innerHTML = guess;
    } else {
        guessSlot.innerHTML += `, ${guess}`;
    }
    numberOfGuess++;
    remaining.innerHTML=`${7-numberOfGuess}`

}

function displayMessage(message,color){
    let className = 'info';
    if(color === 'green'){
        className = 'success';
    } else if(color === 'red'){
        className = 'error';
    }
    lowOrHi.innerHTML=`<h2 class="${className}">${message}</h2>`;
}

function endGame(){
    userInput.value='';
    userInput.setAttribute("disabled","");
    p.classList.add('button');
    p.innerHTML='<h2 id="newGame">Start Game</h2>'
    startOver.appendChild(p);
    playGame=false;
    newGame();
}

function newGame(){
    playGame=true;
    const newGameButton=document.querySelector('#newGame')
    if(newGameButton){
        newGameButton.style.cursor='pointer';
        newGameButton.addEventListener('click',(evt)=>{
            randNumber=parseInt(Math.random()*100+1);
            prevGuess=[]
            numberOfGuess=1
            guessSlot.innerHTML=''
            remaining.innerHTML=`${7-numberOfGuess}`
            lowOrHi.innerHTML = '';
            userInput.removeAttribute('disabled')
            userInput.focus();
            startOver.removeChild(p)
        })
    }
}