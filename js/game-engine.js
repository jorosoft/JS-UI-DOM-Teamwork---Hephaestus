
var gameField = document.getElementById("game-field");
var ctx = gameField.getContext("2d");

function gameInit() {

    //

}

var playerInit = spaceImpactFactory();
var playerStrahil = playerInit.getPlayer("Strahil", 50, 0);
console.log(playerStrahil);

var enemies = [];
var enemy1 = new enemy(200, 50);
enemies.push(enemy1);
drawShip(enemy1.x, enemy1.y);
drawScore(playerStrahil);
executeCommand();
function executeCommand() {
    document.body.addEventListener('keydown', function (ev) {
        switch (ev.keyCode) {
            case 83:
                moveShip(playerStrahil, "down");
                drawShip(playerStrahil.directionX, playerStrahil.directionY);
                break;
            case 87:
                moveShip(playerStrahil, "up");
                drawShip(playerStrahil.directionX, playerStrahil.directionY);
                break;
            case 65:
                moveShip(playerStrahil, "left");
                drawShip(playerStrahil.directionX, playerStrahil.directionY);
                break;
            case 68:
                moveShip(playerStrahil, "right");
                drawShip(playerStrahil.directionX, playerStrahil.directionY);
                break;
            case 13:
                var projectile1 = new projectile(playerStrahil.directionX + 50, playerStrahil.directionY); // magic number center the projectile around the ship.
                drawAttack(projectile1);
                projectileHit(enemies, projectile1);
                break;
        }
    });
}

function ship(x, y) {
    this.x = x;
    this.y = y;
}

function enemy(x, y) {
    this.x = x;
    this.y = y;
}

function projectile(x, y) {
    this.x = x;
    this.y = y;
}

function drawShip(x, y) {
    console.log(x, y);
    ctx.clearRect(x - 50, y - 50, 150, 150); // magic number clears the space around the ship.
    ctx.fillRect(x, y, 50, 50);
}

function drawAttack(args) {
    ctx.fillRect(args.x + 100, args.y + 10, 30, 30);
}

function drawScore(args) {
    //console.log(player1.score);
}

function moveShip(args, dir) {
    switch (dir) {
        case "left":
            args.directionX -= 10;
            break;
        case "right":
            args.directionX += 10;
            break;
        case "down":
            args.directionY += 10;
            break;
        case "up":
            args.directionY -= 10;
            break;
    }
}

function projectileHit(enemies, projectile) {
    enemies.forEach(function (element) {
        if (projectile.x < element.x + 125 && projectile.x > element.x - 125) // magic numbers set the range of shooting
        {
            if (projectile.y < element.y + 20 && projectile.y > element.y - 20) // magic numbers set the y range of shooting.
            {
                ctx.clearRect(element.x - 50, element.y - 50, 150, 150); // magic number clears the enemy;
            }
        }
    }, this);
}

function enemyType() {

}

//var gameField = new Kinetic.Stage(
//	{
//	    container: "game-field",
//	    width: 1000,
//	    height: 600
//	});
//
//var layer = new Kinetic.Layer();
//var player = new Kinetic.Circle({
//    x: 100,
//    y: 300,
//    radius: 10,
//    fill: "green",
//    stroke: "orange",
//    strokeWidth: 5,
//    draggable: true
//});
//
//var fireLayer;
//var bullet = new Kinetic.Circle({
//    x: 0,
//    y: 0,
//    radius: 3,
//    fill: "black"
//});
//
//layer.add(player);
//gameField.add(layer);
//
//function moveRight() {
//    var x = player.getX();
//    player.setX(x + 5);
//    layer.draw();
//}
//
//function moveLeft() {
//    var x = player.getX();
//    player.setX(x - 5);
//    layer.draw();
//}
//
//function moveUp() {
//    var y = player.getY();
//    player.setY(y - 5);
//    layer.draw();
//}
//
//function moveDown() {
//    var y = player.getY();
//    player.setY(y + 5);
//    layer.draw();
//}
//
//function playerBulletAnim() {
//    var bX = bullet.getX();
//    bX += 5;
//    if (bX > 1000) {
//        fireLayer.remove(bullet);
//        return;
//    }
//    bullet.setX(bX);
//    fireLayer.draw();
//    setTimeout(playerBulletAnim, 10);
//}
//
//function fire() {
//    bullet.setX(player.getX() + 10);
//    bullet.setY(player.getY());
//    fireLayer = new Kinetic.Layer();
//    fireLayer.add(bullet);
//    gameField.add(fireLayer);
//    playerBulletAnim();
//}
//
//document.addEventListener("keydown", function (ev) {
//    switch (ev.keyCode) {
//        case 37:
//            moveLeft();
//            break;
//        case 38:
//            moveUp();
//            break;
//        case 39:
//            moveRight();
//            break;
//        case 40:
//            moveDown();
//            break;
//        default:
//            break;
//    }
//}, false);
//document.addEventListener("keypress", function (ev) {
//    if (ev.keyCode === 102) {
//        fire();
//    }
//}, false);

//------------------------------------------------------

//var player1 = new player.init("pesho", 0, 0);

//gogo();

//function getCommands move, fire, etc

//function gogo() {
//    var ship1 = new Ship(1);
//    var ship2 = new Ship(2);
//    drawShip(ship1.type);
//    drawShip(ship2.type);
//
//    function Ship(type) {
//        this.type = type;
//    }
//    function drawShip(args) {
//        var images = [];
//        images[0] = new Image();
//        images[1] = new Image();
//        if (args == 1) {
//            ctx.fillStyle = "green";
//            ctx.fillRect(50, 50, 50, 40, 50);
//        }
//        if (args == 2) {
//            ctx.fillStyle = "purple";
//            ctx.fillRect(200, 50, 30, 50);
//        }
//    }
//}