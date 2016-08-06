var scoreBoard,
    score,
    progressRatio;

function drawScoreBoard(playerName, playerScore, playerLife) {
    if (scoreBoard) {
        score.textContent = playerScore;
        if (playerLife > 60) {
            progressRatio.setAttribute("width", playerLife * 2 - 2);
            progressRatio.setAttribute("fill", "green");
        } else if (playerLife >= 30 && playerLife <= 60) {
            progressRatio.setAttribute("width", playerLife * 2);
            progressRatio.setAttribute("fill", "yellow");
        } else if (playerLife > 0 && playerLife < 30) {
            progressRatio.setAttribute("width", playerLife * 2);
            progressRatio.setAttribute("fill", "red");
        } else {
            progressRatio.setAttribute("width", "0");
        }
        return;
    }
    scoreBoard = document.getElementById("scoreBoard");
    var playerLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    playerLabel.setAttribute("x", "50");
    playerLabel.setAttribute("y", "33");
    playerLabel.setAttribute("fill", "#070");
    playerLabel.textContent = "player:";

    var scoreLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    scoreLabel.setAttribute("x", "330");
    scoreLabel.setAttribute("y", "33");
    scoreLabel.setAttribute("fill", "#070");
    scoreLabel.textContent = "score:";

    var lifeLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    lifeLabel.setAttribute("x", "586");
    lifeLabel.setAttribute("y", "33");
    lifeLabel.setAttribute("fill", "#070");
    lifeLabel.textContent = "life:";

    var name = document.createElementNS("http://www.w3.org/2000/svg", "text");
    name.setAttribute("x", "136");
    name.setAttribute("y", "33");
    name.setAttribute("fill", "#A70");
    name.textContent = playerName;

    score = document.createElementNS("http://www.w3.org/2000/svg", "text");
    score.setAttribute("x", "400");
    score.setAttribute("y", "33");
    score.setAttribute("fill", "#A70");
    score.textContent = playerScore;

    var progress = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    progress.setAttribute("x", "640");
    progress.setAttribute("y", "17");
    progress.setAttribute("width", "200");
    progress.setAttribute("height", "18");
    progress.setAttribute("rx", "4");
    progress.setAttribute("ry", "4");
    progress.setAttribute("stroke", "darkgray");
    progress.setAttribute("stroke-width", "2px");
    progress.setAttribute("fill", "none");


    progressRatio = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    progressRatio.setAttribute("x", "641");
    progressRatio.setAttribute("y", "18");
    progressRatio.setAttribute("height", "16");
    progressRatio.setAttribute("rx", "4");
    progressRatio.setAttribute("ry", "4");
    progressRatio.setAttribute("width", playerLife * 2 - 2);
    progressRatio.setAttribute("fill", "green");

    scoreBoard.appendChild(playerLabel);
    scoreBoard.appendChild(scoreLabel);
    scoreBoard.appendChild(lifeLabel);
    scoreBoard.appendChild(name);
    scoreBoard.appendChild(score);
    scoreBoard.appendChild(progress);
    scoreBoard.appendChild(progressRatio);
}

function drawLeggendBoard() {
    var leggendBoard = document.getElementById("legendBoard");
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "200");
    text.setAttribute("y", "20");
    text.setAttribute("fill", "brown");
    text.textContent = "CONTROLS: ";
    text.textContent += " left: <A> ";
    text.textContent += " right: <D> ";
    text.textContent += " up: <W> ";
    text.textContent += " down: <S> ";
    text.textContent += " fire: <ENTER>";
    leggendBoard.appendChild(text);
}

function playChangeScoreSound() {
    var sound = new Audio('sound/change-score.mp3');
    sound.play();
}

drawScoreBoard(player.name, player.score, player.life);
drawLeggendBoard();