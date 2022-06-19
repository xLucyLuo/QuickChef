const ACTION_COMBOS = {
    "wawa": 0,
    "asas": 1,
    "wdwd": 2,
    "sdsd": 3
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
        let actionCombo = ""
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case "ArrowLeft":
                    game.chef.moveLeft()
                    break;
                case "ArrowRight":
                    game.chef.moveRight()
                    break;
                case "ArrowUp":
                    // Up pressed
                    break;
                case "ArrowDown":
                    // Down pressed
                    break;
                case "a": case "w": case "s": case "d":
                    if (event.repeat) { return }
                    actionCombo+=event.key
                    if (actionCombo.length === 4){
                        game.addToQueue(ACTION_COMBOS[actionCombo]);
                        console.log(event.key)
                        console.log(actionCombo)
                        actionCombo = ""
                    }
                    break;
            }
        
            game.draw()
        })
    }
}

export default GameView

