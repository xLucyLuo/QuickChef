import Kitchenware from "./kitchenware.js";
import MovingObject from "./moving_object.js"

const WIDTH = 110
const HEIGHT = 150

class Chef extends MovingObject{
    constructor(game){
        const img = new Image();
        img.src = "assets/images/chef.png";
        super(game.dimensions.width/2, game.dimensions.height - HEIGHT-5, game, WIDTH, HEIGHT, img)
        this.heldItems = null;
        this.vel = 10
        this.isJumping = false
        this.isMoving = false
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
        let that = this;
        this.isMoving = false
        if(!this.isMoving){
            for(let i = 0; i < 4; i++){
                setTimeout(()=>{
                    if (that.x - that.vel >= 0){
                        that.x -= that.vel;
                    }
                    that.moveHeldItem()
                }, 50*(i+1))
            }
            setTimeout(()=>{this.isMoving = false}, 50*5)
        }
    }
    
    moveRight() {
        // super.moveRight()
        let that = this;
        this.isMoving = false
        if(!this.isMoving){
            for(let i = 0; i < 4; i++){
                setTimeout(()=>{
                    const rightLimit = that.dimensions.width-that.width-3
                    const x2 = that.x + that.vel
                    if (x2 < rightLimit){
                    that.x = x2;
                    }
                    that.moveHeldItem();
                }, 50*(i+1))
            }
            setTimeout(()=>{this.isMoving = false}, 50*5)
        }
    }

    moveUp() {
        this.y = this.y - this.vel*4;
        this.moveHeldItem();
    }

    moveDown() {
        this.y = this.y + this.vel*4;
        this.moveHeldItem();
    }

    jump() {

        if(!this.isJumping){
            this.isJumping = true
            for(let i = 0; i < 8; i++){
                setTimeout(this.moveUp.bind(this), 20*(i+1))
            }
            for(let i = 0; i < 8; i++){
                setTimeout(this.moveDown.bind(this), 20*(i+1)*2)
            }
    
            setTimeout(()=>{this.isJumping = false}, 20*8*2)
        }
    }


    moveHeldItem(){
        if (this.heldItem){
            this.heldItem.x = this.x-this.width/3.3+3
            this.heldItem.y = this.y+this.height*.4+20//-this.heldItem.width
        }
    }
}

export default Chef

// function func(){
//     .log("another way")
// }

// export default func // will not need to destructure in project import if export default