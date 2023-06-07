const playerOne = document.querySelector('.player-icon-choice #player-x');
const playerTwo = document.querySelector('.player-icon-choice #player-o');
const playerChoice = document.querySelectorAll('.grid-wrapper div');

// if statement... if x is clicked run handlePlayerOne
// else if O is clicked run handlePlayerTwo

if (playerOne.addEventListener('click', handlePlayerOneTurn)) {
    
    function handlePlayerOneTurn(evt) {
        for (let choice of playerChoice) {
            choice.addEventListener('click', handlePlayerOne);

            function handlePlayerOne(evt) {
                let playerClick = evt.target;
                playerClick.innerText = "X";
                evt.target.style.backgroundColor = "green";
            }
        }
    }
};

if (playerTwo.addEventListener('click', handlePlayerTwoTurn)) {

    function handlePlayerTwoTurn(evt) {
        for (let choice of playerChoice) {
            choice.addEventListener('click', handlePlayerTwo);

            function handlePlayerTwo(evt) {
                let playerClick = evt.target;
                playerClick.innerText = "O";
                evt.target.style.backgroundColor = "red";
            }
        }
    }
};


// document.querySelector('#results').style.display = "block";

// document.querySelector('#play-again').style.display = "inline-block";