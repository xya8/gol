class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [];
    }

    getNewCoordinats() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinats();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        const newCell = random(this.chooseCell(0));
        if (newCell) {
            grassEaterArr.push(new GrassEater(newCell[0], newCell[1]));
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 20;
        }
    }

    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            if (matrix[newCell[1]][newCell[0]] != 4) {
                matrix[newCell[1]][newCell[0]] = 2;
                matrix[this.y][this.x] = 0;
                this.x = newCell[0];
                this.y = newCell[1];
                this.energy--;
                if(this.energy<=0){
                    this.die();
                }
            }
        }
    }

    eat() {
        const newCell = random(this.chooseCell(1));
        if (newCell) {
            if (matrix[newCell[1]][newCell[0]] != 4) {
                this.energy += 3;

                for (var i in grassArr) {
                    if (grassArr[i].x == newCell[0] && grassArr[i].y == newCell[1]) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                matrix[newCell[1]][newCell[0]] = 2;
                matrix[this.y][this.x] = 0;

                this.x = newCell[0];
                this.y = newCell[1];

                if (this.energy >= 12) {
                    this.mul();
                }
            }
        }
        else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}


