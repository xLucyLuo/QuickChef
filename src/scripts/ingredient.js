import MovingObject from "./moving_object.js"

const INGREDIENTS = {
    flour: "https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/flour.png",
    egg:"https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/egg.png",
    strawberry:"https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/strawberry.png",
    chocolate:"https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/chocolate.png",
    milk:"https://github.com/xLucyLuo/QuickChef/blob/main/assets/images/milk.png"

}

class Ingredient extends MovingObject{
    constructor(ingredient, game, x, y, w, h){
        const img = new Image()
        img.src = INGREDIENTS[ingredient]
        super(x, y, game, w, h, img)
        this.name = ingredient
        this.vel = 3
        this.seq = [this.name]
        // this.isFalling = false;
    }

    fall(interval){
        // this.isFalling = true
        setInterval(this.moveDown.bind(this), interval)
    }
}

export default Ingredient