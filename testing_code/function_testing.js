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

let playerOneChoices = [1, 2, 3];
let playerTwoChoices = [2, 4, 6];

function checkWinningCombinations(array) {
    for (const combination of winningCombinations) {
        const [num1, num2, num3] = combination;
        if (array.includes(num1) && array.includes(num2) && array.includes(num3)) {
            return true;    
        }
    }
    return false;
};

// console.log(checkWinningCombinations(playerOneChoices));
// console.log(checkWinningCombinations(playerTwoChoices));

playerChoice.forEach(function (tile) {
    tile.addEventListener('click', function() {
        let value = Number(tile.dataset.indexNumber);
        playerOneChoices.push(value);
    });

});