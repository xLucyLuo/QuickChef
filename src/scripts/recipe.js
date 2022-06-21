import Ingredient from "./ingredient"
import Kitchenware from "./kitchenware"

const RECIPES = [
    {
        name:"strawberry donut",
        seq: "[fryer,[[mixer,[egg,flour,strawberry]]]]",
        ingredients:["egg", "flour", "strawberry"],
        kitchenwares:["mixer", "fryer"],
        timer: 100000,
        points: 15,
        img: "../assets/images/strawberry_donut.png"
    },
    {
        name:"chocolate donut",
        seq: "[fryer,[[mixer,[chocolate,egg,flour]]]]",
        ingredients:["chocolate","egg", "flour"],
        kitchenwares:["mixer", "fryer"],
        timer: 100000,
        points: 15,
        img: "../assets/images/chocolate_donut.png"
    },
    {
        name:"honey donut",
        seq: "[fryer,[[mixer,[egg,flour,honey]]]]",
        ingredients:["egg", "flour", "honey"],
        kitchenwares:["mixer", "fryer"],
        timer: 100000,
        points: 15,
        img: "../assets/images/honey_donut.png"
    },
    {
        name:"pancake",
        seq: "[pan,[[mixer,[egg,flour]]]]",
        ingredients:["egg", "flour"],
        kitchenwares:["mixer", "pan"],
        timer: 100000,
        points: 12,
        img: "../assets/images/pancake.png"
    },
    // {
    //     name:"hot chocolate",
    //     seq: "[pot,[chocolate,milk]",
    //     ingredients:["chocolate", "milk"],
    //     kitchenwares:["pot"],
    //     timer: 100000,
    //     points: 120,
    //     img: "../assets/images/hot_chocolate.png"
    // },
    {
        name:"blueberry pie",
        seq: "[oven,[[mixer,[blueberry,egg,flour]]]]",
        ingredients:["blueberry", "egg", "flour"],
        kitchenwares:["mixer", "oven"],
        timer: 100000,
        points: 15,
        img: "../assets/images/blueberry_pie.png"
    },
    {
        name:"chocolate_cake",
        seq: "[oven,[[mixer,[chocolate,egg,flour,honey]]]]",
        ingredients:["chocolate", "egg", "flour", "honey"],
        kitchenwares:["mixer", "oven"],
        timer: 100000,
        points: 20,
        img: "../assets/images/chocolate_cake.png"
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
            this.kitchenwares.push(new Kitchenware(kitchenware,game, 0,0,this.width*0.5, this.height*0.5))
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
            this.ingredients[i].x = this.x + this.width + this.ingredients[i].width*i+5
            this.ingredients[i].y = this.y+15
            this.ingredients[i].draw()
        }
        for(let i = 0; i < this.kitchenwares.length; i++){
            this.kitchenwares[i].x = this.x + this.width+this.kitchenwares[i].width*i+5
            this.kitchenwares[i].y = this.y+this.kitchenwares[i].height
            this.kitchenwares[i].draw()
        }
    }

    copy(){

    }

}

export default Recipe
