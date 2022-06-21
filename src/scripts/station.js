import Utils from './utils.js'
import MovingObject from "./moving_object.js"
import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware"

class Station extends MovingObject{
    constructor(maxSize, game, x, y, w, h, type, bgColor="white", labelColor="black"){
        const img = new Image();
        img.src = "../assets/images/plate.png";
        super(x, y, game, w, h, img)
        this.maxSize = maxSize
        this.name = "plate"
        this.vel = 0
        this.heldItems = []
        this.seq = this.name
        this.type = type
        this.bgColor = bgColor
        this.labelColor = labelColor

        // this.heldItems = [new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)]

        // const kitchenware = new Kitchenware("oven", game,0,0,0,0)
        // kitchenware.addItems([new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient
        // ("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)])
        // const kitchenware2 = new Kitchenware("mixer", game,0,0,0,0)
        // kitchenware2.addItems([new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)])
        // const kitchenware3 = new Kitchenware("pan", game,0,0,0,0)
        // kitchenware3.addItems([new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)])
        // const kitchenware4 = new Kitchenware("fryer", game,0,0,0,0)
        // kitchenware4.addItems([new Ingredient("chocolate", game,0,0,0,0),new Ingredient("egg", game,0,0,0,0),new Ingredient("strawberry", game,0,0,0,0), new Ingredient("flour", game,0,0,0,0)])
        // this.heldItems = [kitchenware,kitchenware2,kitchenware3,kitchenware4]
    }

    draw(){
        this.game.ctx.font = "25px Comic Sans MS";
        this.game.ctx.fillStyle = this.labelColor;
        this.game.ctx.fillText(this.type, this.x+5, this.y-10);
        this.game.ctx.lineWidth = 2
        this.game.ctx.strokeStyle = "#63452a"
        this.game.ctx.fillStyle = this.bgColor;
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        super.draw()
        const numRow = 2
        const numCol = this.maxSize/numRow

        
        for (let i =0; i < numRow; i++){
            for (let j=0; j < numCol; j++){
                let idx = j*(numRow)+i
                // let idx = this.heldItems.length-(j*(numRow)+i)-1
                const itemHeight = (this.height*.87-10) / numRow - 3*numRow
                const itemWidth = (this.width*.87-50) / numCol - 3*numCol

                //can add if statement for sizing kitchenware vs ingredient
  
                if (this.heldItems[idx]){
                  this.heldItems[idx].x = i*(itemWidth*1.3)+this.x+40
                  this.heldItems[idx].y = (this.game.dimensions.height-itemHeight-10) - (j)*(itemHeight*1.3)
                  this.heldItems[idx].width = itemWidth
                  this.heldItems[idx].height = itemHeight
                  this.heldItems[idx].draw();
                }
            }
        }
    }

    addItems(items){
        for(let item of items){
            if(this.heldItems.length<this.maxSize){
                this.heldItems.push(item)
            }
        }
        this.seq = Utils.getSeq(this, this.heldItems)
    }

    removeAll(){
        const items = this.heldItems
        this.heldItems =[]
        this.seq = ["plate"]
        return items
    }
}

export default Station