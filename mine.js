const MINE = "💣";
var gShowMineInterval;
var gMines;
var gMine;

function createMines(board) {
  gMines = [];

  for (var i = 0; i < gLevel.MINES; i++) {
    gMine = createMine(gBoard);

    if (gMines.indexOf(`${gMine.location.i}${gMine.location.j}`) != -1) {
      console.log(gMines.indexOf`${gMine.location.i}${gMine.location.j}`);
      //gMines.push([gMine.location.i, gMine.location.j]);
      console.log(gMine, "is already in array");
      console.log(gMines);
    } else {
      gMines.push(`${gMine.location.i}${gMine.location.j}`);
      console.log(gMines.indexOf`${gMine.location.i}${gMine.location.j}`);
    }
    console.log(gMines);

    /* for (i = 0; i < gMines.length; i++) {
      if (gMines.length > 0) {
        if (
          gMine.location.i == gMines[i][0] &&
          gMine.location.j == gMines[i][1]
        ) {
          console.log(gMine, "is already in array");
          console.log(gMines);
        } else {
          gMines.push([gMine.location.i, gMine.location.j]);
        }
      }
    } */
    //if (gMines.length == 0) continue;
    /* console.log(gMines);
    if (gMines.length > 0) {
      if (
        gMine.location.i == gMines[i][0] &&
        gMine.location.j == gMines[i][1]
      ) {
        console.log(
          "already in array",
          "gmine",
          gMine.location.i,
          gMine.location.j,
          gMines
        );
      } else {
        gMines.push(gMine);
      }
    } */
  }
}

function createMine(board) {
  gMine = {
    location: {
      i: getRandomInt(0, gLevel.SIZE - 1),
      j: getRandomInt(0, gLevel.SIZE - 1),
    },
  };
  console.log(gMine);
  /*   for (i = 0; i < gMines.length; i++) {
    // if (gMines.length > 0) {
    if (gMine.location.i == gMines[i][0] && gMine.location.j == gMines[i][1]) {
      console.log(gMine, "is already in array");
      console.log(gMines);
    } else {
      gMines.push([gMine.location.i, gMine.location.j]);
    }
  } */
  gBoard[gMine.location.i][gMine.location.j].isMine = true;
  return gMine;
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
