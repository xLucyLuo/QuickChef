import MovingObject from "./moving_object.js"

const INGREDIENTS = {
    flour: "../assets/images/flour.png",
    egg:"../assets/images/egg.png",
    strawberry:"../assets/images/strawberry.png",
    chocolate:"../assets/images/chocolate.png"
}

class Ingredient extends MovingObject{
    constructor(ingredient, game, x, y, w, h){
        const img = new Image()
        img.src = INGREDIENTS[ingredient]
        super(x, y, game, w, h, img)
        this.name = ingredient
        this.vel = 5
        // this.isFalling = false;
    }

    fall(interval){
        // this.isFalling = true
        setInterval(this.moveDown.bind(this), interval)
    }
}

export default Ingredient