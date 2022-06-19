
import Chef from "./chef.js"
import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware"

const BG_IMG = "../assets/images/bakery.png"
const DIM_X = 1200;
const DIM_Y = 800;
const MAX_QUEUE = 2;

const THEMES = {
  bakery:{
    ingredients: ["flour", "egg", "strawberry"],
    kitchenwares: ["mixer", "fryer"]
  }
}

class QuickChefGame {
  constructor(canvas) {
    this.canvas = canvas
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.ctx = this.canvas.getContext("2d");
    this.chef = new Chef(this)
    //need to refactor
    this.img = new Image();
    this.img.src = BG_IMG;

    this.ingredients = []
    for (let i = 0; i< THEMES.bakery.ingredients.length;i++){
      this.ingredients.push(new Ingredient(THEMES.bakery.ingredients[i], this, 0, 0, 0, 0))
    }

    this.kitchenwares = []
    for (let i = 0; i< THEMES.bakery.kitchenwares.length;i++){
      this.kitchenwares.push(new Kitchenware(THEMES.bakery.kitchenwares[i], this, 0, 0, 0,0))
    }

    this.queues =[[],[],[],[]] 
    this.currQueue = 0

    this.draw()
  }

  addToQueue(ingredientNum, kitchenwareNum){
    this.queues[this.currQueue].push(new Ingredient(THEMES.bakery.ingredients[ingredientNum], this, 0, 0, 0, 0))
    this.currQueue = (this.currQueue + 1) % this.queues.length
    this.draw()
  }
  

  draw(){
    // debugger
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);

    
    this.ctx.drawImage(this.img, 0, 0, DIM_X, DIM_Y);
    this.ctx.fillStyle = "#959595";
    this.ctx.fillRect(0, DIM_Y*.85, DIM_X, DIM_Y*.15);
   

    this.chef.draw()
    //draw ingredients pannels
    this.ctx.fillStyle = "#aa7c60";
    this.ctx.fillRect(0, 0, this.dimensions.width*0.18, DIM_Y);

    let boxWidth = this.dimensions.width*0.08
    let boxHeight = 100
    
    this.ctx.font = "25px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Ingredients", 5, 60);
    
    //ingredients x4
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = "#63452a"
    this.ctx.fillStyle = "#ecd4b4";
    for(let i = 0; i <2; i++){
      for(let j = 0; j <2; j++){
        let idx = i*(2)+j
        if (this.ingredients[idx]){
          this.ingredients[idx].x = i*(boxWidth+3)+3
          this.ingredients[idx].y = j*(boxHeight+5)+75
          this.ingredients[idx].width = boxWidth
          this.ingredients[idx].height = boxHeight
          this.ingredients[idx].draw();
        }else{
          this.ctx.fillRect(i*(boxWidth+3)+3, j*(boxHeight+5)+75, boxWidth, boxHeight);
        }
        this.ctx.strokeRect(i*(boxWidth+3)+3, j*(boxHeight+5)+75, boxWidth, boxHeight);
        
      }
    }

    //kitchenware x4
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Cooking Action", 5, 350);
    this.ctx.fillStyle = "#ecd4b4";

    for(let i = 0; i <2; i++){
      for(let j = 0; j <2; j++){
        let idx = i*(2)+j
        if (this.kitchenwares[idx]){
          this.kitchenwares[idx].x = i*(boxWidth+3)+3
          this.kitchenwares[idx].y = (j+2)*(boxHeight+5)+150
          this.kitchenwares[idx].width = boxWidth
          this.kitchenwares[idx].height = boxHeight
          this.kitchenwares[idx].draw();
        }else{
          this.ctx.fillRect(i*(boxWidth+3)+3, (j+2)*(boxHeight+5)+150, boxWidth, boxHeight);
        }
        this.ctx.strokeRect(i*(boxWidth+3)+3, (j+2)*(boxHeight+5)+150, boxWidth, boxHeight);
        
      }
    }
    //assembly station
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Assembly Station", 5, 630);
    this.ctx.fillStyle = "#ecd4b4";
    this.ctx.fillRect(6, boxHeight*4+240, (boxWidth-2)*2, boxHeight*1.5)
    this.ctx.strokeRect(6, boxHeight*4+240, (boxWidth-2)*2, boxHeight*1.5)

    boxWidth = this.dimensions.width*0.2
    boxHeight = boxHeight*0.8
    //draw timer
    this.ctx.fillStyle = "#fef4d2";
    this.ctx.fillRect(boxWidth*4, 0, boxWidth, boxHeight);
    this.ctx.textAlign = "right";
    this.ctx.font = "50px Comic Sans MS";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("5:00", 1180, 60);
    
    //draw points
    this.ctx.fillStyle = "#fdc407";
    this.ctx.fillRect(boxWidth*4, boxHeight+2, boxWidth, boxHeight);
    this.ctx.font = "50px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("$1,000", 1180, 140);

    boxHeight = boxHeight/0.8*1.25
    //draw recipe pannels
    this.ctx.fillStyle = "#a5d6a7";
    this.ctx.fillRect(boxWidth*4, (boxHeight+2)*2+10, boxWidth, boxHeight);
    this.ctx.fillRect(boxWidth*4, (boxHeight+2)*3+10, boxWidth, boxHeight);
    this.ctx.fillRect(boxWidth*4, (boxHeight+2)*4+10, boxWidth, boxHeight);
    this.ctx.fillRect(boxWidth*4, (boxHeight+2)*5+10, boxWidth, boxHeight);

    //draw ingredient queues
    boxWidth = this.dimensions.width*0.12
    boxHeight = boxHeight*0.5
    this.ctx.fillStyle = "#b3e5fc";
    for(let i = 0; i <4; i++){
      for(let j = 0; j <2; j++){
        if (this.queues[i][j]){
          this.queues[i][j].x = i*(boxWidth+1)+300
          this.queues[i][j].y = (j)*(boxHeight+5)
          this.queues[i][j].width = boxWidth
          this.queues[i][j].height = boxHeight
          this.queues[i][j].draw();
        }else{
          this.ctx.fillRect(i*(boxWidth+1)+300, (j)*(boxHeight+5), boxWidth, boxHeight);
        }
      }
    }
  }

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
