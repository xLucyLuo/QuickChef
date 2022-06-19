import MovingObject from "./moving_object.js"

const INGREDIENTS = {
    flour: "../assets/images/flour.png",
    egg:"../assets/images/egg.png",
    strawberry:"../assets/images/strawberry.png"
}

class Ingredient extends MovingObject{
    constructor(ingredient, game, x, y, w, h){
        const img = new Image()
        img.src = INGREDIENTS[ingredient]
        super(x, y, game, img, w, h)
        this.name = ingredient
    }
}

export default Ingredient