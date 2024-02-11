let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"],
    lastButton: "",
    turnInProgress: false,
}

function newGame() {
    /*
    * Reset score to 0
    * Clear playerMove array
    * Clear currentGame array
    */
   game.score = 0;
   game.currentGame = [];
   game.playerMoves = [];
   for(let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true"){
            circle.addEventListener("click", (e) => {
                if(game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();                        
                }
            });
            circle.setAttribute("data-listener", "true");
        }
   }
    
   showScore();
   addTurn();
};


function addTurn() {
    /*
    * Clear playerMove array
    * Randomly add a button ID to the currentGame array
    * Call showTurns()
    */
    game.playerMoves = []; // clear playerMoves
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);  // generate random id from choices and pushes to currentGame array
    showTurns();
}


function showScore() {
    document.getElementById("score").innerText = game.score;
}


function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval( () => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if(game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 1000)
}


function playerTurn() {
    let i = game.playerMoves.length - 1;
    if(game.currentGame[i] === game.playerMoves[i]) {
        if(game.currentGame.length == game.playerMoves.length){
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

// EXPORT module to game.test.js must be at the END
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn};