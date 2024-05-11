const MINE = "💣";
var gShowMineInterval;
var gMines = [];

function createMines(board) {
  gMines = [];
  // var gMine = createMine();

  for (i = 0; i < gLevel.MINES; i++) {
    createMine(board);

    // console.log(gLevel.MINES);
  }
}

function createMine(board) {
  const mine = {
    location: {
      i: getRandomInt(0, gLevel.SIZE - 1),
      j: getRandomInt(0, gLevel.SIZE - 1),
    },
  };

  board[mine.location.i][mine.location.j].isMine = true;
  console.log(mine);
  console.log(mine.location.i, mine.location.j);

  //console.log(gMines[i]);

  // if (gMines)
  // if (gMines.includes(mine)) console.log("in array");

  // board[mine.location.i][mine.location.j] = MINE;

  //renderCell(mine.location, MINE);

  return mine;
}

function renderAllMines(gBoard) {
  console.log("render all mines");
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j];
      if (cell.isMine) {
        console.log(cell.location);
        renderCell(cell.location, MINE);
        document.querySelector(".smiley").innerText = sadSmiley;
      }
    }
  }
}

function clearMine(cell) {
  cell.innerText = "";
  cell.style.backgroundColor = "gray";
}

function showMine(cell) {
  cell.innerText = MINE;
  cell.style.backgroundColor = "red";
  setTimeout(() => clearMine(cell), 3000);
}

/* function showMineInterval() {
  gShowMineInterval = setInterval(function () {
    showMine();
  }, 3000);
  clearInterval(gShowMineInterval);
} */
