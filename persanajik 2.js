class Persanajik2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }

    getNewCoordinats(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],

            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],

            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],

            [this.x, this.y + 3],
            [this.x, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
        ]; 
    }
    chooseCell1(character1, character2, character3) {
        this.getNewCoordinats();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat(){
        const cells = this.chooseCell1(1, 2, 3)
        for (const newCell of cells){
            if (newCell) {
                for (let i in grassArr) {
                    if (grassArr[i].x == newCell[0] && grassArr[i].y == newCell[1]) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
                for (let i in grassEaterArr) {
                    if (grassEaterArr[i].x == newCell[0] && grassEaterArr[i].y == newCell[1]) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                for (let i in grassEaterEaterArr) {
                    if (grassEaterEaterArr[i].x == newCell[0] && grassEaterEaterArr[i].y == newCell[1]) {
                        grassEaterEaterArr.splice(i, 1);
                        break;
                    }
                }
                matrix[newCell[1]][newCell[0]] = 0;
            }
        }
        this.die();
    }
    die(){
        matrix[this.y][this.x]=0;
        for(var i in persanajik2Arr){
            if(this.x == persanajik2Arr[i].x && this.y ==persanajik2Arr[i].y){
                persanajik2Arr.splice(i, 1);
                break;
            }
        }
    }
}