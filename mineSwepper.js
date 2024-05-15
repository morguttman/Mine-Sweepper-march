const smiley = "🙂";
const sadSmiley = "☹️";
const lives = "❤️";
const flag = "🚩";

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

var gGame = {};
var isVictory;
var gClickedCell;
var gMinesClickedCount = 0;
var gLifeLeft;
var gCellLocation = onCellClicked();
var gFlags;
var gBoard;
var gMinesMarked;
var gTimerInterval;

function init() {
  gMinesMarked = 0;
  gMinesClickedCount = 0;
  gBoard = buildBoard(gLevel.SIZE);
  // console.log("***size***", gLevel.SIZE);
  renderBoard(gBoard);
  createMines(gBoard);
  countMinesAroundCell(gBoard);
  setLives(gLevel);
  resetSmiley();
  gLifeLeft = gLevel.LIVES;
  gFlags = gLevel.MINES;
  document.querySelector(".modal").classList.add("hidden");
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
  };
  setTimer();
}

//countMinesAroundCell(gBoard);

function buildBoard(size) {
  // console.log("size is", size);
  const board = [];
  for (var i = 0; i < size; i++) {
    board[i] = [];

    for (var j = 0; j < size; j++) {
      board[i][j] = new gCell({ i, j }, 0, false, false, false);
    }
  }
  //console.log(board);
  return board;
}

