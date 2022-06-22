import QuickChefGame from './scripts/quick_chef_game.js';
import GameView from './scripts/game_view.js';

document.addEventListener("DOMContentLoaded", function () {

  const canvas = document.getElementsByTagName("canvas")[0];
  // canvas.width = QuickChefGame.DIM_X;
  // canvas.height = QuickChefGame.DIM_Y;

  const ctx = canvas.getContext("2d");
  const quickChefGame = new QuickChefGame(canvas);
  const gameView = new GameView(quickChefGame, ctx)
//   new GameView(game, ctx).start();
});


