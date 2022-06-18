import MovingObject from "./moving_object.js"

class Chef extends MovingObject{
    constructor(dimentions, game){
        const img = new Image();
        img.src = "../assets/images/chef.jpg";
        super(dimentions, game, img)
    }
}

export default Chef

// function func(){
//     console.log("another way")
// }

// export default func // will not need to destructure in project import if export default