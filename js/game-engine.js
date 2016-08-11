var gameField = document.getElementById("game-field");
var ctxGameField = gameField.getContext("2d");
var background = document.getElementById("game-background");
var ctxBackground = background.getContext("2d");
var wrapper = document.getElementById("wrapper");

var enemies = [],
    players = [],
    factoryInit = spaceImpactFactory(),
    player = factoryInit.getPlayer("Strahil", 10, 60),
    enemyOne,
    enemyTwo,
    enemyThree,
    enemyCount;

var backgroundImg = new Image();
backgroundImg.src = "images/space.jpg";

var shipImg = new Image();
shipImg.src = "images/ship.png";

var enemyImgOne = new Image();
enemyImgOne.src = "images/enemy1.gif";

var enemyImgTwo = new Image();
enemyImgTwo.src = "images/enemy2.png";

var enemyImgThree = new Image();
enemyImgThree.src = "images/enemy3.png";

var bullet = new Image();
bullet.src = "images/bullet.png";

var explosion = new Image();
explosion.src = "images/explosion1.png";


if (!Array.prototype.remove) {
    Array.prototype.remove = function (val, all) {
        var i, removedItems = [];
        if (all) {
            for (i = this.length; i -= 1;) {
                if (this[i] === val) removedItems.push(this.splice(i, 1));
            }
        } else { 
            i = this.indexOf(val);
            if (i > -1) removedItems = this.splice(i, 1);
        }
        return removedItems;
    };
}
//
var canvasTemp = document.createElement("canvas"),
    tempContext = canvasTemp.getContext("2d"),
    imgWidth = 0,
    imgHeight = 0,
    imageData = {},
    canvasWidth = 320,
    canvasHeight = 240,
    scrollVal = 0,
    speed = 2;


function loadImage() {
    imgWidth = backgroundImg.width,
    imgHeight = backgroundImg.height;
    canvasTemp.width = imgWidth;
    canvasTemp.height = imgHeight;
    render();
}

function render() {
    ctxBackground.clearRect(0, 0, canvasWidth, canvasHeight);

    if (scrollVal >= canvasWidth) {
        scrollVal = 0;
    }

    scrollVal += speed;
    ctxBackground.drawImage(backgroundImg, -scrollVal, 0, imgWidth, imgHeight);
    ctxBackground.drawImage(backgroundImg, canvasWidth - scrollVal, 0, imgWidth, imgHeight);

    setTimeout(function () { render(); }, 20);
}
//
window.onload = function () {
    drawShip(shipImg, player.positionX, player.positionY, 50, 20);
    players.push(player);
    multipleEnemies();
    loadImage();
}

function multipleEnemies() {
    count = 0;

    function invokeEnemy() {
        if (count % 280 == 0) {
            if (enemies.length < 4) {
                var enemy = enemyType();
                enemies.push(enemy);
                console.log(enemies.length);
            }
        }
        count++;
        window.requestAnimationFrame(invokeEnemy);
    }
    invokeEnemy();
}

function gameInit() {

}

