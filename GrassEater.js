let LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 20;
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
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinats();
    return super.chooseCell(character);
  }
  mul() {
    let emptyCalls = this.chooseCell(0);
    const newCell = emptyCalls[Math.floor(Math.random() * emptyCalls.length)];
    if (newCell) {
      grassEaterArr.push(new GrassEater(newCell[0], newCell[1]));
      matrix[newCell[1]][newCell[0]] = 2;
      this.energy = 20;
    }
  }

  move() {
    let emptyCalls = this.chooseCell(0);
    const newCell = emptyCalls[Math.floor(Math.random() * emptyCalls.length)];
    if (newCell) {
      if (matrix[newCell[1]][newCell[0]] != 4) {
        matrix[newCell[1]][newCell[0]] = 2;
        matrix[this.y][this.x] = 0;
        this.x = newCell[0];
        this.y = newCell[1];
        this.energy--;
        if (this.energy <= 0) {
          this.die();
        }
      }
    }
  }

  eat() {
    let emptyCalls = this.chooseCell(1);
    const newCell = emptyCalls[Math.floor(Math.random() * emptyCalls.length)];
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
    } else {
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
};
