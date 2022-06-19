import MovingObject from "./moving_object.js"

const KITCHENWARES = {
    mixer: "../assets/images/mixer.png",
    fryer: "../assets/images/fryer.png",
    oven: "../assets/images/oven.png",
    pan: "../assets/images/pan.png",
    knife: "../assets/images/knife.png",
    pot: "../assets/images/pot.png",
    blender: "../assets/images/blender.png",
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
        this.processingItem = null
    }

    process(ingredient){
        this.processingItem = ingredient
        this.processingItem.vel = 0
        this.processingItem.width *=0.5
        this.processingItem.height *=0.5
    }

    draw(){
        super.draw()
        if (this.processingItem){
            this.processingItem.x = this.x-5
            this.processingItem.y = this.y-5
            this.processingItem.draw()
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