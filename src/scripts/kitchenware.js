import MovingObject from "./moving_object.js"

const KITCHENWARES = {
    mixer: "../assets/images/mixer.png",
    fryer: "../assets/images/fryer.png"
}

class Kitchenware extends MovingObject{
    constructor(kitchenware,game, x, y, w, h){
        const img = new Image()
        img.src = KITCHENWARES[kitchenware]
        super(x, y, game, img, w, h)
        this.name = kitchenware
    }
}

export default Kitchenware