backgroundImg.onload = function () {
    // create pattern
    var ptrn = ctxBackground.createPattern(backgroundImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctxBackground.fillStyle = ptrn;
    ctxBackground.fillRect(0, 0, 960, 640); // context.fillRect(x, y, width, height);
}

enemyCount = 0;

function enemyType() {
    var typeofEnemy = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
        randomPosition = Math.floor(Math.random() * (100 - 1 + 1)) + 1;


    if (typeofEnemy === 1) {
        enemyOne = factoryInit.getEnemy(5, 20, 50, 250, randomPosition, typeofEnemy, 20, 20);
        moveEnemy(enemyOne, enemyOne.width, enemyOne.height, enemyImgOne);
        enemyOne.enemyType = 1;
        enemyCount += 1;
        return enemyOne;

    } else if (typeofEnemy === 2) {
        enemyTwo = factoryInit.getEnemy(7, 3, 100, 250, randomPosition, typeofEnemy, 45, 40);
        moveEnemy(enemyTwo, enemyTwo.width, enemyTwo.height, enemyImgTwo);
        enemyTwo.enemyType = 2;
        enemyCount += 1;
        return enemyTwo;

    } else if (enemyCount === 50) {
        boss = factoryInit.getEnemy(100, 30, 5000, 250, 50, 4, 70, 70);

    } else {
        enemyThree = factoryInit.getEnemy(10, 1, 150, 250, randomPosition, typeofEnemy, 50, 20);
        moveEnemy(enemyThree, enemyThree.width, enemyThree.height, enemyImgThree);
        enemyThree.enemyType = 3;
        enemyCount += 1;
        return enemyThree;
    }
}

function moveEnemy(enemy, sizeX, sizeY, image) {
    var step = 1,
        count = 0,
        index = 1,
        attackRatio = 0,
        speed;

    function performEnemyMove() {
        if (enemy.life <= 0 || enemy.positionX < -100 || collisionDetectionBetweenShips(enemy)) {
            window.cancelAnimationFrame(performEnemyMove);
            enemies.remove(enemy);
        } else {
            switch (enemy.enemyType) {
                case 1:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 22, 9);
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width,enemy.height);
                    enemy.positionX -= step;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    speed = 0;
                    if (attackRatio % 50 === 0) {
                        var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY, enemy);
                        enemyAttackHandler(newProjectile, enemy);
                    }
                    attackRatio += 1;
                    break;
                case 2:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 22, 9);
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width,enemy.height);
                    enemy.positionX -= step;
                    enemy.positionY += count;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    count += index;
                    if (count === 10 || count === -10) {
                        count = 0;
                        index *= -1;
                    }
                    speed = 100;
                    //var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY, enemy);
                    //enemyAttackHandler(newProjectile, enemy);
                    break;
                case 3:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, 22, 9);
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width,enemy.height);
                    enemy.positionX -= step;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    speed = 100
                    //var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY, enemy);
                    //enemyAttackHandler(newProjectile, enemy);
                    break;
                default:
                    break;
            }

            setTimeout(function () {
                window.requestAnimationFrame(performEnemyMove);
            }, speed);
        }
    }
    window.requestAnimationFrame(performEnemyMove);
}

executeCommand();

function executeCommand() {
    document.body.addEventListener('keydown', function (ev) {
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
                var newProjectile = new projectile(player.positionX + 50, player.positionY, player); // magic number center the projectile around the ship.
                playerAttackHandler(newProjectile);
                break;
            default:
                break;
        }
    });
}

function projectileHit(enemies, projectile) {
    for (var i = 0; i < enemies.length; i += 1) {
        if (projectile.x < enemies[i].positionX + enemies[i].width && projectile.x + 12 > enemies[i].positionX &&
            projectile.y < enemies[i].positionY + enemies[i].height && projectile.y + 12 > enemies[i].positionY) {
            return {
                positionX: enemies[i].positionX,
                positionY: enemies[i].positionY,
                index: i,
                isHit: true
            };
        }
    }
    return false;
}

function collisionDetectionBetweenShips(enemy) {
    if (player.positionX < enemy.positionX + enemy.width && player.positionX + 35 > enemy.positionX &&
        player.positionY < enemy.positionY + enemy.height && player.positionY + 35 > enemy.positionY) {
        player.life -= 100;
        drawScoreBoard(player.name, player.score, player.life);
        player.score += enemy.addScoreToPlayer;
        ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width, enemy.height);
        ctxGameField.drawImage(shipImg, player.positionX, player.positionY, 50, 20);
        if (player.life <= 0) {
            gameOver(player.positionX, player.positionY);
        }
        console.log(player.life);
        return true;
    }
    return false;
}

function projectile(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
}

function drawShip(img, x, y, sizeX, sizeY) {
    ctxGameField.clearRect(x - 10, y - 10, sizeX + 20, sizeY + 20); // Ship moves with 10px position per step, magic numbers clear 10px around all sides of ship at every movement.
    ctxGameField.drawImage(img, x, y, sizeX, sizeY);
}

function drawProjectile(x, y) {
    ctxGameField.clearRect(x, y + 5, 22, 9);
    ctxGameField.drawImage(bullet, x, y, 20, 8);
}

