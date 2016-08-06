var gameField = document.getElementById("game-field");
var ctxGameField = gameField.getContext("2d");
//var background = document.getElementById("game-background");
//var ctxBackground = background.getContext("2d");

var enemies = [],
    projectiles = [],
    players = [],
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

var explosion = new Image();
explosion.src = "images/explosion.jpg";


if (!Array.prototype.remove) {
    Array.prototype.remove = function(val, all) {
        var i, removedItems = [];
        if (all) {
            for (i = this.length; i -= 1;) {
                if (this[i] === val) removedItems.push(this.splice(i, 1));
            }
        } else { //same as before...
            i = this.indexOf(val);
            if (i > -1) removedItems = this.splice(i, 1);
        }
        return removedItems;
    };
}


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
        enemyOne.enemyType = 1;
        return enemyOne;

    } else if (typeofEnemy === 2) {
        enemyTwo = factoryInit.getEnemy(7, 3, 100, 250, randomPosition, typeofEnemy);
        moveEnemy(enemyTwo, 45, 40, enemyImgTwo);
        enemyTwo.enemyType = 2;
        return enemyTwo;

    } else {
        enemyThree = factoryInit.getEnemy(10, 1, 150, 250, randomPosition, typeofEnemy);
        moveEnemy(enemyThree, 50, 20, enemyImgThree);
        enemyThree.enemyType = 3;
        return enemyThree;
    }
}

function moveEnemy(enemy, sizeX, sizeY, image) {
    var step = 1,
        count = 0,
        index = 1,
        attackRatio = 0,
        slow;

    function performEnemyMove() {
        if (enemy.life <= 0 || enemy.positionX < -100) {
            window.cancelAnimationFrame(performEnemyMove);
        } else {
            switch (enemy.enemyType) {
                case 1:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 22, 9);
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);
                    enemy.positionX -= step;
                    speed = 0;
                    if (attackRatio  % 50 === 0) {
                        var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY);
                        enemyAttackHandler(newProjectile);
                    }
                    attackRatio+=1;
                    break;
                case 2:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 22, 9);
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);
                    enemy.positionX -= step;
                    enemy.positionY += count;
                    count += index;
                    if (count === 10 || count === -10) {
                        count = 0;
                        index *= -1;
                    }
                    speed = 100;
                    break;
                case 3:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 22, 9);
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);
                    enemy.positionX -= step;
                    speed = 100
                    break;
                default:
                    break;
            }

            setTimeout(function() {
                window.requestAnimationFrame(performEnemyMove);
            }, speed);
        }
    }
    window.requestAnimationFrame(performEnemyMove);
}

window.onload = function() {
    var enemy = enemyType();
    drawShip(shipImg, player.positionX, player.positionY, 50, 20);
    enemies.push(enemy);
    players.push(player);
}


executeCommand();

