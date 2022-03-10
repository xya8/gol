// class Persanajik1 {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.directions = [];
//     }

//     getNewCoordinats() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];
//     }
//     chooseCell(character) {
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] == character) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     chooseCell1(character1, character2, character3) {
//         this.getNewCoordinats();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }

//     ice() {
//         const cells = this.chooseCell1(1, 2, 3)
        
//     }
// }


