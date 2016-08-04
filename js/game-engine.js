var gameField = document.getElementById("game-field");
var ctx = gameField.getContext("2d");
var shipImg = new Image();
shipImg.src = "images/ship.png";
var enemyImg = new Image();
enemyImg.src = "images/enemy.gif";
var bullet = new Image();
bullet.src = "images/bullet.png";

function gameInit() {

    //

}

var playerInit = spaceImpactFactory();
var playerStrahil = playerInit.getPlayer("Strahil", 50, 0);
console.log(playerStrahil);

var enemies = [];
var enemy1 = new enemy(200, 50);
enemies.push(enemy1);
window.onload = function() {
    drawShip(playerStrahil.directionX, playerStrahil.directionY, "player");
    drawShip(enemy1.x, enemy1.y, "enemy");
}
executeCommand();

function executeCommand() {
    document.body.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 83:
                moveShip(playerStrahil, "down");
                if (RestrictionShip(playerStrahil.directionX, playerStrahil.directionY)) {
                    playerStrahil.directionY = 120;
                    break;
                }
                drawShip(playerStrahil.directionX, playerStrahil.directionY, "player");
                break;
            case 87:
                moveShip(playerStrahil, "up");
                if (RestrictionShip(playerStrahil.directionX, playerStrahil.directionY)) {
                    playerStrahil.directionY = 0;
                    break;
                }
                drawShip(playerStrahil.directionX, playerStrahil.directionY, "player");
                break;
            case 65:
                moveShip(playerStrahil, "left");
                if (RestrictionShip(playerStrahil.directionX, playerStrahil.directionY)) {
                    playerStrahil.directionX = 0;
                    break;
                }
                drawShip(playerStrahil.directionX, playerStrahil.directionY, "player");
                break;
            case 68:
                moveShip(playerStrahil, "right");
                if (RestrictionShip(playerStrahil.directionX, playerStrahil.directionY)) {
                    playerStrahil.directionX = 250;
                    break;
                }
                drawShip(playerStrahil.directionX, playerStrahil.directionY, "player");
                break;
            case 13:
                var projectile1 = new projectile(playerStrahil.directionX + 50, playerStrahil.directionY); // magic number center the projectile around the ship.
                AttackHandler(projectile1);
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

function drawShip(x, y, type) {
    switch (type) {
        case "player":
            ctx.clearRect(x - 10, y - 10, 70, 40); // Ship moves with 10px position per step, magic numbers clear 10px around all sides of ship at every movement.
            ctx.drawImage(shipImg, x, y, 50, 20);
            break;
        case "enemy":
            ctx.clearRect(x - 10, y - 10, 40, 40);
            ctx.drawImage(enemyImg, x, y, 20, 20);
            break;
    }
}

function AttackHandler(args) {
    var steps = 0;
    var i = 1;

    function performAttack() {
        if (projectileHit(enemies,args) === true || args.x > gameField.width) {
            window.cancelAnimationFrame(performAttack);
        } else {
            ctx.clearRect(args.x, args.y + 5, 22, 9);
            ctx.drawImage(bullet, args.x + 2, args.y + 5, 20, 8);
            args.x += i;
            projectileHit(enemies,args);
            window.requestAnimationFrame(performAttack);
        }
    }
    performAttack();
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
    for (var i = 0; i < enemies.length; i+=1)
    {
        if (projectile.x >= enemies[i].x) // magic numbers set the range of shooting
        {
            if (projectile.y < enemies[i].y + 20 && projectile.y > enemies[i].y-20) // magic numbers set the y range of shooting.
            {  
                ctx.clearRect(enemies[i].x,enemies[i].y-5,25,30); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
                return true;
            }
        }
    }
    return false;
}

//For ship can't go outside on canvas.
function RestrictionShip(x, y) {
    if (x > gameField.width - 50 || x < 0) {
        return true;
    } else if (y > gameField.height - 20 || y < 0) {
        return true;
    } else {
        return false;
    }
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