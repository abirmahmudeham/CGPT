const buttons = document.querySelectorAll(".board button");
const turnText = document.getElementById("turn");
const resetBtn = document.getElementById("reset");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const index = button.dataset.index;
    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    button.textContent = currentPlayer;

    if (checkWin()) {
      turnText.textContent = `Player ${currentPlayer} Wins!`;
      gameOver = true;
      return;
    }

    if (board.every(cell => cell)) {
      turnText.textContent = "Draw!";
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.textContent = `Player ${currentPlayer}'s Turn`;
  });
});

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

resetBtn.addEventListener("click", () => {
  board.fill(null);
  buttons.forEach(b => b.textContent = "");
  currentPlayer = "X";
  gameOver = false;
  turnText.textContent = "Player X's Turn";
});
