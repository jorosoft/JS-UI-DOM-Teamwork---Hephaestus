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
    enemyCount = 0;

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

var bossImg = new Image();
bossImg.src = "images/boss.png"

var bullet = new Image();
bullet.src = "images/bullet.png";

var explosion = new Image();
explosion.src = "images/explosion1.png";

var projectileEnemyOneImg = new Image();
projectileEnemyOneImg.src = "images/projectile1.png";

var projectileEnemyTwoImg = new Image();
projectileEnemyTwoImg.src = "images/projectile2.png";

var projectileEemyThreeImg = new Image();
projectileEemyThreeImg.src = "images/projectile3.png";

var projectileBossImg = new Image();
projectileBossImg.src = "images/projectile4.png";

var startImage = new Image();
startImage.src = "images/start.png";

startImage.onload = function () {
    ctxBackground.drawImage(startImage, 0, 0, 300, 200);
}

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
    if (player.life > 0) {
        window.requestAnimationFrame(render);
    }
}

var flag = false;
function startLala() {
    if (flag === false) {
        drawShip(shipImg, player.positionX, player.positionY, 50, 20);
        players.push(player);
        multipleEnemies();
        loadImage();
        executeCommand();
    }
    flag = true;
}

function multipleEnemies() {
    count = 0;

    function invokeEnemy() {
        if (count % 280 == 0) {
            if (enemies.length < 4) {
                var enemy = enemyType();
                enemies.push(enemy);
            }
        }
        count++;
        window.requestAnimationFrame(invokeEnemy);
    }
    invokeEnemy();
}

backgroundImg.onload = function () {
    var ptrn = ctxBackground.createPattern(backgroundImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctxBackground.fillStyle = ptrn;
    ctxBackground.fillRect(0, 0, 960, 640); // context.fillRect(x, y, width, height);
}

function enemyType() {
    var typeofEnemy,
        randomPosition = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    if (enemyCount === 2) {
        typeofEnemy = 4;
    } else {
        typeofEnemy = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    }

    if (typeofEnemy === 1) {
        enemyOne = factoryInit.getEnemy(5, 10, 50, 250, randomPosition, typeofEnemy, 20, 20);
        moveEnemy(enemyOne, enemyOne.width, enemyOne.height, enemyImgOne);
        enemyOne.enemyType = 1;
        enemyCount += 1;
        return enemyOne;

    } else if (typeofEnemy === 2) {
        enemyTwo = factoryInit.getEnemy(7, 20, 100, 250, randomPosition, typeofEnemy, 45, 40);
        moveEnemy(enemyTwo, enemyTwo.width, enemyTwo.height, enemyImgTwo);
        enemyTwo.enemyType = 2;
        enemyCount += 1;
        return enemyTwo;

    } else if (typeofEnemy === 4) {
        boss = factoryInit.getEnemy(100, 30, 5000, 230, 50, 4, 70, 70);
        moveEnemy(boss, boss.width, boss.height, bossImg);
        boss.enemyType = 4;
        enemies.push({}, {}, {}, {});
        return boss;

    } else {
        enemyThree = factoryInit.getEnemy(10, 15, 150, 250, randomPosition, typeofEnemy, 50, 20);
        moveEnemy(enemyThree, enemyThree.width, enemyThree.height, enemyImgThree);
        enemyThree.enemyType = 3;
        enemyCount += 1;
        return enemyThree;
    }
}

function moveEnemy(enemy, sizeX, sizeY, image) {
    var step = 1,
        stepBoss=10,
        count = 0,
        index = 1,
        attackRatio1 = 0,
        attackRatio2 = 0,
        attackRatio3 = 0,
        attackRatio4 = 0,
        speed;

    function performEnemyMove() {
        if (enemy.life <= 0 || enemy.positionX < -100 || collisionDetectionBetweenShips(enemy)) {
            window.cancelAnimationFrame(performEnemyMove);
            enemies.remove(enemy);
        } else {
            switch (enemy.enemyType) {
                case 1:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 27, 16);
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width, enemy.height);
                    enemy.positionX -= step;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    speed = 0;
                    if (attackRatio1 % 27 === 0) {
                        var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY, enemy);
                        enemyAttackHandler(newProjectile, enemy, projectileEnemyOneImg, 25, 15);
                    }
                    attackRatio1 += 1;
                    break;
                case 2:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY + 1, 52, 13);
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width, enemy.height);
                    enemy.positionX -= step;
                    enemy.positionY += count;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    count += index;
                    if (count === 10 || count === -10) {
                        count = 0;
                        index *= -1;
                    }
                    speed = 100;

                    if (attackRatio2 % 35 === 0) {
                        var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY, enemy);
                        enemyAttackHandler(newProjectile, enemy, projectileEnemyTwoImg, 50, 12);
                    }

                    attackRatio2 += 1;
                    break;
                case 3:
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, 57, 16);
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width, enemy.height);
                    enemy.positionX -= step;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    speed = 100;

                    if (attackRatio3 % 40 === 0) {
                        var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY, enemy);
                        enemyAttackHandler(newProjectile, enemy, projectileEemyThreeImg, 55, 15);
                    }

                    attackRatio3 += 1;
                    break;
                case 4:
                    
                    ctxGameField.clearRect(enemy.positionX, enemy.positionY, enemy.width, enemy.height);
                    enemy.positionY -= count;
                    enemy.positionX -= stepBoss;
                    drawShip(image, enemy.positionX, enemy.positionY, sizeX, sizeY);

                    count += index;

                    if (count === 10 || count === -10) {
                        count = 0;
                        index *= -1;
                    }

                    if (enemy.positionX === 250 || enemy.positionX === 100) {
                        stepBoss *= -1;
                    }

                    if (attackRatio4 % 33 === 0) {
                        var newProjectile = new projectile(enemy.positionX - 20, enemy.positionY + 20, enemy);
                        enemyAttackHandler(newProjectile, enemy, projectileBossImg, 40, 10);
                    }

                    attackRatio4 += 1;
                    speed = 100;
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
                    ctxGameField.clearRect(enemies[projectileHitInfo.index].positionX, enemies[projectileHitInfo.index].positionY, enemies[projectileHitInfo.index].width, enemies[projectileHitInfo.index].height);
                    player.score += enemies[projectileHitInfo.index].addScoreToPlayer;
                    drawScoreBoard(player.name, player.score, player.life);
                    enemies.splice(projectileHitInfo.index, 1);
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

