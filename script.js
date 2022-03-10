var matrix = [];
var grassArr = [];
var grassEaterArr = [];
var grassEaterEaterArr = [];
var persanajik2Arr = [];
var piso = null;
const side = 50;

function spawnPiso() {
    if(!piso){
        piso = new Piso(4, 3)
    }
}
function persanajik2() {
    (function (matrixSize, persanajik2) {
        for (i = 0; i < persanajik2; i++) {
            x1 = Math.floor(random(matrixSize));
            y1 = Math.floor(random(matrixSize));
            matrix[y1][x1] = 5;
            persanajik2Arr.push(new Persanajik2(x1, y1))
        }
    })(10, 2)

}
function setup() {
    function generator(matrixSize, grass, grassEater, grassEaterEater) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let j = 0; j < matrixSize; j++) {
                matrix[i][j] = 0;
            }
        }
        for (i = 0; i < grass; i++) {
            x1 = Math.floor(random(matrixSize));
            y1 = Math.floor(random(matrixSize));
            matrix[y1][x1] = 1;
        
        }
        for (i = 0; i < grassEater; i++) {
            x1 = Math.floor(random(matrixSize));
            y1 = Math.floor(random(matrixSize));
            matrix[y1][x1] = 2;
        }
        for (i = 0; i < grassEaterEater; i++) {
            x1 = Math.floor(random(matrixSize));
            y1 = Math.floor(random(matrixSize));
            matrix[y1][x1] = 3;
        }
    }
    generator(10, 3, 2, 3)
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y));
            }
            if (matrix[y][x] == 2) {
                grassEaterArr.push(new GrassEater(x, y))
            }
            if (matrix[y][x] == 3) {
                grassEaterEaterArr.push(new GrassEaterEater(x, y))
            }
        }

    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#D8F0E5");
            }
            else if (matrix[y][x] == 0) {
                fill("#FFFFF7");
            }
            else if (matrix[y][x] == 2) {
                fill("#FEEECC");
            }
            else if (matrix[y][x] == 3) {
                fill("#FFD0CF");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("#987A6E");
            }
            rect(x * side, y * side, side, side);
        }
    }

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
    }
}

