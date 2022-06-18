

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
                    // debugger
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
            }
            game.draw()
        })
    }
    
      
}

export default GameView

