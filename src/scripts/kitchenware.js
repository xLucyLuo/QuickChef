import MovingObject from "./moving_object.js"
import Utils from './utils.js'

const KITCHENWARES = {
    mixer: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/mixer.png",
    fryer: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/fryer.png",
    oven: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/oven.png",
    pan: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/pan.png",
    knife: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/knife.png",
    pot: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/pot.png",
    blender: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/blender.png",
    plate: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/plate.png"
}

//in milliseconds
const PROCESS_TIME = {
    mixer: 15000,
    fryer: 15000,
    oven: 15000,
    pan: 15000,
    knife: 15000,
    pot: 15000,
    blender: 15000
}

class Kitchenware extends MovingObject{
    constructor(kitchenware, game, x, y, w, h){
        const img = new Image()
        img.src = KITCHENWARES[kitchenware]
        super(x, y, game, w, h, img)
        this.name = kitchenware
        this.heldItems = []
        this.seq = [this.name]
    }

    addItems(items){
        this.heldItems=items
        for (let item of this.heldItems){
            item.vel = 0
        }
        this.seq = Utils.getSeq(this, this.heldItems)
    }

    draw(){
        super.draw()
        const numCol = 2
        const numRow = Math.ceil(this.heldItems.length/numCol)

        for (let i=0; i < numRow; i++){
            for (let j=0; j< numCol; j++){
                let idx = i+j*numRow
                if (idx<this.heldItems.length){
                    this.heldItems[idx].width = this.width*0.5
                    this.heldItems[idx].height =this.height*0.5
                    this.heldItems[idx].x = this.x -15 + this.heldItems[idx].width*0.9*i
                    this.heldItems[idx].y = this.y+20-this.heldItems[idx].height*0.9*(j+1)
                    this.heldItems[idx].draw()
                }
            }
        }
    }

    fall(interval){
        // this.isFalling = true
        // debugger
        this.vel = interval/PROCESS_TIME[this.name]*this.game.dimensions.height
        setInterval(this.moveDown.bind(this),interval)
    }
}

export default Kitchenware