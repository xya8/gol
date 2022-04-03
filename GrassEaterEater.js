let LivingCreature = require("./LivingCreature");
module.exports = class GrassEaterEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 15;
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
      matrix[newCell[1]][newCell[0]] = 3;
      this.energy = 15;
    }
  }

  move() {
    let emptyCalls = this.chooseCell(0);
    const newCell = emptyCalls[Math.floor(Math.random() * emptyCalls.length)];
    if (newCell) {
      matrix[newCell[1]][newCell[0]] = 3;
      matrix[this.y][this.x] = 0;
      this.x = newCell[0];
      this.y = newCell[1];
      this.energy--;
      if (this.energy <= 0) {
        this.die();
      }
    }
  }

  eat() {
    let emptyCalls = this.chooseCell(2);
    const newCell = emptyCalls[Math.floor(Math.random() * emptyCalls.length)];
    if (newCell) {
      this.energy += 10;

      for (var i in grassEaterArr) {
        if (
          grassEaterArr[i].x == newCell[0] &&
          grassEaterArr[i].y == newCell[1]
        ) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }

      matrix[newCell[1]][newCell[0]] = 3;
      matrix[this.y][this.x] = 0;

      this.x = newCell[0];
      this.y = newCell[1];

      if (this.energy >= 8) {
        this.mul();
      }
    } else {
      this.move();
    }
  }

  die() {
    for (var i in grassEaterEaterArr) {
      if (
        this.x == grassEaterEaterArr[i].x &&
        this.y == grassEaterEaterArr[i].y
      ) {
        grassEaterEaterArr.splice(i, 1);
        break;
      }
    }
    matrix[this.y][this.x] = 0;
  }
};
