import MovingObject from "./moving_object.js"

class Chef extends MovingObject{
    constructor(dimentions, game){
        super(dimentions, game)
    }
}

export default Chef

// function func(){
//     console.log("another way")
// }

// export default func // will not need to destructure in project import if export default