function renderBoard(board) {
  // console.log("render", board);
  var strHtml = "";
  //console.log(board);

  for (var i = 0; i < board.length; i++) {
    strHtml += "<tr>";

    for (var j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const className = `cell cell-${i}-${j}`;
      strHtml += `<td class="${className}" onclick="onCellClicked(this)" "getLocation(this)" oncontextmenu="markCell(this)"  </td>`;
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
  if (gGame.shownCount === 0) {
    console.log(gGame.shownCount);
    console.log(gGame.secsPassed);
    startTimer();
  }
  //console.log("mines clicked", gMinesClickedCount);
  var cellLocation = getLocation(cell);

  //console.log(cellLocation);
  var i = +cellLocation[0];
  var j = +cellLocation[1];

  var elCell = document.querySelector(
    `.cell-${cellLocation[0]}-${cellLocation[1]}`
  );

  if (gBoard[i][j].isMarked) return;

  gBoard[i][j].isShown = true;
  gGame.shownCount++;
  console.log(gGame.shownCount);
  //console.log(gBoard);
  elCell.innerText = gBoard[i][j].minesAroundCell;

  if (gBoard[i][j].minesAroundCell === 0) elCell.innerText = " ";
  cell.style.backgroundColor = "darkgray";

  if (gBoard[i][j].isMine) {
    showMine(elCell);
    gBoard[i][j].isShown = false;
    gGame.shownCount--;
    gMinesClickedCount++;

    subLives();
  }

  if (gMinesClickedCount === gLevel.LIVES + 1) {
    renderAllMines(gBoard);
    isVictory = false;
    gameOverModal();
  }
  checkIfWin();
  clickNeigCells(cellLocation);
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
  //console.log(cell);
  var list = cell.classList.value;
  //console.log(list);
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
  stopTimer();
  gGame.secsPassed = 0;
  if (btn.classList.contains("Beginner-btn")) {
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    gLevel.LIVES = 1;
  }
  if (btn.classList.contains("Medium-btn")) {
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
  console.log(gGame.shownCount);
}

function setLives(level) {
  document.querySelector(".life-number").innerText = `${gLevel.LIVES}`;
  document.querySelector(".flags-number").innerText = `${gLevel.MINES}`;
}

function subLives() {
  if (gLifeLeft === 0) return;
  gLifeLeft--;

  document.querySelector(".life-number").innerText = gLifeLeft;
}

function resetSmiley() {
  document.querySelector(".smiley").innerText = smiley;
}

function clickNeigCells(cellLocation) {
  // console.log("cell clicked", cellLocation);
  var r = +cellLocation[0];
  var c = +cellLocation[1];
  // console.log(r, c);
  if (gBoard[r][c].isMine) return;
  if (gBoard[r][c].minesAroundCell > 0) return;

  for (var i = r - 1; i <= r + 1; i++) {
    // console.log("i is", i);
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = c - 1; j <= c + 1; j++) {
      if (j < 0 || j > gBoard.length - 1) continue;

      var neigCell = gBoard[i][j];
      if (neigCell.isShown) continue;
      if (neigCell.isMine) return;

      const cell = document.querySelector(
        `.cell-${neigCell.location.i}-${neigCell.location.j}`
      );
      // console.log("neigbor cell", cell, neigCell.location, neigCell);
      onCellClicked(cell);
    }

    //onCellClicked(gBoard[i+1][j])
  }
}

function markCell(cell) {
  // console.log("marked cell");
  var cellLocation = getLocation(cell);
  // console.log(cellLocation);
  var i = +cellLocation[0];
  var j = +cellLocation[1];
  var elCell = document.querySelector(
    `.cell-${cellLocation[0]}-${cellLocation[1]}`
  );

  if (gBoard[i][j].isMarked) unMarkCell(cell);
  else {
    if (gBoard[i][j].isShown) return;

    //console.log("cell is marked", gBoard[i][j]);
    if (gFlags === 0) {
      gBoard[i][j].isMarked = false;
      return;
    }
    gBoard[i][j].isMarked = true;
    if (gBoard[i][j].isMine) {
      gBoard[i][j].isShown = true;
    }

    if (gBoard[i][j].isMine && gBoard[i][j].isMarked) {
      gMinesMarked++;
      gGame.shownCount++;
      // console.log(gBoard[i][j]);
      // console.log("mines found", gMinesMarked);
    }

    gFlags--;
    document.querySelector(".flags-number").innerText = gFlags;
    elCell.innerText = flag;

    //console.log(gFlags);
  }
  // checkIfWin();
}

function unMarkCell(cell) {
  //console.log("unmark cell");
  var cellLocation = getLocation(cell);

  //console.log(cellLocation);
  var i = +cellLocation[0];
  var j = +cellLocation[1];
  var elCell = document.querySelector(
    `.cell-${cellLocation[0]}-${cellLocation[1]}`
  );
  if (gBoard[i][j].isMine && gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false;
    gBoard[i][j].isShown = false;
    gFlags++;
    gMinesMarked--;
    gGame.shownCount--;
    // console.log(gMinesMarked, gGame.shownCount);
  }

  if (gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false;
    gFlags++;
  }

  document.querySelector(".flags-number").innerText = gFlags;
  elCell.innerText = "";
}

function gameOverModal() {
  document.querySelector(".modal").classList.remove("hidden");

  if (isVictory) {
    document.querySelector(".modal").innerHTML = `<span> 🎊YOU WON🎊</span> <br>
  <button onclick = "init()">Play again</button>`;
  } else if (!isVictory) {
    document.querySelector(".modal").innerHTML = `<span>GAME OVER</span> <br>
  <button onclick = "init()">Try again</button>`;
  }
  stopTimer();
}

function checkIfWin() {
  console.log(
    gMinesMarked,
    gLevel.MINES,
    gGame.shownCount,
    gLevel.SIZE * gLevel.SIZE
  );
  if (
    gMinesMarked === gLevel.MINES &&
    gGame.shownCount === gLevel.SIZE * gLevel.SIZE
  ) {
    isVictory = true;
    gameOverModal();
    stopTimer();
  }
  /* for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j];
      // console.log(cell, gBoard[i][j]);
      if ((cell.isShown = false)) return;
      if (cell.isShown && gMinesMarked == gLevel.MINES) isVictory = true; */
}

function setTimer() {
  var elTimer = document.querySelector(".time");
  elTimer.innerText = `Time:${gGame.secsPassed}`;
}

function startTimer() {
  gTimerInterval = setInterval(() => {
    gGame.secsPassed++;
    setTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(gTimerInterval);
}
