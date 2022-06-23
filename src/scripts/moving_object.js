
const ANIMATION_SPEED = 8
const VEL = 0

class MovingObject {
  constructor(x,y, game, width, height, img){
    this.dimensions = game.dimensions;
    this.x = x;
    this.y = y;
//     this.y = this.dimensions.height / 2;
    this.game = game;
    this.img = img;
    this.width = width
    this.height = height
    this.vel = VEL;

  }

  draw(){
    if (this.img === undefined){
      this.game.ctx.lineWidth = 2
      this.game.ctx.strokeStyle = "#63452a"
      this.game.ctx.fillStyle = "#ecd4b4";
      this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }else {
      this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  moveLeft() {
    const leftLimit = 0
    const x2 = this.x - this.vel
    if (x2 >= leftLimit){
      this.x = x2;
    }
  }

  moveRight() {
    // const rightLimit = this.dimensions.width*0.80-this.width+5
    const rightLimit = this.dimensions.width-this.width-3
    const x2 = this.x + this.vel
    if (x2 < rightLimit){
      this.x = x2;
    }
  }

  moveDown() {
    // const bottomLimit = this.dimensions.height//-this.height
    const y2 = this.y + this.vel
    // if (y2 < bottomLimit){
    this.y = y2;
    // }
  }
  
}
export default MovingObject 