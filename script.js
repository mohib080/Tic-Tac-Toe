const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const clickSound = document.getElementById('click-sound');
const gameOverSound = document.getElementById('game-over-sound');

document.addEventListener("DOMContentLoaded", () => {
    cells.forEach(cell => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });
});

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function playGameOverSound() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}

function handleCellClick(cell) {
    const index = cell.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;


    playClickSound();

    const winner = checkWinner();
    if (winner) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        highlightWinningCells(winner);
        gameActive = false;
        playGameOverSound();
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        playGameOverSound();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] !== "" && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            return condition;
        }
    }
    return null;
}

function highlightWinningCells(winningCondition) {
    winningCondition.forEach(index => {
        cells[index].classList.add("winning");
    });

    setTimeout(() => {
        winningCondition.forEach(index => {
            cells[index].classList.add("transition");
        });
    }, 500);
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning");
    });
}