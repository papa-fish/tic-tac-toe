// -- global variables ===============
const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [3, 4, 5],
    [2, 5, 8],
    [6, 7, 8]
];

let isPlayerOneTurn = true;
let turnTracker = 0;
let playerOneChoices = [];
let playerTwoChoices = [];


// -- DOM variables =============================
const playerChoice = document.querySelectorAll('.board div');
const h2Elem = document.querySelector('.player-turn h2');
const playAgainBtn = document.querySelector('#play-again');
const spanElem = document.querySelector('p span');
const resetScoreBtn = document.querySelector('#reset-score-btn');
const playerOneScore = document.querySelector('#player-one-score');
const playerTwoScore = document.querySelector('#player-two-score');
const canvas = document.querySelector('#confetti');

// -- audio & animation variables ===========================
const jsConfetti = new JSConfetti();
const audioClicking = new Audio('./sound-effects/click-152513.mp3');
const audioCelebrate = new Audio('./sound-effects/grunt-birthday-party-sound.mp3');
const audioAwwww = new Audio('./sound-effects/awwww.mp3')
audioClicking.volume = 0.5;
audioCelebrate.volume = 0.2;
audioAwwww.volume = 0.2;

// -- event listeners ===========================
for (let choice of playerChoice) {
    choice.addEventListener('click', handleDraw);
};

playAgainBtn.addEventListener('click', handlePlayAgain);

resetScoreBtn.addEventListener('click', handleResetScore);

// -- functions =================================
function processPlayerTurn(tokenPlacement) {

    turnTracker++;
    let tokenPlacementValue = Number(tokenPlacement.dataset.indexNumber);

    if (isPlayerOneTurn === true) {

        tokenPlacement.classList.add('x');
        tokenPlacement.innerText = "X";
        playerOneChoices.push(tokenPlacementValue);
        h2Elem.innerText = "Player Two's Turn";
        h2Elem.style.backgroundColor = "#ffaebb80";
        handleWinningConditions(playerOneChoices);
        tokenPlacement.removeEventListener('click', handleDraw);
        audioClicking.play();

    } else {

        tokenPlacement.classList.add('o');
        tokenPlacement.innerText = "O";
        playerTwoChoices.push(tokenPlacementValue);
        h2Elem.innerText = "Player One's Turn";
        h2Elem.style.backgroundColor = "#b4f8ca80";
        handleWinningConditions(playerTwoChoices);
        tokenPlacement.removeEventListener('click', handleDraw);
        audioClicking.play();
    }

    spanElem.innerText = turnTracker;
};

function handleDraw(event) {
    
    const tokenPlacement = event.target
    processPlayerTurn(tokenPlacement);
 
    if (turnTracker === 9 && handleWinningConditions(playerOneChoices) === false) {  
        h2Elem.innerText = "DRAW";
        playAgainBtn.style.display = "inline-block";
        h2Elem.style.backgroundColor = "salmon";
        audioAwwww.play();
        return;
    }
    isPlayerOneTurn = !isPlayerOneTurn;
};

function handleWinningConditions(array) {

    for (const combination of winningCombinations) {

        const [num1, num2, num3] = combination;
        if (array.includes(num1) && array.includes(num2) && array.includes(num3)) {
            playAgainBtn.style.display = "inline-block";

            if (isPlayerOneTurn === true) {
                h2Elem.innerText = "Player One Wins!";
                h2Elem.style.backgroundColor = "#b4f8ca80";
                playerOneScore.innerText++;
                audioCelebrate.play();
                animationConfetti();
                disableEventListeners();

            } else if (isPlayerOneTurn === false) {
                h2Elem.innerText = "Player Two Wins!";
                h2Elem.style.backgroundColor = "#ffaebb80";
                playerTwoScore.innerText++;
                audioCelebrate.play();
                animationConfetti();
                disableEventListeners();
                
            }
            return true;
        }  
    }
    return false;
};

function handlePlayAgain(event) {

    isPlayerOneTurn = true;
    turnTracker = 0;
    spanElem.innerText = turnTracker;
    h2Elem.innerText = "Player One's Turn";
    h2Elem.style.backgroundColor = "#b4f8ca80";
    playerOneChoices = [];
    playerTwoChoices = [];


    for (let choice of playerChoice) {
        choice.innerText = "";
        choice.addEventListener('click', handleDraw);
        choice.classList.remove('x');
        choice.classList.remove('o');
    }
    playAgainBtn.style.display = "none";
};

function handleResetScore(event) {
    playerOneScore.innerText = "0";
    playerTwoScore.innerText = "0";
};

function disableEventListeners() {
    for (let choice of playerChoice) {
        choice.removeEventListener('click', handleDraw);
    }
}

function animationConfetti() {
    jsConfetti.addConfetti()
};