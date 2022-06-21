import Utils from './utils.js'
import Chef from "./chef.js"
import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware"
import Station from './station.js'
import Recipe from './recipe.js'

const BG_IMG = "../assets/images/bakery.png"
const DIM_X = 1200;
const DIM_Y = 700;
const MAX_QUEUE = 2;
//1sec in milliseconds
const TICK_INTERVAL = 50
//5min in milliseconds
const GAME_TIME_LIMIT = 300000
//1sec in milliseconds
const COMBO_TIMER = 1000

const MAX_RECIPES = 3
const MAX_ASSEMBLY = 4
const LEFT_PANNEL_WIDTH = DIM_X*0.19
const RIGHT_PANNEL_WIDTH = LEFT_PANNEL_WIDTH+10

const THEMES = {
  bakery:{
    ingredients: ["flour", "egg", "strawberry", "chocolate", "honey", "blueberry"],
    kitchenwares: ["mixer", "fryer", "oven", "pan"]
  }
}

const KEY_IMGS = {
  1:"../assets/images/key_1.png",
  2:"../assets/images/key_2.png",
  3:"../assets/images/key_3.png",
  4:"../assets/images/key_4.png",
  5:"../assets/images/key_5.png",
  6:"../assets/images/key_6.png",
  "mixer":"../assets/images/key_awds.png",
  "fryer":"../assets/images/key_adad.png",
  "oven":"../assets/images/key_wasd.png",
  "pan":"../assets/images/key_swws.png"
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
    
    this.keyImgs = {}
    let keyImg

    this.currentTheme = THEMES.bakery
    this.ingredients = []
    for (let i = 0; i< this.currentTheme.ingredients.length;i++){
      this.ingredients.push(new Ingredient(this.currentTheme.ingredients[i], this, 0, 0, 0, 0))
      keyImg = new Image()
      keyImg.src = KEY_IMGS[i+1]
      this.keyImgs[i+1]=keyImg
    }

    this.kitchenwares = []
    for (let i = 0; i< this.currentTheme.kitchenwares.length;i++){
      this.kitchenwares.push(new Kitchenware(this.currentTheme.kitchenwares[i], this, 0, 0, 0,0))
      keyImg = new Image()
      keyImg.src = KEY_IMGS[this.currentTheme.kitchenwares[i]]
      this.keyImgs[this.currentTheme.kitchenwares[i]]=keyImg
    }

    this.queues =[[],[],[],[],[]] 
    this.fallingObjs = [null,null,null,null,null]

    this.timeLeft = GAME_TIME_LIMIT

    this.currentCombo = {
      combo: "",
      timer: COMBO_TIMER
    }

    this.recipes = []
    for(let i = 0; i < MAX_RECIPES; i++){
      this.recipes.push(new Recipe(this, 950, 225+100*1.3*(i), 100, 100))
    }

    this.resetAssemblyStation()
    
    //need to update later
    this.servingStation = new Station(MAX_ASSEMBLY, this, DIM_X-RIGHT_PANNEL_WIDTH+5,DIM_Y*.8-5, RIGHT_PANNEL_WIDTH-8, DIM_Y*.20,"Serving Station","#949494")

    this.points = 0

    this.draw()
    setInterval(this.updateTimers.bind(this), TICK_INTERVAL);
  }

  matchRecipe(item){
    //if item match a recipe
    //update item image to match recipe
    //returns recipe index match
    for(let i =0; i< this.recipes.length; i++){
      let recipe = this.recipes[i]
      if (item.seq === recipe.seq){
        item.img = recipe.img
        // item.name = recipe.name
        item.heldItems = []
        return i
      }
    }
    return -1
  }

  serve(items){
    for(let i=0; i<items.length; i++){
      let recipeIdx = this.matchRecipe(items[i])
      if (recipeIdx !== -1){
        this.points+=this.recipes[recipeIdx].points
        this.recipes[recipeIdx] = new Recipe(this, 950, 225+100*1.3*(i), 100, 100)
      }
    }

    this.servingStation.removeAll()
  }

  resetAssemblyStation(){
    this.assemblyStation = new Station(MAX_ASSEMBLY, this, 3,DIM_Y*.8-5, LEFT_PANNEL_WIDTH-8, DIM_Y*.20, "Assembly Station", "#949494")
  }

  updateTimers(){
    this.timeLeft-=TICK_INTERVAL
    this.resolveFall()
    this.resolveComboTimer()

    this.draw()
    if (this.timeLeft ===0){this.end()}
  }

  resolveComboTimer(){
    //resolve timer
    if(this.currentCombo.combo.length < 1){return}
    let newTimeLeft = this.currentCombo.timer-TICK_INTERVAL
    if (newTimeLeft > 0){
      this.currentCombo.timer = newTimeLeft
    }else{
      this.currentCombo.combo = ""
      this.currentCombo.timer = COMBO_TIMER
    }
  }

  resolveFall(){
    for(let i=0; i<this.fallingObjs.length; i++){
      //queued items start falling if there is nothing falling in lane 
      if(!this.fallingObjs[i] && this.queues[i][0]){
        this.fallingObjs[i] = this.queues[i].shift()
        this.fallingObjs[i].fall(TICK_INTERVAL)
      }

      //remove falling objects once they hit bottom
      if(this.fallingObjs[i] && this.fallingObjs[i].y>DIM_Y){
        this.fallingObjs[i]=null;
      }

      //player catches the falling item if they touch the falling item 
      // and are not currently holding anything. Removes item from fall
      if(this.fallingObjs[i] 
        && !this.chef.heldItem 
        && Utils.isTouching(this.chef, this.fallingObjs[i])){
          this.chef.catch(this.fallingObjs[i])
          this.fallingObjs[i]=null;
      }
    }
  }

  addToQueue(obj){
    let minQueue=0;
    for(let i = 0; i < this.queues.length; i++){
      let laneLen = this.queues[i].length
      if (this.fallingObjs[i]){laneLen+=1}

      let minLen = this.queues[minQueue].length
      if (this.fallingObjs[minQueue]){minLen+=1}

      // debugger
      if(laneLen < minLen){
        minQueue = i
      }
    }

    this.queues[minQueue].push(obj)
    // debugger
    this.matchRecipe(obj)
    this.draw()
  }

  end(){
    //refactor for better message with stats etc.
    alert("Game Over!")
    //reset game....
  }  

  draw(){
    this.ctx.clearRect(0, 0, DIM_X, DIM_Y);
    
    //draw game canvas
    this.ctx.drawImage(this.img, 0, 0, DIM_X, DIM_Y+70);
    this.ctx.fillStyle = "#959595";
    this.ctx.fillRect(0, DIM_Y*.9, DIM_X, DIM_Y*.1);

    //draw left pannel
    this.ctx.globalAlpha = 0.7
    // this.ctx.fillStyle = "#aa7c60";
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, LEFT_PANNEL_WIDTH, DIM_Y);
    this.ctx.globalAlpha = 1

    //set dimensions for left pannel object size
    let boxWidth = LEFT_PANNEL_WIDTH/2-20
    let boxHeight = DIM_Y*0.1

    //render ingredient labels
    this.ctx.font = "25px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Ingredients", 5, 40);
    
    //ingredients x6
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = "#63452a"
    this.ctx.fillStyle = "white";
    
    for(let i = 0; i <2; i++){
      for(let j = 0; j <3; j++){
        this.ctx.globalAlpha = 0.7
        this.ctx.fillRect(i*(boxWidth*1.2)+3, j*(boxHeight+5)+55, boxWidth, boxHeight);
        this.ctx.strokeRect(i*(boxWidth*1.2)+3, j*(boxHeight+5)+55, boxWidth, boxHeight);
        this.ctx.globalAlpha = 1
        let idx = j*(2)+i
        if (this.ingredients[idx]){
          this.ingredients[idx].x = i*(boxWidth*1.2)+5
          this.ingredients[idx].y = j*(boxHeight+5)+55
          this.ingredients[idx].width = boxWidth*.7
          this.ingredients[idx].height = boxHeight
          this.ingredients[idx].draw();
        }
        
        
      }
    }

    //draw ingredient keys
    for(let i = 0; i <2; i++){
      for(let j = 0; j <3; j++){
        let idx = j*(2)+i
        this.ctx.drawImage(this.keyImgs[idx+1], (i+1)*(boxWidth*1.2)-33, j*(boxHeight+5)+55, boxWidth*.3, boxHeight*.4);
      }
    }

    //kitchenware x4
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Kitchenwares", 5, boxHeight*3+120);
    this.ctx.fillStyle = "white";
    
    for(let i = 0; i <2; i++){
      for(let j = 0; j <2; j++){
        this.ctx.globalAlpha = 0.7
        this.ctx.fillRect(i*(boxWidth*1.2)+3, (j+3)*(boxHeight+5)+120, boxWidth, boxHeight);
        this.ctx.strokeRect(i*(boxWidth*1.2)+3, (j+3)*(boxHeight+5)+120, boxWidth, boxHeight);
        this.ctx.globalAlpha = 1

        let idx = j*(2)+i
        if (this.kitchenwares[idx]){
          this.kitchenwares[idx].x = i*(boxWidth*1.2)+5
          this.kitchenwares[idx].y = (j+3)*(boxHeight+5)+120
          this.kitchenwares[idx].width = boxWidth*.8
          this.kitchenwares[idx].height = boxHeight
          this.kitchenwares[idx].draw();
        }
        
      }
    }

   //draw kitchenware keys
   for(let i = 0; i <2; i++){
    for(let j = 0; j <2; j++){
      let idx = j*(2)+i
      this.ctx.drawImage(this.keyImgs[this.kitchenwares[idx].name], (i+1)*(boxWidth*1.2)-33, (j+3)*(boxHeight+30)+30, boxWidth*.3, boxHeight*1.1);
    }
  }

    //assembly station
    this.assemblyStation.draw()

    boxWidth = this.dimensions.width*0.2
    boxHeight = boxHeight*0.8

    //draw right pannel
    this.ctx.globalAlpha = 0.7
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(DIM_X - RIGHT_PANNEL_WIDTH, 0, RIGHT_PANNEL_WIDTH, DIM_Y);
    this.ctx.globalAlpha = 1

    //draw timer
    let clockRadius = 50;
    this.ctx.fillStyle = "black";
    
    const timerImg = new Image()
    timerImg.src = "../assets/images/timer.png";
    this.ctx.drawImage(timerImg, DIM_X-clockRadius*2.5, 0, clockRadius*2.5, clockRadius*2.5);

    // this.ctx.beginPath();
    // this.ctx.arc(DIM_X-(clockRadius+5), clockRadius+5, clockRadius, 0, 2 * Math.PI, true);
    // this.ctx.fill();
    
    // this.ctx.fillStyle = "#207567";
    // // this.ctx.fillRect(boxWidth*4, 0, boxWidth, boxHeight);
    // this.ctx.beginPath();
    // this.ctx.arc(DIM_X-(clockRadius+5), clockRadius+5, clockRadius, (Math.PI*1.5), (Math.PI*2)*(1-this.timeLeft/GAME_TIME_LIMIT)+(Math.PI*1.5) , true)
    // this.ctx.lineTo(DIM_X-(clockRadius+5),clockRadius+5)
    // this.ctx.fill();
    // // this.ctx.stroke();
    
    this.ctx.textAlign = "center";
    this.ctx.font = "40px Comic Sans MS";
    // this.ctx.shadowBlur = 3;
    // this.ctx.shadowColor = "#000000";
    this.ctx.fillStyle = "black";
    if (this.timeLeft<10000){
      this.ctx.fillStyle = "red";
    }
    this.ctx.fillText(Utils.convertMsToTime(this.timeLeft), DIM_X -clockRadius*1.25, clockRadius+35);
    this.ctx.shadowBlur = 0;
    
    
    //draw points
    const coinImg = new Image()
    coinImg.src = "../assets/images/coin.png";
    this.ctx.drawImage(coinImg, DIM_X-clockRadius*5-8, 0, clockRadius*2.5, clockRadius*2.5);
    this.ctx.textAlign = "center";
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = "#3F1414";
    this.ctx.font = "40px Comic Sans MS";
    // this.ctx.fontWeight = "bolder";
    // this.ctx.shadowBlur = 3;
    // this.ctx.shadowColor = "#000000";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`$${this.points.toLocaleString()}`, DIM_X-clockRadius*4, clockRadius+30);
    this.ctx.shadowBlur = 0;
    // this.ctx.strokeText(`$${this.points.toLocaleString()}`, DIM_X-clockRadius*4, clockRadius+25);


    boxHeight = boxHeight/0.8*1.25
    //draw recipe pannels
    // this.ctx.fillStyle = "white";
    // this.ctx.fillRect(boxWidth*4,(boxHeight*1.3)+5, boxWidth, boxHeight/2);

    this.ctx.textAlign = "left";
    this.ctx.font = "25px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Orders",boxWidth*4+5,(boxHeight*1.3)+35);

    // this.ctx.fillStyle = "#5fb15f";
    this.ctx.fillStyle = "white";
    for (let i = 0; i < MAX_RECIPES; i++){
      this.ctx.globalAlpha = 0.7
      this.ctx.fillRect(boxWidth*4, (boxHeight*1.3)*(i+1)+55, boxWidth, boxHeight);
      this.ctx.globalAlpha = 1

      this.recipes[i].x = boxWidth*4-10
      this.recipes[i].y = (boxHeight*1.3)*(i+1)+55 -12
      this.recipes[i].draw()
    }


    //draw serving stable
    boxHeight = boxHeight/1.25
    // this.ctx.fillStyle = "#white";
    // this.ctx.fillRect( DIM_X-boxWidth-3,DIM_Y*.8-5, boxWidth, DIM_Y*.20);
    // this.ctx.textAlign = "left";
    // this.ctx.font = "25px Comic Sans MS";
    // this.ctx.fillStyle = "black";
    // this.ctx.fillText(`Serving Table`, boxWidth*4, DIM_Y-60);
    this.servingStation.draw()

    //draw player combo
    this.ctx.fillStyle = "black";
    this.ctx.font = "25px Comic Sans MS";
    this.ctx.fillText(`${this.currentCombo.combo}`,this.chef.x+20, this.chef.y-10);

    //draw ingredient queues
    boxWidth = DIM_X*0.06
    this.ctx.fillStyle = "#b3e5fc";
    for(let i = 0; i <this.queues.length; i++){
      for(let j = 0; j <MAX_QUEUE; j++){
        this.ctx.globalAlpha = 0.5
        this.ctx.fillRect(i*(boxWidth*1.7)+325, (1-j)*(boxHeight+5), boxWidth, boxHeight);
        this.ctx.globalAlpha = 1
        if (this.queues[i][j]){
          this.queues[i][j].x = i*(boxWidth*1.7)+340
          this.queues[i][j].y = (1-j)*(boxHeight)+15
          this.queues[i][j].width = boxWidth*0.8
          this.queues[i][j].height = boxHeight*0.8
          this.queues[i][j].draw();
        }
      }
    }
    //draw falling objects
    for(let i = 0; i <this.fallingObjs.length; i++){
      if (this.fallingObjs[i]){
        this.fallingObjs[i].draw()
      }
    }
       
    //draw player
    this.chef.draw()
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
//       .log(this.score);
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
