var gameField = document.getElementById("game-field");
var ctxGameField = gameField.getContext("2d");
//var background = document.getElementById("game-background");
//var ctxBackground = background.getContext("2d");

var enemies = [],
    factoryInit = spaceImpactFactory(),
    player = factoryInit.getPlayer("Strahil", 10, 60),
    enemyOne,
    enemyTwo,
    enemyThree;

//var backgroundImg = new Image();
//backgroundImg.src = "images/space.png";

var shipImg = new Image();
shipImg.src = "images/ship.png";

var enemyImgOne = new Image();
enemyImgOne.src = "images/enemy1.gif";

var enemyImgTwo = new Image();
enemyImgTwo.src = "images/enemy2.gif";

var enemyImgThree = new Image();
enemyImgThree.src = "images/enemy3.png";

var bullet = new Image();
bullet.src = "images/bullet.png";

function gameInit() {

    //

}

//backgroundImg.onload = function () {
//    // create pattern
//    var ptrn = ctxBackground.createPattern(backgroundImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
//    ctxBackground.fillStyle = ptrn;
//    ctxBackground.fillRect(0, 0, 960, 640); // context.fillRect(x, y, width, height);
//}

function enemyType() {
    var typeofEnemy = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        randomPosition = Math.floor(Math.random() * (100 - 1 + 1)) + 1

    if (typeofEnemy === 1) {
        enemyOne = factoryInit.getEnemy(5, 2, 50, 250, randomPosition, typeofEnemy);
        moveEnemy(enemyOne, 20, 20, enemyImgOne);

        return enemyOne;

    } else if (typeofEnemy === 2) {
        enemyTwo = factoryInit.getEnemy(7, 3, 100, 250, randomPosition, typeofEnemy);
        drawShip(enemyImgTwo, enemyTwo.directionEnemyX, enemyTwo.directionEnemyY, 45, 40);
        return enemyTwo;

    } else {
        enemyThree = factoryInit.getEnemy(10, 1, 150, 250, randomPosition, typeofEnemy);
        drawShip(enemyImgThree, enemyThree.directionEnemyX, enemyThree.directionEnemyY, 50, 20);
        return enemyThree;
    }
}

function moveEnemy(enemy, sizeX, sizeY, image) {
    var step = 1;
        //end = enemy.directionEnemyX;
    function performEnemyMove() {
        if (enemy.directionEnemyX < 0) {
            window.cancelAnimationFrame(performEnemyMove);
        } else {
            ctxGameField.clearRect(enemy.directionEnemyX, enemy.directionEnemyY + 5, 22, 9);
            drawShip(image, enemy.directionEnemyX, enemy.directionEnemyY, sizeX, sizeY);
            enemy.directionEnemyX -= step;
            //for (var i = end; i >= 0; i--) {
            //    if ( i % 5 === 0){
            //        enemy.directionEnemyY += 5;
            //    } else {
            //        enemy.directionEnemyY -= 5;
            //    }
            //}
            window.requestAnimationFrame(performEnemyMove);

        }
    }
    performEnemyMove();
}

window.onload = function () {
    var enemy = enemyType();
    drawShip(shipImg, player.directionX, player.directionY, 50, 20);
    enemies.push(enemy);
}


executeCommand();

function executeCommand() {
    document.body.addEventListener('keydown', function (ev) {
        switch (ev.keyCode) {
            case 83:
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
                AttackHandler(projectile1);
                break;
        }
    });
}

function projectile(x, y) {
    this.x = x;
    this.y = y;
}

function drawShip(img, x, y, sizeX, sizeY) {
    ctxGameField.clearRect(x - 10, y - 10, sizeX + 20, sizeY + 20); // Ship moves with 10px position per step, magic numbers clear 10px around all sides of ship at every movement.
    ctxGameField.drawImage(img, x, y, sizeX, sizeY);
}

function AttackHandler(args) {
    var step = 1;

    function performAttack() {
        if (projectileHit(enemies, args) === true || args.x > gameField.width) {
            window.cancelAnimationFrame(performAttack);
        } else {
            ctxGameField.clearRect(args.x, args.y + 5, 22, 9);
            ctxGameField.drawImage(bullet, args.x + 2, args.y + 5, 20, 8);
            args.x += step;
            projectileHit(enemies, args);
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
    for (var i = 0; i < enemies.length; i += 1) {
        if (projectile.x == enemies[i].directionEnemyX - 20 && projectile.y == enemies[i].directionEnemyY) {
            ctxGameField.clearRect(enemies[i].directionEnemyX - 20, enemies[i].directionEnemyY - 5, 45, 30); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
            return true;
        }
        else {
            if (projectile.x >= enemies[i].directionEnemyX) // magic numbers set the range of shooting
            {
                if (projectile.y < enemies[i].directionEnemyY + 20 && projectile.y > enemies[i].directionEnemyY - 20) // magic numbers set the y range of shooting.
                {
                    ctxGameField.clearRect(enemies[i].directionEnemyX - 20, enemies[i].directionEnemyY - 5, 100, 50); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
                    return true;
                }
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
