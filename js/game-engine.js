var gameField = document.getElementById("game-field");
var ctx = gameField.getContext("2d");

var enemies = [],
    factoryInit = spaceImpactFactory(),
    player = factoryInit.getPlayer("Strahil", 10, 60),
    enemyOne,
    enemyTwo,
    enemyThree;

var shipImg = new Image();
shipImg.src = "images/ship.png";
<<<<<<< HEAD

var enemyImgOne = new Image();
enemyImgOne.src = "images/enemy1.gif";

var enemyImgTwo = new Image();
enemyImgTwo.src = "images/enemy2.gif";

var enemyImgThree = new Image();
enemyImgThree.src = "images/enemy3.png";

=======
var enemyImg = new Image();
enemyImg.src = "images/enemy.gif";
>>>>>>> origin/master
var bullet = new Image();
bullet.src = "images/bullet.png";

function gameInit() {

    //

}

function enemyType() {
    var typeofEnemy = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        randomPosition = Math.floor(Math.random() * (100 - 1 + 1)) + 1

    if (typeofEnemy === 1) {
        enemyOne = factoryInit.getEnemy(5, 2, 50, 250, randomPosition, typeofEnemy);
        drawShip(enemyImgOne, enemyOne.directionEnemyX, enemyOne.directionEnemyY, 50, 20);
        return enemyOne;

    } else if (typeofEnemy === 2) {
        enemyTwo = factoryInit.getEnemy(7, 3, 100, 250, randomPosition, typeofEnemy);
        console.log(2);
        drawShip(enemyImgTwo, enemyTwo.directionEnemyX, enemyTwo.directionEnemyY, 35, 30);
        return enemyTwo;

    } else {
        enemyThree = factoryInit.getEnemy(10, 1, 150, 250, randomPosition, typeofEnemy);
        drawShip(enemyImgThree, enemyThree.directionEnemyX, enemyThree.directionEnemyY, 50, 20);
        return enemyThree;
    }
}

window.onload = function () {
    var enemy = enemyType();
    drawShip(shipImg, player.directionX, player.directionY, 50, 20);
    enemies.push(enemy);
}


<<<<<<< HEAD
=======
var enemies = [];
var enemy1 = new enemy(200, 50);
enemies.push(enemy1);
window.onload = function() {
    drawShip(playerStrahil.directionX, playerStrahil.directionY, "player");
    drawShip(enemy1.x, enemy1.y, "enemy");
}
>>>>>>> origin/master
executeCommand();

function executeCommand() {
    document.body.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 83:
<<<<<<< HEAD
                moveShip(player, "down");
                if (RestrictionShip(player.directionX, player.directionY)) {
                    player.directionY = 120;
                    break;
                }
                drawShip(shipImg, player.directionX, player.directionY, 50, 20);
                break;
            case 87:
                moveShip(player, "up");
                if (RestrictionShip(player.directionX, player.directionY)) {
                    player.directionY = 0;
                    break;
                }
                drawShip(shipImg, player.directionX, player.directionY, 50, 20);
                break;
            case 65:
                moveShip(player, "left");
                if (RestrictionShip(player.directionX, player.directionY)) {
                    player.directionX = 0;
                    break;
                }
                drawShip(shipImg, player.directionX, player.directionY, 50, 20);
                break;
            case 68:
                moveShip(player, "right");
                if (RestrictionShip(player.directionX, player.directionY)) {
                    player.directionX = 250;
                    break;
                }
                drawShip(shipImg, player.directionX, player.directionY, 50, 20);
                break;
            case 13:
                var projectile1 = new projectile(player.directionX + 50, player.directionY); // magic number center the projectile around the ship.
=======
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
>>>>>>> origin/master
                AttackHandler(projectile1);
                break;
        }
    });
}

function projectile(x, y) {
    this.x = x;
    this.y = y;
}

<<<<<<< HEAD
function drawShip(img, x, y, sizeX, sizeY) {
    ctx.clearRect(x - 10, y - 10, sizeX + 20, sizeY + 20); // Ship moves with 10px position per step, magic numbers clear 10px around all sides of ship at every movement.
    ctx.drawImage(img, x, y, sizeX, sizeY);
=======
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
>>>>>>> origin/master
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
    console.log(player1.score);
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
<<<<<<< HEAD
        if (projectile.x == enemies[i].directionEnemyX- 20 && projectile.y == enemies[i].directionEnemyY) {
            ctx.clearRect(enemies[i].directionEnemyX - 20, enemies[i].directionEnemyY - 5, 45, 30); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
            return true;
        }
        else {
            if (projectile.x >= enemies[i].directionEnemyX) // magic numbers set the range of shooting
            {
                if (projectile.y < enemies[i].directionEnemyY + 20 && projectile.y > enemies[i].directionEnemyY - 20) // magic numbers set the y range of shooting.
                {
                    ctx.clearRect(enemies[i].directionEnemyX - 20, enemies[i].directionEnemyY - 5, 100, 50); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
                    return true;
                }
=======
        if (projectile.x >= enemies[i].x) // magic numbers set the range of shooting
        {
            if (projectile.y < enemies[i].y + 20 && projectile.y > enemies[i].y-20) // magic numbers set the y range of shooting.
            {  
                ctx.clearRect(enemies[i].x,enemies[i].y-5,25,30); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
                return true;
>>>>>>> origin/master
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
