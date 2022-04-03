var socket = io();

const side = 50;

function setup() {
  createCanvas(10 * side, 10 * side);
  background("#acacac");
}

let weath = "winter";

socket.on("weather", function (p) {
  weath = p;
});

document.addEventListener("keydown", (e) => {
  socket.emit("move piso", e.keyCode);
});

function drawing(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (weath == "spring") {
        if (matrix[y][x] == 1) {
          fill("#D8F0E5");
        } else if (matrix[y][x] == 0) {
          fill("#FFFFF7");
        } else if (matrix[y][x] == 2) {
          fill("#FEEECC");
        } else if (matrix[y][x] == 3) {
          fill("#FFD0CF");
        } else if (matrix[y][x] == 4) {
          fill("black");
        } else if (matrix[y][x] == 5) {
          fill("#987A6E");
        }
      }
      if (weath == "winter") {
        if (matrix[y][x] == 1) {
          fill("#FFFFFF");
        } else if (matrix[y][x] == 0) {
          fill("#C9C9C9");
        } else if (matrix[y][x] == 2) {
          fill("#FCDC99");
        } else if (matrix[y][x] == 3) {
          fill("#FFA19F");
        } else if (matrix[y][x] == 4) {
          fill("black");
        } else if (matrix[y][x] == 5) {
          fill("#987A6E");
        }
      }
      if (weath == "summer") {
        if (matrix[y][x] == 1) {
          fill("#94E9C3");
        } else if (matrix[y][x] == 0) {
          fill("#D3FFFF");
        } else if (matrix[y][x] == 2) {
          fill("#FFE09C");
        } else if (matrix[y][x] == 3) {
          fill("#E9A9A8");
        } else if (matrix[y][x] == 4) {
          fill("black");
        } else if (matrix[y][x] == 5) {
          fill("#987A6E");
        }
      }
      if (weath == "autumn") {
        if (matrix[y][x] == 1) {
          fill("#EBE5A9");
        } else if (matrix[y][x] == 0) {
          fill("#F7E0F4");
        } else if (matrix[y][x] == 2) {
          fill("#FCCA9A");
        } else if (matrix[y][x] == 3) {
          fill("#F7906B");
        } else if (matrix[y][x] == 4) {
          fill("black");
        } else if (matrix[y][x] == 5) {
          fill("#987A6E");
        }
      }
      rect(x * side, y * side, side, side);
    }
  }
}

function persanajik2() {
  socket.emit("create pers2");
}

function meow() {
  var audio = new Audio("./Cat-sound-mp3.mp3");
  audio.play();
}

function spawnPiso() {
  // console.log("create");
  socket.emit("create piso");
} //------------------------------------------------------------------

setInterval(function () {
  socket.on("send", drawing);
}, 1000);

function kill() {
  socket.emit("kill");
}

function gen() {
  socket.emit("gen");
}
