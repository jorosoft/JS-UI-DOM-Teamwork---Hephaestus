var startButton = document.getElementById("start-button");
var gameField = document.getElementById("game-field");
var topPlayers = document.getElementById("high-score");
var backButton = document.getElementById("back-button");
var HighScoreButton = document.getElementById("high-score-button");

function showCanvas() {
    gameField.style.display = "block";
    //gogo();
    gameInit();
}

function showHighScore() {
    topPlayers.style.display = "block";
    backButton.style.display = "block";
}

function hideHighScore() {
    topPlayers.style.display = "none";
    backButton.style.display = "none";
}

HighScoreButton.addEventListener("click", showHighScore, false);
startButton.addEventListener("click", showCanvas, false);
backButton.addEventListener("click", hideHighScore, false);