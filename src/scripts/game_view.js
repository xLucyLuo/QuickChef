

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
        let that = this
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
                        that.evaluateCombo(actionCombo);
                        actionCombo = ""
                    }
                    break;
            }
            console.log(event.key)
            console.log(actionCombo)
            game.draw()
        })
    }

    evaluateCombo(actionCombo){
        switch (actionCombo) {
            case "wawa":
                this.game.addToQueue(0)
                break;
            case "asas":
                break;
            case "wdwd":
                // Up pressed
                break;
            case "dsds":
                // Down pressed
                break;
        }
    }

      
}

export default GameView

