import QuickChefGame from './scripts/quick_chef_game.js';
import GameView from './scripts/game_view.js';
import * as Tone from 'tone';

document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.getElementsByTagName("canvas")[0];
  // canvas.width = QuickChefGame.DIM_X;
  // canvas.height = QuickChefGame.DIM_Y;

  const ctx = canvas.getContext("2d");

  //start button initialize game
  const startButton = document.getElementById("start-button")
  const popupBox = document.getElementById("popup-box")
  const instructionsEl = document.getElementById("game-instruction")
  const descriptionEl = document.getElementById("game-description")
  startButton.addEventListener("click", function(){
    // debugger
    popupBox.style.display = "none"
    instructionsEl.style.display = "none"
    descriptionEl.style.display = "none"
  
    
    const player1 = new Tone.Player("https://xlucyluo.github.io/QuickChef/assets/audio/countdown1.mp3").toDestination()
    const player2 = new Tone.Player("https://xlucyluo.github.io/QuickChef/assets/audio/countdown2.mp3").toDestination()
    const player3 = new Tone.Player("https://xlucyluo.github.io/QuickChef/assets/audio/countdown3.mp3").toDestination()
    
    if (!Tone.start()){
      Tone.start()
    }
    
    const quickChefGame = new QuickChefGame(canvas, player1, player2, player3);
    const gameView = new GameView(quickChefGame, ctx);
    
    const soundToggleImg = document.querySelector("#sound-toggle img")
    soundToggleImg.value = "unmuted"
    const soundTogglePara = document.querySelector("#sound-toggle p")
    soundToggleImg.addEventListener("click", () => {

      if(soundToggleImg.value === "unmuted"){
        soundToggleImg.value="muted" 
        soundToggleImg.src="assets/images/muted.png" 
        soundTogglePara.innerText="Unmute"
        player1.mute = true
        player2.mute = true
        player3.mute = true

      }else{
        soundToggleImg.value="unmuted" 
        soundToggleImg.src="assets/images/unmuted.png" 
        soundTogglePara.innerText = "Mute"
        player1.mute = false
        player2.mute = false
        player3.mute = false

      }
    })
  })
  

});  


