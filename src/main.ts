import Game from "./Game";


// let game : Game = new (<any>require("./Game.ts")).default();

// if (module.hot) {
//     console.log("module is hot");
//     module.hot.accept(["./Game.ts"], function () {
//         console.log("module: accept game");
//         game = new (<any>require("./Game.ts")).default();
//         restartGame();
//     });
// } else {
//     console.log("module is not hot. Can't reload the module");
// }

// function restartGame(){
//     game.Start(document.getElementById("game-screen"));
// }
// document.addEventListener("DOMContentLoaded", () => { restartGame(); });
// window.onload = () =>
// {
//     let game = new Game(document.getElementById("game-screen"));
//     game.createScene();
//     game.Animate();
// }


document.addEventListener("DOMContentLoaded", () => { new Game(document.getElementById("game-screen")).Start(); });