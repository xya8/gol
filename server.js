var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
// app.get("/piso", function (req, res) {
//   res.redirect("piso.html");
// });
server.listen(3000, () => {
  console.log("connected");
});

matrix = [];

function generator(matrixSize, grass, grassEater, grassEaterEater) {
  for (let i = 0; i < matrixSize; i++) {
    matrix[i] = [];
    for (let j = 0; j < matrixSize; j++) {
      matrix[i][j] = 0;
    }
  }
  for (let i = 0; i < grass; i++) {
    x1 = Math.floor(Math.random() * matrixSize);
    y1 = Math.floor(Math.random() * matrixSize);
    if (matrix[y1][x1] === 0) {
      matrix[y1][x1] = 1;
    } else {
      i--;
    }
  }
  for (let i = 0; i < grassEater; i++) {
    x1 = Math.floor(Math.random() * matrixSize);
    y1 = Math.floor(Math.random() * matrixSize);
    if (matrix[y1][x1] === 0) {
      matrix[y1][x1] = 2;
    } else {
      i--;
    }
  }
  for (let i = 0; i < grassEaterEater; i++) {
    x1 = Math.floor(Math.random() * matrixSize);
    y1 = Math.floor(Math.random() * matrixSize);
    if (matrix[y1][x1] === 0) {
      matrix[y1][x1] = 3;
    } else {
      i--;
    }
  }
  return matrix;
}

io.sockets.emit("send", generator(10, 3, 2, 3));

function gen() {
  grassArr = [];
  grassEaterArr = [];
  grassEaterEaterArr = [];
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send", matrix);
  generator(10, 3, 2, 3);
  createObject();
  game();
  io.sockets.emit("send", matrix);
}

grassArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
persanajik2Arr = [];
piso = null; //------------------------------------------------------------------

Grass = require("./Grass");
GrassEater = require("./GrassEater");
GrassEaterEater = require("./GrassEaterEater");
Persanajik2 = require("./persanajik 2");
Piso = require("./piso"); //------------------------------------------------------------------

function createObject() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        grassArr.push(new Grass(x, y));
      }
      if (matrix[y][x] == 2) {
        grassEaterArr.push(new GrassEater(x, y));
      }
      if (matrix[y][x] == 3) {
        grassEaterEaterArr.push(new GrassEaterEater(x, y));
      }
      // if (matrix[y][x] == 4) {
      //   pisoarr.push(new Piso(4, 3));
      // }
    }
  }
  io.sockets.emit("send", matrix);
}

function game() {
  for (let i in grassArr) {
    grassArr[i].mul();
  }
  for (let i in grassEaterArr) {
    grassEaterArr[i].eat();
  }
  for (let i in grassEaterEaterArr) {
    grassEaterEaterArr[i].eat();
  }
  for (let i in persanajik2Arr) {
    persanajik2Arr[i].eat();
    // console.log(persanajik2Arr[i]);
  }

  io.sockets.emit("send", matrix);
}
setInterval(game, 1000);

function kill() {
  grassArr = [];
  grassEaterArr = [];
  grassEaterEaterArr = [];
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send", matrix);
}

function persanaj2() {
  (function (matrixSize, pers2) {
    for (i = 0; i < pers2; i++) {
      x1 = Math.floor(Math.random() * matrixSize);
      y1 = Math.floor(Math.random() * matrixSize);
      matrix[y1][x1] = 5;
      persanajik2Arr.push(new Persanajik2(x1, y1));
    }
  })(10, 2);
}

function spawnPisoo() {
  // console.log("pisooooo");
  piso = new Piso(4, 3);
  console.log(piso.move());
  // for (p in pisoarr) {
  //   pisoarr.push(new Piso(4, 3));
  //   pisoarr.checkKey();
  // }
} //------------------------------------------------------------------

//function piso.checkKey
function movePiso(key) {
  console.log(key);
  piso.checkKey(key);
}

io.on("connection", function (socket) {
  createObject();
  socket.on("create pers2", persanaj2);
  socket.on("create piso", spawnPisoo); //------------------------------------------------------------------
  socket.on("move piso", movePiso); //------------------------------------------------------------------
  socket.on("kill", kill);
  socket.on("gen", gen);
});

let weath = "winter";

function weather() {
  if (weath == "winter") {
    weath = "spring";
  } else if (weath == "spring") {
    weath = "summer";
  } else if (weath == "summer") {
    weath = "autumn";
  } else if (weath == "autumn") {
    weath = "winter";
  }
  io.sockets.emit("weather", weath);
}
setInterval(weather, 5000);

var statistics = {};

setInterval(function () {
  statistics.grass = grassArr.length;
  statistics.grassEater = grassEaterArr.length;
  statistics.grassEaterEater = grassEaterEaterArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    console.log("send");
  });
}, 1000);
