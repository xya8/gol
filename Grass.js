let LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature {
  mul() {
    let emptyCells = this.chooseCell(0);
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (this.multiplay >= 2 && newCell) {
      const newGrass = new Grass(newCell[0], newCell[1]);
      matrix[newCell[1]][newCell[0]] = 1;
      grassArr.push(newGrass);
      this.multiplay = 0;
    }
    this.multiplay++;
  }
};
