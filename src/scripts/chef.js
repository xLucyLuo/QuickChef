import Kitchenware from "./kitchenware.js";
import MovingObject from "./moving_object.js"

const WIDTH = 110
const HEIGHT = 150

class Chef extends MovingObject{
    constructor(game){
        const img = new Image();
        img.src = "../assets/images/chef.png";
        super(game.dimensions.width/2, game.dimensions.height - HEIGHT-5, game, WIDTH, HEIGHT, img)
        this.heldItem = null;
        this.vel = 10
    }

    catch(item){
        if(item.name === "plate" && item.heldItems.length <2){
            this.heldItem = item.heldItems[0]
        }else{
            this.heldItem = item
        }
        this.heldItem.vel = 0
        this.moveHeldItem();
    }

    throw(){
        let item = this.heldItem
        this.heldItem = null
        return item
    }

    draw(){
        super.draw()
        if (this.heldItem){
            this.heldItem.draw();
        }
    }

    moveLeft() {
        super.moveLeft()
        this.moveHeldItem();
    }
    
    moveRight() {
        super.moveRight()
        this.moveHeldItem();
    }

    moveHeldItem(){
        if (this.heldItem){
            this.heldItem.x = this.x-this.width/3
            this.heldItem.y = this.y+this.height*.4//-this.heldItem.width
        }
    }
}

export default Chef

// function func(){
//     console.log("another way")
// }

// export default func // will not need to destructure in project import if export default