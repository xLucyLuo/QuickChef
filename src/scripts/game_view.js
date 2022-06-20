import QuickChefGame from './quick_chef_game.js';
import Ingredient from "./ingredient.js"
import Kitchenware from "./kitchenware"
import Utils from './utils.js';
import AssemblyStation from './assembly_station.js'

const INGREDIENT_COMBOS = {
    "wawa": 0,
    "wdwd": 1,
    "awas": 2,
    "dwds": 3,
    "sasa": 4,
    "sdsd": 5
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
                case "ArrowLeft":
                    game.chef.moveLeft()
                    break;
                case "ArrowRight":
                    game.chef.moveRight()
                    break;
                case "ArrowDown":
                    let item = game.chef.throw();
                    if(item && Utils.is_touching(game.assemblyStation, game.chef)){
                        if (item.name === "plate"){
                            game.assemblyStation.addItems(item.heldItems)
                        }else{
                            game.assemblyStation.addItem(item)
                        }
                    }
                    break;
                case "ArrowUp":
                    //pickup assembly station
                    if(game.assemblyStation.items.length>0 
                        && Utils.is_touching(game.assemblyStation, game.chef) 
                        && !game.chef.itemHeld){
                            let assembledItems = game.assemblyStation.removeAll()
                            const plate = new Kitchenware("plate",game,0,0,game.chef.width*.8,game.chef.height*.3)
                            plate.add(assembledItems)
                            game.chef.catch(plate)
                            game.resetAssemblyStation()
                    }
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
                
                        //check if is an ingredient Combo
                        if (game.currentCombo.combo in INGREDIENT_COMBOS){
                        let ingredientIdx = INGREDIENT_COMBOS[game.currentCombo.combo]
                        let ingredientName = game.currentTheme.ingredients[ingredientIdx]
                        obj = new Ingredient(ingredientName, game, 0, 0, 0, 0)
                        }
                
                        //check if is a kitchenware combo *require player to be holding something
                        if (game.chef.itemHeld
                        && game.currentCombo.combo in KITCHENWARE_COMBOS 
                        && game.currentTheme.kitchenwares.includes(KITCHENWARE_COMBOS[game.currentCombo.combo])){
                            let kitchenwareName = KITCHENWARE_COMBOS[game.currentCombo.combo]
                            let item = game.chef.throw()
                            obj = new Kitchenware(kitchenwareName, game, 0, 0, 0, 0)
                            if (item.name === "plate"){
                                obj.add(item.heldItems)
                            }else{
                                obj.add([item])
                            }
                        }
                        if (obj){game.addToQueue(obj)};
                    }
                    break;
            }
        })
    }
}

export default GameView

