
const RECIPES = [
    {
        name:"strawberry donut",
        process: ["egg", "flour", "strawberry", "mixer", "oven"],
        timer: 100000,
        points: 200,
        img: "../assets/images/donut.png"
    }
]

class Recipe {
    constructor(){
        const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)]
        this.name = recipe.name
        this.process = recipe.process
        this.timer = recipe.timer
        this.points = recipe.points
        this.img = recipe.img
    }

}

export default Recipe
