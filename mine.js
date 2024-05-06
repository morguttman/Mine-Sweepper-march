const MINE = "💣";

var gMines = [];

function createMines(board) {
  gMines = [];
  for (i = 0; i < gLevel.MINES; i++) {
    console.log(gLevel.MINES);
    createMine(board);
  }
}

function createMine(board) {
  const mine = {
    location: {
      i: getRandomIntInclusive(0, gLevel.SIZE - 1),
      j: getRandomIntInclusive(0, gLevel.SIZE - 1),
    },
  };

  board[mine.location.i][mine.location.j].isMine = true;
  console.log(mine, board[mine.location.i][mine.location.j].isMine);
  /* gMines.push(mine);
  board[mine.location.i][mine.location.j] = MINE;
  console.log(mine.location); */
  //renderCell(mine.location, MINE);
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
