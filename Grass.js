class Grass extends LivingCreature {
  mul() {
    const newCell = random(this.chooseCell(0));
    if (this.multiplay >= 2 && newCell) {
      const newGrass = new Grass(newCell[0], newCell[1]);
      matrix[newCell[1]][newCell[0]] = 1;
      grassArr.push(newGrass);
      this.multiplay = 0;
    }
    this.multiplay++;
  }
}
