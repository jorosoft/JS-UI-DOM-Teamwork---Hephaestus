var gameField = document.getElementById("game-field");
var ctx = gameField.getContext("2d");

var xPositionPlayer = 50,
    yPositionPlayer = 50;

function gameInit() {

    var player = Object.create(Player).create('Vesko');
    player.direction(ctx, xPositionPlayer, yPositionPlayer);

    window.document.body.addEventListener('keydown', function(key) {
        switch (key.keyCode) {
            case 32:
                //doto fire
                break;
            case 37:
                xPositionPlayer -= 10;
                ctx.clearRect(0, 0, gameField.width, gameField.height);
                player.direction(ctx, xPositionPlayer, yPositionPlayer);
                break;

            case 38:
                yPositionPlayer -= 10;
                ctx.clearRect(0, 0, gameField.width, gameField.height);
                player.direction(ctx, xPositionPlayer, yPositionPlayer);
                break;

            case 39:
                xPositionPlayer += 10;
                ctx.clearRect(0, 0, gameField.width, gameField.height);
                player.direction(ctx, xPositionPlayer, yPositionPlayer);
                break;
            case 40:
                yPositionPlayer += 10;
                ctx.clearRect(0, 0, gameField.width, gameField.height);
                player.direction(ctx, xPositionPlayer, yPositionPlayer);
                break;

            default:
                break;
        }
    });

}


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