function executeCommand() {
    document.body.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
            case 83:
                moveShip(player, "down");
                if (RestrictionShip(player.positionX, player.positionY)) {
                    player.positionY = 120;
                    break;
                }
                drawShip(shipImg, player.positionX, player.positionY, 50, 20);
                break;
            case 87:
                moveShip(player, "up");
                if (RestrictionShip(player.positionX, player.positionY)) {
                    player.positionY = 0;
                    break;
                }
                drawShip(shipImg, player.positionX, player.positionY, 50, 20);
                break;
            case 65:
                moveShip(player, "left");
                if (RestrictionShip(player.positionX, player.positionY)) {
                    player.positionX = 0;
                    break;
                }
                drawShip(shipImg, player.positionX, player.positionY, 50, 20);
                break;
            case 68:
                moveShip(player, "right");
                if (RestrictionShip(player.positionX, player.positionY)) {
                    player.positionX = 250;
                    break;
                }
                drawShip(shipImg, player.positionX, player.positionY, 50, 20);
                break;
            case 13:
                var newProjectile = new projectile(player.positionX + 50, player.positionY); // magic number center the projectile around the ship.
                projectiles.push(newProjectile);
                playerAttackHandler(newProjectile);
                break;
            default:
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

function drawProjectile(x, y) {
    ctxGameField.clearRect(x, y + 5, 22, 9);
    ctxGameField.drawImage(bullet, x, y, 20, 8);
}

function playerAttackHandler(args) {
    var step = 1;
    var i = 1;

    function performAttack() {
        var projectileHitInfo = projectileHit(enemies, args);
        if (projectileHitInfo.isHit === true || args.positionX > gameField.width) {
            enemies[projectileHitInfo.index].life -= player.attack;
            if (enemies[projectileHitInfo.index].life <= 0) {
                drawExplosion(projectileHitInfo.positionX, projectileHitInfo.positionY);
                player.score += enemies[projectileHitInfo.index].addScoreToPlayer;
                console.log(player.score);
                enemies.splice(projectileHitInfo.index, 1);
            }
            window.cancelAnimationFrame(performAttack);
        }
        else {
            ctxGameField.clearRect(args.x, args.y + 5, 22, 9);
            ctxGameField.drawImage(bullet, args.x + 2, args.y + 5, 20, 8);
            args.x += step ;
            window.requestAnimationFrame(performAttack);
        }
    }
    window.requestAnimationFrame(performAttack);
}

function enemyAttackHandler(args) {
    var step = 1;

    function performAttack() {
        if (enemyProjectileHit(players, args) === true || args.x > gameField.width) {
            drawExplosion(args.x, args.y);
            window.cancelAnimationFrame(performAttack);
        } else {
            ctxGameField.clearRect(args.x, args.y + 5, 22, 9);
            ctxGameField.drawImage(bullet, args.x - 2, args.y + 5, 20, 8);
            args.x -= step + 3;
            window.requestAnimationFrame(performAttack);
        }
    }
    window.requestAnimationFrame(performAttack);
}

function drawScore(args) {
    console.log(player1.score);
}

function drawExplosion(x, y) {
    var count = 0;
    var posx;
    var posy;

    function Animate() {
        posx = (count % 5) * 45;
        posy = Math.floor(count / 5) * 45;

        ctxGameField.clearRect(x, y, 45, 45);
        ctxGameField.drawImage(explosion, posx, posy, 45, 45, x, y, 45, 45); // magic numbers set the proper possition of explosion.
        if (count === 50) {
            ctxGameField.clearRect(x,y,60,45);
            window.cancelAnimationFrame(Animate);
        } else {
            count++;
            window.requestAnimationFrame(Animate);
        }

    }
    window.requestAnimationFrame(Animate);
}

function moveShip(args, dir) {
    switch (dir) {
        case "left":
            args.positionX -= 5;
            break;
        case "right":
            args.positionX += 5;
            break;
        case "down":
            args.positionY += 5;
            break;
        case "up":
            args.positionY -= 5;
            break;
        default:
            break;
    }
}

function projectileHit(enemies, projectile) {
    for (var i = 0; i < enemies.length; i += 1) {
        if (projectile.x == enemies[i].positionX - 20 && projectile.y == enemies[i].positionY) {
            return {
                positionX: enemies[i].positionX,
                positionY: enemies[i].positionY,
                index: i,
                isHit: true
            };
        }
        else {
            if (projectile.x >= enemies[i].positionX) // magic numbers set the range of shooting
            {
                if (projectile.y < enemies[i].positionY + 20 && projectile.y > enemies[i].positionY - 20) // magic numbers set the y range of shooting.
                {
                    return {
                        positionX: enemies[i].positionX,
                        positionY: enemies[i].positionY,
                        index: i,
                        isHit: true
                    };
                }
            }
        }
    }
    return false;
}

function enemyProjectileHit(enemies, projectile) {
    for (var i = 0; i < enemies.length; i += 1) {
        if (projectile.x == enemies[i].positionX + 20 && projectile.y == enemies[i].positionY) {
            ctxGameField.clearRect(enemies[i].positionX + 20, enemies[i].positionY + 5, 45, 30); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
            enemies[i].life -= 5;
            if (enemies[i].life <= 0) {
                enemies.remove(enemies[i]);
            }
            return true;
        } else {
            if (projectile.x <= enemies[i].positionX) // magic numbers set the range of shooting
            {
                if (projectile.y < enemies[i].positionY + 20 && projectile.y > enemies[i].positionY - 20) // magic numbers set the y range of shooting.
                {
                    ctxGameField.clearRect(enemies[i].positionX - 20, enemies[i].positionY - 5, 100, 50); // magic number -5 because when bullet hits top wing its one half is -5 before y. Other numbers set the clear range..
                    enemies[i].life -= 5;
                    if (enemies[i].life <= 0) {
                        enemies.remove(enemies[i]);
                    }
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