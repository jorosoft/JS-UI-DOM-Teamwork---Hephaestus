var $startButton = $("#start-button"),
    $gameField = $("#game-field"),
    $topPlayers = $("#high-score"),
    $backButton = $("#back-button"),
    $HighScoreButton = $("#high-score-button");

function startGame() {
    $gameField.css("display", "block");
    gameInit();
}

function showHighScore() {
    $topPlayers.css("display", "block");
    $backButton.css("display", "inline-block");
}

function hideHighScore() {
    $topPlayers.css("display", "none");
    $backButton.css("display", "none");
}

$HighScoreButton.on("click", showHighScore);
$startButton.on("click", startGame);
$backButton.on("click", hideHighScore);