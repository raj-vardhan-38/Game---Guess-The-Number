let randomNumber = parseInt(Math.random() * 100 + 1)
// console.log(randomNumber);

const submit = document.querySelector('#submit');
const UserInput = document.querySelector('#guessField');
const GuessSlot = document.querySelector('.guesses');
const Remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const StartOver = document.querySelector('.Result');

const p = document.createElement('p');

let prevGues = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(UserInput.value);
        // console.log(guess);
        ValidateGuess(guess)
    });
}

function ValidateGuess(guess){
    if (isNaN(guess)) {
        alert('Please enter a valid number')
    }else if (guess <  1) {
        alert('Please enter a number more than 1')
    }else if (guess > 100) {
        alert('Please enter a number less than 100')
    }else{
        prevGues.push(guess);
        if (numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if (guess === randomNumber) {
        displayMessage(`Congratulations! You guess it right`)
        endGame();
    }else if (guess < randomNumber) {
        displayMessage(`Number is too low`)
    }else if (guess > randomNumber) {
        displayMessage(`Number is too High`)
    }
}

function displayGuess(guess){
    UserInput.value = '';
    GuessSlot.innerHTML += `${guess} , `;
    numGuess++;
    Remaining.innerHTML = `${11-numGuess}`;
}

function displayMessage(message){
    lowOrHi.innerHTML = `${message}`;
}

function endGame(){
    UserInput.innerHTML = '';
    UserInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = '<h2 id="newGame">Start New Game</h2>'
    StartOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGues = [];
        numGuess = 1;
        GuessSlot.innerHTML = '';
        Remaining.innerHTML = `${11-numGuess}`;
        UserInput.removeAttribute('disabled');
        StartOver.removeChild(p);
        playGame = true;
    });
}