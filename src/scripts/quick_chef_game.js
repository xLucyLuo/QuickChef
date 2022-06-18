import Chef from "./chef.js"

const BG_COLOR = "#FFA7B6";
const DIM_X = 1000;
const DIM_Y = 600;

class QuickChefGame {
  constructor(canvas) {
    this.canvas = canvas
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.ctx = this.canvas.getContext("2d");
    this.chef = new Chef(this.dimensions, this)
    this.draw()
  }
  

  draw(){
    // debugger
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.ctx.fillStyle = BG_COLOR;
    this.ctx.fillRect(0, 0, DIM_X, DIM_Y);

    this.chef.draw()
    // this.allObjects().forEach(function(object) {
    //   object.draw(ctx);
    // });
  }

  // Game.prototype.draw = function draw(ctx) {

// };

}

export default QuickChefGame

//   play() {
//     this.running = true;
//     this.animate();
//   }

//   restart() {
//     this.running = false;
//     this.score = 0;
//     this.bird = new Bird(this.dimensions);
//     this.level = new Level(this.dimensions);

//     this.animate();
//   }

//   registerEvents() {
//     this.boundClickHandler = this.click.bind(this);
//     this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
//   }

//   click(e) {
//     if (!this.running) {
//       this.play();
//     } 
//     this.bird.flap();
//   }

//   gameOver() {
//     return (
//       this.level.collidesWith(this.bird.bounds()) || this.bird.outOfBounds(this.height)
//     );
//   }

//   //this is the key method of gaming action
//   //animate tells the game to advance one bit
//   //the bird moves, the level moves
//   //everything is redrawn to the screen
//   animate() {
//     //first we move and draw the level
//     this.level.animate(this.ctx);
//     //then we move and draw the bird
//     this.bird.animate(this.ctx);
//     //then we check to see if the game is over and let the player know
//     if (this.gameOver()) {
//       alert(this.score);
//       this.restart();
//     }

//     //we see if they have scored a point by passing a pipe
//     this.level.passedPipe(this.bird.bounds(), () => {
//       this.score += 1;
//       console.log(this.score);
//     });

//     //and draw the score
//     this.drawScore();

//     //if the game is NOT running, we do not animate the next frame
//     if (this.running) {
//       //This calls this function again, after around 1/60th of a second
//       requestAnimationFrame(this.animate.bind(this));
//     }
//   }

//   drawScore() {
//     //loc will be the location 
//     const loc = {x: this.dimensions.width / 2, y: this.dimensions.height / 4}
//     this.ctx.font = "bold 50pt serif";
//     this.ctx.fillStyle = "white";
//     this.ctx.fillText(this.score, loc.x, loc.y);
//     this.ctx.strokeStyle = "black";
//     this.ctx.lineWidth = 2;
//     this.ctx.strokeText(this.score, loc.x, loc.y);
//   }
// }


// Game.FPS = 32;
// Game.NUM_ASTEROIDS = 10;

// Game.prototype.add = function add(object) {
//   if (object instanceof Asteroid) {
//     this.asteroids.push(object);
//   } else if (object instanceof Bullet) {
//     this.bullets.push(object);
//   } else if (object instanceof Ship) {
//     this.ships.push(object);
//   } else {
//     throw new Error("unknown type of object");
//   }
// };

// Game.prototype.addAsteroids = function addAsteroids() {
//   for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
//     this.add(new Asteroid({ game: this }));
//   }
// };

// Game.prototype.addShip = function addShip() {
//   const ship = new Ship({
//     pos: this.randomPosition(),
//     game: this
//   });

//   this.add(ship);

//   return ship;
// };

// Game.prototype.allObjects = function allObjects() {
//   return [].concat(this.ships, this.asteroids, this.bullets);
// };

// Game.prototype.checkCollisions = function checkCollisions() {
//   const allObjects = this.allObjects();
//   for (let i = 0; i < allObjects.length; i++) {
//     for (let j = 0; j < allObjects.length; j++) {
//       const obj1 = allObjects[i];
//       const obj2 = allObjects[j];

//       if (obj1.isCollidedWith(obj2)) {
//         const collision = obj1.collideWith(obj2);
//         if (collision) return;
//       }
//     }
//   }
// };

// Game.prototype.draw = function draw(ctx) {
//   ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
//   ctx.fillStyle = Game.BG_COLOR;
//   ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

//   this.allObjects().forEach(function(object) {
//     object.draw(ctx);
//   });
// };

// Game.prototype.isOutOfBounds = function isOutOfBounds(pos) {
//   return (pos[0] < 0) || (pos[1] < 0) ||
//     (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
// };

// Game.prototype.moveObjects = function moveObjects(delta) {
//   this.allObjects().forEach(function(object) {
//     object.move(delta);
//   });
// };

// Game.prototype.randomPosition = function randomPosition() {
//   return [
//     Game.DIM_X * Math.random(),
//     Game.DIM_Y * Math.random()
//   ];
// };

// Game.prototype.remove = function remove(object) {
//   if (object instanceof Bullet) {
//     this.bullets.splice(this.bullets.indexOf(object), 1);
//   } else if (object instanceof Asteroid) {
//     this.asteroids.splice(this.asteroids.indexOf(object), 1);
//   } else if (object instanceof Ship) {
//     this.ships.splice(this.ships.indexOf(object), 1);
//   } else {
//     throw new Error("unknown type of object");
//   }
// };

// Game.prototype.step = function step(delta) {
//   this.moveObjects(delta);
//   this.checkCollisions();
// };

// Game.prototype.wrap = function wrap(pos) {
//   return [
//     Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
//   ];
// };
