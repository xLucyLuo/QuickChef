import MovingObject from "./moving_object.js"

const WIDTH = 110
const HEIGHT = 150

class Chef extends MovingObject{
    constructor(game){
        const img = new Image();
        img.src = "../assets/images/chef.png";
        super(game.dimensions.width/2, game.dimensions.height - HEIGHT-5, game, WIDTH, HEIGHT, img)
        this.itemHeld = null;
        this.vel = 10
    }

    catch(item){
        this.itemHeld = item
        this.itemHeld.vel = 0
        this.moveHeldItem();
    }

    throw(){
        let item = this.itemHeld
        this.itemHeld = null
        return item
    }

    draw(){
        super.draw()
        if (this.itemHeld){
            this.itemHeld.draw();
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
        if (this.itemHeld){
            this.itemHeld.x = this.x-this.width/3
            this.itemHeld.y = this.y+this.height/2//-this.itemHeld.width
        }
    }
}

export default Chef

// function func(){
//     console.log("another way")
// }

// export default func // will not need to destructure in project import if export default