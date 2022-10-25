class Predator  extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 10
    }

    chooseCell(char,char1) {
        let found = super.chooseCell(char)

        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char1) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }


    mul() {
        this.multiply++
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.multiply >= 15) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = 3
            var pre = new Predator(newX, newY)
            predatorArr.push(pre)


            this.multiply = 0
        }


    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (newCell && this.energy >= 0) {

            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
        } else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }



    eat() {
        var emptyCells = this.chooseCell(1,2)// արդեն մեր chooseCell-Ը կարող է փնտրել 2 կերպար
        var newCell = random(emptyCells)

        if (newCell) {
            this.energy++

            var newX = newCell[0]
            var newY = newCell[1]
            
            matrix[newY][newX] = matrix[this.y][this.x]

            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY
// արդեն կարող ենք ջնջել և խոտերին և խոտակերերին
            for(var i in grassArr){
                console.log(grassArr);
                if (newX == grassArr[i].x  && newY == grassArr[i].y ) {
                            grassArr.splice(i, 1)
                               break
                }
            }

            for(var i in grassEaterArr){
                if (newX == grassEaterArr[i].x  && newY == grassEaterArr[i].y ) {
                            grassEaterArr.splice(i, 1)
                               break
                }
            }

        }else{
            this.move()
        }
    }

    die(){
        matrix[this.y][this.x]  =  0

           for(var i in predatorArr){
                    if(this.x ==  predatorArr[i].x &&  this.y == predatorArr[i].y){

                            predatorArr.splice(i,1)
                             break
                    }
           }
    }

}