function enemyAttackHandler(projectile, enemy, projectileImg, projectileSizeX, projectuleSizeY) {
    var step = 1;
    var count = 1;

    function performAttack() {
        var projectileHitInfo = enemyProjectileHit(player, projectile);
        if (projectile.x < -50) {
            window.cancelAnimationFrame(performAttack);
        } else {
            if (projectileHitInfo.isHit === true) {
                player.life -= enemy.attack;

                drawScoreBoard(player.name, player.score, player.life);
                ctxGameField.clearRect(projectile.x, projectile.y + 5, projectileSizeX + 2, projectuleSizeY + 1);
                ctxGameField.drawImage(shipImg, player.positionX, player.positionY, 50, 20);
                if (player.life <= 0) {
                    gameOver(projectileHitInfo.positionX, projectileHitInfo.positionY);
                }
                window.cancelAnimationFrame(performAttack);
            } else {
                ctxGameField.clearRect(projectile.x, projectile.y + 5, projectileSizeX + 2, projectuleSizeY + 1);
                ctxGameField.drawImage(projectileImg, projectile.x - 2, projectile.y + 5, projectileSizeX, projectuleSizeY);
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
    if (localStorage.score < player.score) {
        localStorage.setItem("name", player.name);
        localStorage.setItem("score", player.score);
    } else if (localStorage.name === undefined){
        localStorage.setItem("name", player.name);
        localStorage.setItem("score", 0);
    }

    window.setTimeout(function () {
        gameField.parentNode.removeChild(gameField);
        backgroundImg.src = "images/game over.gif";
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

function moveShip(player, dir) {
    switch (dir) {
        case "left":
            player.positionX -= 5;
            break;
        case "right":
            player.positionX += 5;
            break;
        case "down":
            player.positionY += 5;
            break;
        case "up":
            player.positionY -= 5;
            break;
        default:
            break;
    }
}

function enemyProjectileHit(player, projectile) {
    if (projectile.x < player.positionX + 50 && projectile.x + 25 > player.positionX &&
        projectile.y < player.positionY + 15 && projectile.y + 15 > player.positionY) {
        return {
            positionX: player.positionX,
            positionY: player.positionY,
            isHit: true
        };
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