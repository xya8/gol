class Piso {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        document.onkeydown = this.checkKey;
        this.meow = new Audio('./Cat-sound-mp3.mp3')
    }

    getSkin(x, y){
        return [
            [x, y],
            [x + 1, y],
            [x + 2, y],
            [x - 1, y],
            [x - 2, y],
            [x, y + 1],
            [x + 1, y + 1],
            [x + 2, y + 1],
            [x - 1, y + 1],
            [x + 2, y - 1],
            [x + 3, y - 1],
            [x + 2, y - 2],
            [x + 3, y - 2],
            [x + 4, y - 2],
            [x + 1, y - 2],
            [x + 4, y - 3],
            [x + 1, y - 3],
            [x - 2, y - 1],
            [x - 3, y - 1],
            [x - 4, y - 2],
            [x - 3, y - 3],
            [x - 1, y + 2],
            [x - 1, y + 3],
            [x + 2, y + 2],
            [x + 2, y + 3]
        ]
    }

    eat(cells){
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
                        console.log(grassEaterArr);
                        
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
                console.log(matrix[newCell[1]][newCell[0]]);
                
            }
        }
    }
    
    playMeow(){
        this.meow.play()
    }
    
    move(x, y) {
        if ((x >= 4 && x < matrix[0].length - 4) && (y >= 3 && y <= matrix.length - 4)) {
            for (const coord of this.getSkin(this.x, this.y)) {
                matrix[coord[1]][coord[0]] = 0;
                this.eat(this.getSkin(this.x, this.y))
            }
            for (const coord of this.getSkin(x, y)) {
                matrix[coord[1]][coord[0]] = 4;
            }
            this.x = x;
            this.y = y;
        }
    }
    
    checkKey = (e) => {
        e = e || window.event;
        if (e.keyCode == '38') {
            this.move(this.x, this.y - 1)
        }
        else if (e.keyCode == '40') {
            this.move(this.x, this.y + 1)
        }
        else if (e.keyCode == '37') {
            this.move(this.x - 1, this.y)
        }
        else if (e.keyCode == '39') {
            this.move(this.x + 1, this.y)
        }
        if (e.keyCode == '32'){
            this.playMeow()
            this.move(this.x, this.y)
        }
    }
}