const contentRefs = document.querySelector(".js-content");
const statusText = document.querySelector(".status");
const restartBtn = document.querySelector(".restart");
let player = "X";
let historyX = [];
let historyO = [];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createMarkup() {
  let markup = "";
  for (let i = 0; i < 9; i += 1) {
    markup += `<div class = "item js-item" data-id = "${i}"></div>`;
  }
  contentRefs.innerHTML = markup;
}
createMarkup();

contentRefs.addEventListener("click", onClick);

function onClick(event) {
  const { target } = event;
  const isClickItem = target.classList.contains("js-item");
  if (!isClickItem || target.textContent) {
    return;
  }

  const id = Number(target.dataset.id);
  let result = false;

  if (player === "X") {
    historyX.push(id);
    result = isWinner(historyX);
  } else {
    historyO.push(id);
    result = isWinner(historyO);
  }

  target.textContent = player;
  const isEndGame = historyX.length + historyO.length === 9;

  if (result) {
    statusText.textContent = `Переміг ${player}!`;
    return;
  } else if (isEndGame) {
    statusText.textContent = "Нічия";
    return;
  }

  player = player === "X" ? "O" : "X";

  restartBtn.addEventListener("click", resetGame);
}

function isWinner(arry) {
  return winConditions.some((item) => item.every((id) => arry.includes(id)));
}

function resetGame() {
  createMarkup();
  historyX = [];
  historyO = [];
  player = "X";
}
