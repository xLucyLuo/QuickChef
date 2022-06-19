import Ingredient from "./ingredient.js"
import MovingObject from "./moving_object.js"

class AssemblyStation extends MovingObject{
    constructor(maxSize, game, x, y, w, h){
        super(x, y, game, w, h)
        this.maxSize = maxSize
        this.vel = 0
        this.items = []
    }

    draw(){
        super.draw()
        this.game.ctx.font = "25px Comic Sans MS";
        this.game.ctx.fillStyle = "white";
        this.game.ctx.fillText("Assembly Station", this.x+5, this.y-10);

        const numRows = 2
        const numCol = this.maxSize/numRows
        const itemHeight = (this.height-10) / numRows - 3*numRows
        const itemWidth = (this.width-50) / numCol - 3*numCol

        for (let i =0; i < numRows; i++){
            for (let j=0; j < numCol; j++){
                let idx = j*(numRows)+i
                if (this.items[idx]){
                  this.items[idx].x = i*(itemWidth*1.2)+this.x+3
                  this.items[idx].y = (this.y-this.height+3) + (j+numRows)*(itemHeight*1.2)
                  this.items[idx].width = itemWidth
                  this.items[idx].height = itemHeight
                  this.items[idx].draw();
                }
            }
        }
    }

    addItem(obj){
        if(this.items.length<this.maxSize){
            this.items.push(obj)
        }
    }
}

export default AssemblyStation