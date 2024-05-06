const smiley = "🙂";
const sadSmiley = "☹️";
const lives = "❤️";

gLevel = {
  SIZE: 4,
  MINES: 2,
  LIVES: 1,
};

class gCell {
  constructor(location, minesAroundCell, isShown, isMine, isMarked) {
    (this.location = location),
      (this.minesAroundCell = minesAroundCell),
      (this.isShown = isShown),
      (this.isMine = isMine),
      (this.isMarked = isMarked);
  }
}

var gClickedCell;
var gMinesClickedCount = 0;
var gLifeLeft;

var gBoard;
function init() {
  gMinesClickedCount = 0;
  gBoard = buildBoard(gLevel.SIZE);
  console.log("***size***", gLevel.SIZE);
  renderBoard(gBoard);
  createMines(gBoard);
  countMinesAroundCell(gBoard);
  setLives(gLevel);
  resetSmiley();
  gLifeLeft = gLevel.LIVES;
}

//countMinesAroundCell(gBoard);

function buildBoard(size) {
  console.log("size is", size);
  const board = [];
  for (var i = 0; i < size; i++) {
    board[i] = [];

    for (var j = 0; j < size; j++) {
      board[i][j] = new gCell({ i, j }, 0, false, false, false);
    }
  }
  console.log(board);
  return board;
}

function renderBoard(board) {
  console.log("render", board);
  var strHtml = "";
  //console.log(board);

  for (var i = 0; i < board.length; i++) {
    strHtml += "<tr>";

    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;
      strHtml += `<td class="${className}" onclick="onCellClicked(this)" "getLocation(this)" </td>`;
    }
    strHtml += "</tr>";
  }
  const elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHtml;
}

function countMinesAroundCell(gBoard) {
  //location, cell) {
  console.log(gBoard);
  var minesFoundCount = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var currCell = gBoard[i][j];
      //console.log("currCell", currCell.location);
      if (currCell.isMine) continue;
      for (var r = currCell.location.i - 1; r <= currCell.location.i + 1; r++) {
        if (r < 0 || r > gBoard.length - 1) continue;
        for (
          var c = currCell.location.j - 1;
          c <= currCell.location.j + 1;
          c++
        ) {
          if (c < 0 || c > gBoard.length - 1) continue;
          if (gBoard[r][c].isMine) minesFoundCount++;
        }
      }
      currCell.minesAroundCell = minesFoundCount;

      minesFoundCount = 0;
    }
  }
}

function onCellClicked(cell) {
  console.log(gMinesClickedCount);
  var cellLocation = getLocation(cell);
  //console.log(cellLocation);
  var i = +cellLocation[0];
  var j = +cellLocation[1];
  // console.log(gBoard[i][j].minesAroundCell);
  var elCell = document.querySelector(
    `.cell-${cellLocation[0]}-${cellLocation[1]}`
  );
  // console.log(elCell);
  elCell.innerText = gBoard[i][j].minesAroundCell;
  if (gBoard[i][j].minesAroundCell === 0) elCell.innerText = " ";
  cell.style.backgroundColor = "darkgray";
  if (gBoard[i][j].isMine) {
    elCell.innerText = MINE;
    elCell.style.backgroundColor = "red";
    gMinesClickedCount++;

    subLives();
  }
  if (gMinesClickedCount === gLevel.LIVES + 1) {
    renderAllMines(gBoard);
  }
}

// var numOfMines = cell.location;
// cell.innerText =
/*  var elCell = document.querySelector(
    `.cell-${gCell.location.i}-${gCell.location.j}`
  );
  elCell.innerText = minesFoundCount; */
//countMinesAroundCell(gBoard);
//if (cell.innerHTML === MINE) {
// if(gMines.includes)
//console.log("game over");

// console.log(cell);

function getLocation(cell) {
  var list = cell.classList.value;
  console.log(list);
  var location = list.slice(10);
  var position = location.split("-");
  //console.log(position);

  return position;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function levelClicked(btn) {
  console.log(btn);
  if (btn.classList.contains("Beginner-btn")) {
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    gLevel.LIVES = 1;
  }
  if (btn.classList.contains("Medium-btn")) {
    console.log("glLevel 8");

    gLevel.SIZE = 8;
    gLevel.MINES = 14;
    gLevel.LIVES = 3;
  }

  if (btn.classList.contains("Advanced-btn")) {
    gLevel.SIZE = 12;
    gLevel.MINES = 32;
    gLevel.LIVES = 3;
  }
  init();
}

function setLives(level) {
  document.querySelector(".life-number").innerText = `${gLevel.LIVES}`;
}

function subLives() {
  if (gLifeLeft === 0) return;
  gLifeLeft--;
  console.log("LifeLeft", gLifeLeft);
  console.log(gLevel.LIVES);
  document.querySelector(".life-number").innerText = gLifeLeft;
}

function resetSmiley() {
  document.querySelector(".smiley").innerText = smiley;
}
