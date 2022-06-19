import MovingObject from "./moving_object.js"

const WIDTH = 110
const HEIGHT = 150

class Chef extends MovingObject{
    constructor(game){
        const img = new Image();
        img.src = "../assets/images/chef.png";
        super(game.dimensions.width/2, game.dimensions.height - HEIGHT, game, img, WIDTH, HEIGHT)
    }
}

export default Chef

// function func(){
//     console.log("another way")
// }

// export default func // will not need to destructure in project import if export default