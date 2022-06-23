import QuickChefGame from './quick_chef_game.js';
import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware"
import Utils from './utils.js';
import AssemblyStation from './station.js'

const INGREDIENT_COMBOS = {
    // "wawa": 0,
    // "wdwd": 1,
    // "awas": 2,
    // "dwds": 3,
    // "sasa": 4,
    // "sdsd": 5
  }
  
  const KITCHENWARE_COMBOS = {
    "awds": "mixer",
    "adad": "fryer",
    "wasd": "oven",
    "swws": "pan",
    "wsws": "knife",
    "adww": "pot",
    "dwas": "blender"
  
  }

class GameView{
    constructor(game, ctx){
        this.ctx = ctx;
        this.game = game;
        // debugger
        this.bindKeyHandlers()
    }

    
    bindKeyHandlers() {
        const game = this.game;

        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case ' ':
                    game.chef.jump()
                    // setTimeout(game.chef.jump(),1000)
                    break;
                case "ArrowLeft":
                    game.chef.moveLeft()
                    break;
                case "ArrowRight":
                    game.chef.moveRight()
                    break;
                case "ArrowDown":
                    let item = game.chef.throw();
                    
                    if (item){
                        let audio = new Audio("assets/audio/drop.wav");
                        audio.play();
                    }

                    if(item && Utils.isTouching(game.assemblyStation, game.chef)){
                        if (item.name === "plate"){
                            game.assemblyStation.addItems(item.heldItems)
                        }else{
                            game.assemblyStation.addItems([item])
                        }
                    }

                    if(item && Utils.isTouching(game.servingStation, game.chef)){
                        if (item.name === "plate"){
                            game.serve(item.heldItems)
                        }else{
                            game.serve([item])
                        }
                    }
                    break;
                case "ArrowUp":
                    //pickup assembly station
                    if(game.assemblyStation.heldItems.length>0 
                        && Utils.isTouching(game.assemblyStation, game.chef) 
                        && !game.chef.heldItem){
                            let assembledItems = game.assemblyStation.removeAll()
                            const plate = new Kitchenware("plate",game,0,0,game.chef.width*.8,game.chef.height*.3)
                            plate.addItems(assembledItems)
                            game.chef.catch(plate)
                            game.resetAssemblyStation()
                    }
                    break;
                case "1": case "2": case "3": case "4": case "5": case "6":
                    let ingredientName = game.currentTheme.ingredients[parseInt(event.key)-1]
                    game.addToQueue(new Ingredient(ingredientName, game, 0, 0, 0, 0))
                    break;
                case "a": case "w": case "s": case "d":
                    if (event.repeat) { return }
                    game.currentCombo.combo+=event.key

                    //resolve combo
                    if (game.currentCombo.combo.length >4){
                        game.currentCombo.combo = game.currentCombo.combo[4]
                    }
                    if (game.currentCombo.combo.length === 4){
                        let obj;
                
                        // //check if is an ingredient Combo
                        // if (game.currentCombo.combo in INGREDIENT_COMBOS){
                        // let ingredientIdx = INGREDIENT_COMBOS[game.currentCombo.combo]
                        // let ingredientName = game.currentTheme.ingredients[ingredientIdx]
                        // obj = new Ingredient(ingredientName, game, 0, 0, 0, 0)
                        // }
                
                        //check if is a kitchenware combo *require player to be holding something
                        if (game.chef.heldItem
                        && game.currentCombo.combo in KITCHENWARE_COMBOS 
                        && game.currentTheme.kitchenwares.includes(KITCHENWARE_COMBOS[game.currentCombo.combo])){
                            let audio = new Audio("assets/audio/cook.mp3");
                            audio.volume = 1;
                            audio.play();
                            let kitchenwareName = KITCHENWARE_COMBOS[game.currentCombo.combo]
                            let item = game.chef.throw()
                            obj = new Kitchenware(kitchenwareName, game, 0, 0, 0, 0)
                            if (item.name === "plate"){
                                obj.addItems(item.heldItems)
                            }else{
                                obj.addItems([item])
                            }
                        }
                        if (obj){game.addToQueue(obj)};
                    }
                    break;
            }
        }),
        
        document.addEventListener("click", () => {
            const button = document.querySelector("#restart-button");
            const bars = document.querySelectorAll(".round-time-bar");
            bars.forEach((bar) => {
                bar.classList.remove("round-time-bar");
                bar.offsetWidth;
                bar.classList.add("round-time-bar");
            })
        })



    }
}

export default GameView

