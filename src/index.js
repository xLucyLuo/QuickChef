import QuickChefGame from './scripts/quick_chef_game.js';
import GameView from './scripts/game_view.js';
import * as Tone from 'tone';

document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.getElementsByTagName("canvas")[0];

  const ctx = canvas.getContext("2d");

  //start button initialize game
  const startButton = document.getElementById("start-button")
  const popupBox = document.getElementById("popup-box")
  const instructionsEl = document.getElementById("game-instruction")
  const descriptionEl = document.getElementById("game-description")
  const gameControls = document.getElementById("game-controls")

  startButton.addEventListener("click", function(){
    popupBox.style.display = "none"
    instructionsEl.style.display = "none"
    descriptionEl.style.display = "none"
    debugger
    gameControls.style.display = "flex"
    
    const player1 = new Tone.Player("https://xlucyluo.github.io/QuickChef/assets/audio/countdown1.mp3").toDestination()
    const player2 = new Tone.Player("https://xlucyluo.github.io/QuickChef/assets/audio/countdown2.mp3").toDestination()
    const player3 = new Tone.Player("https://xlucyluo.github.io/QuickChef/assets/audio/countdown3.mp3").toDestination()

    if (!Tone.start()){
      Tone.start()
    }

    player1.volume.value = 0
    player2.volume.value = 0
    player3.volume.value = 0
    
    const quickChefGame = new QuickChefGame(canvas, player1, player2, player3);
    const gameView = new GameView(quickChefGame, ctx);
  })
});  


