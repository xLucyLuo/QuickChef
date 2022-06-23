import Utils from './utils.js'
import Chef from "./chef.js"
import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware"
import Station from './station.js'
import Recipe from './recipe.js'

const BG_IMG = "assets/images/bakery.png"
const DIM_X = 1200;
const DIM_Y = 700;
const MAX_QUEUE = 2;
//1sec in milliseconds
const TICK_INTERVAL = 50
//5min in milliseconds
const GAME_TIME_LIMIT = 300000//*.10
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
  1:"assets/images/key_1.png",
  2:"assets/images/key_2.png",
  3:"assets/images/key_3.png",
  4:"assets/images/key_4.png",
  5:"assets/images/key_5.png",
  6:"assets/images/key_6.png",
  "mixer":"assets/images/key_awds.png",
  "fryer":"assets/images/key_adad.png",
  "oven":"assets/images/key_wasd.png",
  "pan":"assets/images/key_swws.png"
}

class QuickChefGame {

  constructor(canvas, player1, player2, player3) {
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

    this.timeLeft = GAME_TIME_LIMIT
    this.gameTimer = setInterval(this.updateTimers.bind(this), TICK_INTERVAL);

      
    this.player1 = player1
    this.player2 = player2
    this.player3 = player3

    console.log(this.player3)

    //fade in miliseconds
    const fade = 5000
    // this.player1.fadeIn = fade/1000
    this.player1.fadeOut = fade/1000
    this.player2.fadeIn = fade/1000/2
    this.player2.fadeOut = fade/1000
    this.player3.fadeIn = fade/1000/2
    player3.fadeOut = fade/1000/2
    this.playerInterval = setInterval(()=>{
      // console.log(this.timeLeft)
      // console.log(`player 1 ${this.player1.state}`)
      // console.log(`player 2 ${this.player2.state}`)
      // console.log(`player 3 ${this.player3.state}`)
  
      if(this.timeLeft >= GAME_TIME_LIMIT*0.6 && this.player1.state === "stopped"){
        this.player1.start(0,0,GAME_TIME_LIMIT/1000*0.4+fade/1000)
      }else if (this.timeLeft >= GAME_TIME_LIMIT*0.2  && this.timeLeft<=GAME_TIME_LIMIT*0.6 && this.player2.state === "stopped"){
        // console.log(`chk: ${this.timeLeft/1000}`)
        this.player2.start(0,0,GAME_TIME_LIMIT/1000*0.4+fade/1000);    
      }else if (this.timeLeft <= GAME_TIME_LIMIT*0.2 && this.player3.state === "stopped"){
        this.player3.start(0,0.5,GAME_TIME_LIMIT/1000*0.2); 
      }
    }, 1000)

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
        let audio = new Audio("assets/audio/coin.wav");
        audio.play();
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
    this.resolveFall()
    this.resolveComboTimer()
    
    this.draw()
    if (this.timeLeft ===0){this.end()}
    this.timeLeft-=TICK_INTERVAL
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
          let audio = new Audio("assets/audio/pickup.mp3");
          audio.play();
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
    clearInterval(this.gameTimer)
    clearInterval(this.playerInterval)
    this.player1.stop()
    this.player2.stop()
    this.player3.stop()
 
    const startButton = document.getElementById("start-button")
    const popupBox = document.getElementById("popup-box")
    const endMsg = document.getElementById("endgame-message")
    const endScoreMsg = document.getElementById("end-score")

    popupBox.style.display = "flex"
    startButton.innerText = "PLAY AGAIN!"
    endMsg.style.display = "inline-block"
    endScoreMsg.innerText = `Money Earned: $${this.points.toLocaleString()}`
    
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
    this.ctx.fillRect(0, 0, LEFT_PANNEL_WIDTH, DIM_Y*.8-5);
    this.ctx.globalAlpha = 1

    //set dimensions for left pannel object size
    let boxWidth = LEFT_PANNEL_WIDTH/2-20
    let boxHeight = DIM_Y*0.1

    //render ingredient labels
    this.ctx.font = "25px Comic Sans MS";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "left";
    this.ctx.fillText("Ingredients", 5, 30);
    
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
    this.ctx.fillText("Kitchenwares", 5, boxHeight*3+110);
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
    this.ctx.fillRect(DIM_X - RIGHT_PANNEL_WIDTH, 0, RIGHT_PANNEL_WIDTH, DIM_Y*.8-5);
    this.ctx.globalAlpha = 1

    //draw timer
    let clockRadius = 50;
    this.ctx.fillStyle = "black";
    
    const timerImg = new Image()
    timerImg.src = "assets/images/timer.png";
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
    if (this.timeLeft<11000){
      this.ctx.fillStyle = "red";
    }
    if (this.timeLeft){
      this.ctx.fillText(Utils.convertMsToTime(this.timeLeft), DIM_X -clockRadius*1.25, clockRadius+35);
    }
    this.ctx.shadowBlur = 0;
    
    
    //draw points
    const coinImg = new Image()
    coinImg.src = "assets/images/coin.png";
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
    // this.ctx.fillStyle = "white";
    // this.ctx.strokeStyle = "yellow";
    // this.ctx.fillRect(this.chef.x+10+100*0, this.chef.y-30+110*0, 90, 25);
    // this.ctx.strokeRect(this.chef.x+10+100*0, this.chef.y-30+110*0, 90, 25);

    this.ctx.fillStyle = "black";
    this.ctx.font = "25px Comic Sans MS";
    this.ctx.fillText(`${this.currentCombo.combo}`,this.chef.x+20+100*0, this.chef.y-10+110*0);

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
