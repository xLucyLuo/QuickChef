import Ingredient from "./ingredient"
import Kitchenware from "./kitchenware"

const RECIPES = [
    {
        name:"strawberry donut",
        seq: "[oven,[[mixer,[egg,flour,strawberry]]]]",
        ingredients:["egg", "flour", "strawberry"],
        kitchenwares:["mixer", "oven"],
        timer: 100000,
        points: 200,
        img: "../assets/images/donut.png"
    }
]

class Recipe {
    constructor(game, x, y, w, h){
        const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)]
        this.game = game
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.name = recipe.name
        this.seq = recipe.seq

        this.ingredients = []
        for(let ingredient of recipe.ingredients){
            this.ingredients.push(new Ingredient(ingredient, game, 0,0,this.width*0.35, this.height*0.35))
        }

        this.kitchenwares = []
        for(let kitchenware of recipe.kitchenwares){
            this.kitchenwares.push(new Kitchenware(kitchenware,game, 0,0,this.width*0.35, this.height*0.35))
        }

        this.timer = recipe.timer
        this.points = recipe.points
        this.img = new Image()
        this.img.src = recipe.img
    }

    draw(){
        this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // const x = this.x
        // const y = this.y
        for(let i = 0; i < this.ingredients.length; i++){
            this.ingredients[i].x = this.x + this.width + this.ingredients[i].width*i
            this.ingredients[i].y = this.y+15
            this.ingredients[i].draw()
        }
        for(let i = 0; i < this.kitchenwares.length; i++){
            this.kitchenwares[i].x = this.x + this.width+this.kitchenwares[i].width*i
            this.kitchenwares[i].y = this.y+15+this.kitchenwares[i].height
            this.kitchenwares[i].draw()
        }
    }

    copy(){

    }

}

export default Recipe
