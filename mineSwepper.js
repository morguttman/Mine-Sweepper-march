const smiley = "🙂";
const sadSmiley = "☹️";
const lives = "❤️";

gLevel = {
  SIZE: 4,
  MINES: 2,
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
var gLife = 3;

var gBoard;
function init() {
  gBoard = buildBoard(gLevel.SIZE);
  console.log("***size***", gLevel.SIZE);
  renderBoard(gBoard);
  createMines(gBoard);
  countMinesAroundCell(gBoard);
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
      // console.log(minesFoundCount, "mines around", currCell.location);
      /*   var elCell = document.querySelector(
        `.cell-${currCell.location.i}-${currCell.location.j}`
      );
      elCell.innerText = minesFoundCount; */
      //console.log("minesCount", minesFoundCount);
      minesFoundCount = 0;
    }
  }
}
//  console.log(+location[0] - 1, +location[0] + 1);
//cell.style.backgroundColor = "red";
//console.log(i, j);
//console.log(gBoard[`${i}`][`${j}`]);
// if (gBoard[i][j].isMine) minesFoundCount++;

/* var minesFoundCount = 0;
  console.log(location);
  for (var i = +location[0] - 1; i < +location[0] + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = location[1] - 1; j < location[1] + 1; j++) {
      if (j < 0 || j > gBoard.length - 1) continue;
      //  console.log(+location[0] - 1, +location[0] + 1);
      //cell.style.backgroundColor = "red";
      //console.log(i, j);
      console.log(gBoard[`${i}`][`${j}`]);
      if (gBoard[i][j].isMine) minesFoundCount++;
    }
    console.log(minesFoundCount);
    gBoard[location[0]][location[1]] = minesFoundCount;
    const className = `cell-${location[0]}-${location[1]}`;
    console.log(className);
    document.querySelector(`cell-${location[0]}-${location[1]}`).innerText =
      minesFoundCount;
    /*  const elCell = document.querySelector(`cell-${location[0]}-${location[1]}`);
    console.log(elCell);
    elCell.innerHTML = minesFoundCount; 
  /*}*/

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
  if (gMinesClickedCount === 4) {
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
  }
  if (btn.classList.contains("Medium-btn")) {
    console.log("glLevel 8");

    gLevel.SIZE = 8;
    gLevel.MINES = 14;
  }

  if (btn.classList.contains("Advanced-btn")) {
    gLevel.SIZE = 12;
    gLevel.MINES = 32;
  }
  init();
}

function subLives() {
  gLife--;

  if (gLife === 0) return;
}
