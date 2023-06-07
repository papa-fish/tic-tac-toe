// -- game board global variables ======================
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
const spanElem = document.querySelector('span');

// -- 
for (let choice of playerChoice) {
    choice.addEventListener('click', handlePlayerTurn);
};

function processPlayerTurn(tokenPlacement) {

    turnTracker++;
    let tokenPlacementValue = Number(tokenPlacement.dataset.indexNumber);

    if (isPlayerOneTurn === true) {

        tokenPlacement.classList.add('x');
        tokenPlacement.innerText = "X";
        playerOneChoices.push(tokenPlacementValue);
        h2Elem.innerText = "Player Two's Turn";
        h2Elem.style.backgroundColor = "#FFAEBC";
        checkWinningCombinations(playerOneChoices)

    } else {

        tokenPlacement.classList.add('o');
        tokenPlacement.innerText = "O";
        playerTwoChoices.push(tokenPlacementValue);
        h2Elem.innerText = "Player One's Turn";
        h2Elem.style.backgroundColor = "#B4F8C8";
        checkWinningCombinations(playerTwoChoices)
    }

    spanElem.innerText = turnTracker;
    isPlayerOneTurn = !isPlayerOneTurn;
};

function handlePlayerTurn(evt) {
    
    const tokenPlacement = evt.target
    processPlayerTurn(tokenPlacement);
 
    if (turnTracker === 9) {  
        h2Elem.innerText = "DRAW";
        playAgainBtn.style.display = "inline-block";
        return;
    }
};

function checkWinningCombinations(array) {

    for (const combination of winningCombinations) {

        const [num1, num2, num3] = combination;
        if (array.includes(num1) && array.includes(num2) && array.includes(num3)) {
            playAgainBtn.style.display = "inline-block";   
            return true;
        }  
    }
    return false;
};
