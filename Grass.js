class Grass  extends LivingCreature{
    constructor(x, y) {
       super(x,y)
        
    }


    mul() {

        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)
        if (newCell && this.multiply >= 8) {

            var newX = newCell[0]
            var newY = newCell[1]

            var gr = new Grass(newX, newY)
            grassArr.push(gr)

            matrix[newY][newX] = 1

            this.multiply = 0
        }


    }
}