function playerAttackHandler(projectile) {
    var step = 1;
    var i = 1;

    function performAttack() {
        var projectileHitInfo = projectileHit(enemies, projectile);
        if (projectile.x > gameField.width + 50) {
            window.cancelAnimationFrame(performAttack);
        } else {
            if (projectileHitInfo.isHit === true || projectile.positionX > gameField.width) {
                enemies[projectileHitInfo.index].life -= player.attack;
                drawScoreBoard(player.name, player.score, player.life);
                if (enemies[projectileHitInfo.index].life <= 0) {
                    drawExplosion(projectileHitInfo.positionX, projectileHitInfo.positionY);
                    ctxGameField.clearRect(enemies[projectileHitInfo.index].positionX,enemies[projectileHitInfo.index].positionY,enemies[projectileHitInfo.index].width,enemies[projectileHitInfo.index].height);
                    player.score += enemies[projectileHitInfo.index].addScoreToPlayer;
                    drawScoreBoard(player.name, player.score, player.life);
                    enemies.splice(projectileHitInfo.index, 1);
                    //ctxGameField.clearRect(projectileHitInfo.positionX, projectileHitInfo.positionY, 22, 9);
                    ctxGameField.clearRect(projectile.x, projectile.y + 5, 22, 9);
                }
                window.cancelAnimationFrame(performAttack);
                ctxGameField.clearRect(projectile.x, projectile.y + 5, 22, 9);
            } else {
                ctxGameField.clearRect(projectile.x, projectile.y + 5, 22, 9);
                ctxGameField.drawImage(bullet, projectile.x + 2, projectile.y + 5, 20, 8);
                projectile.x += step;
                window.requestAnimationFrame(performAttack);
            }
        }
    }
    performAttack();
}

function enemyAttackHandler(projectile, enemy) {
    var step = 1;
    var count = 1;

    function performAttack() {
        var projectileHitInfo = enemyProjectileHit(player, projectile);
        if (projectile.x < -50) {
            window.cancelAnimationFrame(performAttack);
        } else {
            if (projectileHitInfo.isHit === true) {
                player.life -= enemy.attack;
                console.log("dadada" + enemy.attack);

                drawScoreBoard(player.name, player.score, player.life);
                ctxGameField.clearRect(projectile.x, projectile.y + 5, 22, 9);
                ctxGameField.drawImage(shipImg, player.positionX, player.positionY, 50, 20);
                if (player.life <= 0) {
                    gameOver(projectileHitInfo.positionX, projectileHitInfo.positionY);
                }
                window.cancelAnimationFrame(performAttack);
            } else {
                ctxGameField.clearRect(projectile.x, projectile.y + 5, 22, 9);
                ctxGameField.drawImage(bullet, projectile.x - 2, projectile.y + 5, 20, 8);
                projectile.x -= step + 3;
                window.requestAnimationFrame(performAttack);
            }
        }
    }
    performAttack();
}

function gameOver(x, y) {
    drawExplosion(x, y)
    player.positionX = 9999;
    player.positionY = 9000;
    if (localStorage && localStorage.score < player.score) {
        localStorage.setItem("name", player.name);
        localStorage.setItem("score", player.score);
    }
    window.cancelAnimationFrame(render);
    window.setTimeout(function () {
        gameField.parentNode.removeChild(gameField);
        background.parentNode.removeChild(background);
    }, 800);
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
            ctxGameField.clearRect(x, y, 60, 45);
            window.cancelAnimationFrame(Animate);
        } else {
            count++;
            window.requestAnimationFrame(Animate);
        }

    }
    Animate();
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

function enemyProjectileHit(player, projectile) {
    if (projectile.x == player.positionX - 20 && projectile.y == player.positionY) {
        return {
            positionX: player.positionX,
            positionY: player.positionY,
            isHit: true
        };
    } else {
        if (projectile.x <= player.positionX) // magic numbers set the range of shooting
        {
            if (projectile.y < player.positionY + 20 && projectile.y > player.positionY - 20) // magic numbers set the y range of shooting.
            {
                return {
                    positionX: player.positionX,
                    positionY: player.positionY,
                    isHit: true
                };
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