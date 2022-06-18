
const ANIMATION_SPEED = 8
const VEL = 5
const WIDTH = 100
const HEIGHT = 120

class MovingObject {
  constructor(dimensions, game, img){
    this.dimensions = dimensions;
    this.x = this.dimensions.width/ 2;
    this.y = this.dimensions.height - HEIGHT;
//     this.y = this.dimensions.height / 2;
    this.game = game;
    this.vel = VEL;
    this.img = img;
  }

  draw(){
    // debugger
    if (this.img === undefined){
      this.game.ctx.fillStyle = "red";
      this.game.ctx.fillRect(this.x, this.y, WIDTH, HEIGHT);
    }else {
      this.game.ctx.drawImage(this.img, this.x, this.y, WIDTH, HEIGHT);
    }
  }

  moveLeft() {
    this.x -= this.vel;
  }

  moveRight() {
    this.x += this.vel;
  }
  

}
export default MovingObject

//   flap() {
//     //if this were a more realistic bird simulation, we would be adding to the velocity
//     //instead of just assigning it outright
//     //to make the experience more fun and 'bouncy' we just set it directly
//     this.vel = -1 * CONSTANTS.FLAP_SPEED;
//   }

//   moveBird() {
//     //for each frame, the bird should move by it's current velocity
//     //velocity is 'pixels per frame', so each frame it should update position by vel
//     this.y += this.vel;
//     //the acceleration of gravity is in pixels per second per second
//     //so each second, it changes the velocity by whatever the gravity constant is
//     this.vel += CONSTANTS.GRAVITY;
//     //we set a 'terminal velocity', a maximum speed the bird can travel
//     //this keeps the game from becoming too wild because the bird is moving too fast to control
//     if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
//       //if the terminal velocity is exceeded, we set it to the terminal velicty
//       if (this.vel > 0) {
//         this.vel = CONSTANTS.TERMINAL_VEL;
//       } else {
//         this.vel = CONSTANTS.TERMINAL_VEL * -1;
//       }
//     }
//   }

//   animate(ctx) {
//     this.moveBird();
//     this.drawBird(ctx);
//   }



//   bounds() {
//     return {
//       left: this.x,
//       right: this.x + CONSTANTS.BIRD_WIDTH,
//       top: this.y,
//       bottom: this.y + CONSTANTS.BIRD_HEIGHT
//     };
//   }

//   outOfBounds() {
//     const aboveTheTop = this.y < 0;
//     const belowTheBottom = this.y + CONSTANTS.BIRD_HEIGHT > this.dimensions.height;
//     return aboveTheTop || belowTheBottom;
//   }
// }




// function MovingObject(options) {
//   this.pos = options.pos;
//   this.vel = options.vel;
//   this.radius = options.radius;
//   this.color = options.color;
//   this.game = options.game;
// }

// MovingObject.prototype.collideWith = function collideWith(otherObject) {
//   // default do nothing
// };

// MovingObject.prototype.draw = function draw(ctx) {
//   ctx.fillStyle = this.color;

//   ctx.beginPath();
//   ctx.arc(
//     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
//   );
//   ctx.fill();
// };

// MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
//   const centerDist = Util.dist(this.pos, otherObject.pos);
//   return centerDist < (this.radius + otherObject.radius);
// };

// MovingObject.prototype.isWrappable = true;

// const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
// MovingObject.prototype.move = function move(timeDelta) {
//   // timeDelta is number of milliseconds since last move
//   // if the computer is busy the time delta will be larger
//   // in this case the MovingObject should move farther in this frame
//   // velocity of object is how far it should move in 1/60th of a second
//   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
//       offsetX = this.vel[0] * velocityScale,
//       offsetY = this.vel[1] * velocityScale;

//   this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

//   if (this.game.isOutOfBounds(this.pos)) {
//     if (this.isWrappable) {
//       this.pos = this.game.wrap(this.pos);
//     } else {
//       this.remove();
//     }
//   }
// };

// MovingObject.prototype.remove = function remove() {
//   this.game.remove(this);
// };


