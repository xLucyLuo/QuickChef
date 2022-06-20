import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware.js";
import MovingObject from "./moving_object.js"


class AssemblyStation extends MovingObject{
    constructor(maxSize, game, x, y, w, h){
        const img = new Image();
        img.src = "../assets/images/plate.png";
        super(x, y, game, w, h, img)
        this.maxSize = maxSize
        this.vel = 0
        this.items = []
        // this.items = [new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)]

        // const kitchenware = new Kitchenware("oven", game,0,0,0,0)
        // kitchenware.add([new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)])
        // this.items = [kitchenware,kitchenware,kitchenware,kitchenware]
    }

    draw(){
        this.game.ctx.font = "25px Comic Sans MS";
        this.game.ctx.fillStyle = "white";
        this.game.ctx.fillText("Assembly Station", this.x+5, this.y-10);
        this.game.ctx.lineWidth = 2
        this.game.ctx.strokeStyle = "#63452a"
        this.game.ctx.fillStyle = "#ecd4b4";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        super.draw()
        const numRows = 2
        const numCol = this.maxSize/numRows

        
        for (let i =0; i < numRows; i++){
            for (let j=0; j < numCol; j++){
                let idx = j*(numRows)+i
                const itemHeight = (this.height*.9-10) / numRows - 3*numRows
                const itemWidth = (this.width*.9-50) / numCol - 3*numCol
  
                if (this.items[idx]){
                  this.items[idx].x = i*(itemWidth*1)+this.x+40
                  this.items[idx].y = (this.y-this.height+65) + (j+numRows)*(itemHeight*1)
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

    addItems(objs){
        for(let obj of objs){
            this.addItem(obj)
        }
    }

    removeAll(){
        const items = this.items
        this.items =[]
        return items
    }
}

export default AssemblyStation