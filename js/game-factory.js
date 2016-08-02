<<<<<<< HEAD
var spaceImpactFactory = function () {

    var player = (function () {
        var defaultPlayerScore = 0;
        defaultPlayerAttack = 2,
        defaultPlayerLife = 3;
        player = Object.create({});

        Object.defineProperty(player, "init", {
            value: function (name, directionX, directionY) {
                this.name = name;
                this.attack = defaultPlayerAttack;
                this.life = defaultPlayerLife;
                this.score = defaultPlayerScore;
                this.directionX = directionX;
                this.directionY = directionY;
                return this;
            }
        });

        Object.defineProperty(player, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                this._name = val;
            }
        });

        Object.defineProperty(player, "attack", {
            get: function () {
                return this._attack
            }
        });

        Object.defineProperty(player, "life", {
            get: function () {
                return this._life;
            },
            set: function (val) {
                this._life = val;
            }
        });

        Object.defineProperty(player, "score", {
            get: function () {
                return this._score;
            },
            set: function (val) {
                this._score = val;
            }
        });

        Object.defineProperty(player, "directionX", {
            get: function () {
                return this._directionX;
            },
            set: function (val) {
                this._directionX = val;
            }
        });

        Object.defineProperty(player, "directionY", {
            get: function () {
                return this._directionY;
            },
            set: function (val) {
                this._directionY = val;
            }
        });

        Object.defineProperty(player, "getPlayerScore", {
            value: function (enemy) {
                this.score += enemy.addScoreToPlayer;
            }
        });

        return player;
    }());

    var enemy = (function () {
        enemy = Object.create({});

        Object.defineProperty(enemy, "init", {
            value: function (life, attack, addScoreToPlayer, directionX, directionY) {
                this.attack = attack;
                this.life = life;
                this.addScoreToPlayer = addScoreToPlayer;
                this.directionEnemyX = directionEnemyX;
                this.directionEnemyY = directionEnemyY;

            }
        });

        Object.defineProperty(enemy, "attack", {
            get: function () {
                return this._attack;
            },
            set: function (val) {
                this._attack = val;
            }
        });

        Object.defineProperty(enemy, "life", {
            get: function () {
                return this._life;
            },
            set: function (val) {
                this._life = val;
            }
        });

        Object.defineProperty(enemy, "score", {
            get: function () {
                return this._score;
            }
        });

        Object.defineProperty(player, "directionEnemyX", {
            get: function () {
                return this._directionEnemyX;
            },
            set: function (val) {
                this._directionEnemyX = val;
            }
        });

        Object.defineProperty(player, "directionEnemyY", {
            get: function () {
                return this._directionEnemyY;
            },
            set: function (val) {
                this._directionEnemyY = val;
            }
        });
        // life 
        // attack
        // direction
        // position
        return enemy;
    }());

    var field = (function () {
        field = Object.create({});

        Object.defineProperty(field, "init", {
            value: function (positionX, positionY) {
                this.positionX = positionX;
                this.positionY = positionY;
            }
        });

        Object.defineProperty(field, "positionX", {
            get: function () {
                return this._positionX;
            },
            set: function (val) {
                this._positionX = val;
            }
        });

        Object.defineProperty(field, "positionY", {
            get: function () {
                return this._positionY;
            },
            set: function (val) {
                this._positionY = val;
            }
        });
    }());

    return {
        getPlayer: function (name, directionX, directionY) {
            return Object.create(player).init(name, directionX, directionY);
        },
        getEnemy: function (life, attack, addScoreToPlayer, directionX, directionY) {
            return Object.create(enemy).init(life, attack, addScoreToPlayer, directionX, directionY);
        },
        getField: function (positionX, positionY) {
            return Object.create(field).init(positionX, positionY);
        }
    }
}
=======
var Player = (function() {
    // getPlayerScore
    // live
    // attack 
    // position
    // direction

    var player = Object.create({});

    Object.defineProperty(player, 'create', {
        value: function(name) {
            this._name = name;
            this.live = 100;
            this.attack = 100;
            this.score = 0;
            return this;
        }
    });

    Object.defineProperty(player, 'name', {
        get: function() {
            return this._name;
        }
    });

    Object.defineProperty(player, 'live', {
        get: function() {
            return this.live;
        }
    });

    Object.defineProperty(player, 'attack', {
        get: function() {
            return this.attack;
        }
    });

    Object.defineProperty(player, 'score', {
        get: function() {
            return this._score;
        },
        set: function(val) {
            this._score = val;
        }
    });

    Object.defineProperty(player, 'direction', {
        value: function(ctx, x, y) {
            ctx.fillRect(x, y, 20, 20);
        }
    });

    return player;
}());

var enemy = function() {
    // addScoreToPlayer
    // live 
    // attack
    // direction
    // position
    // type of ship
    // type of weapons 
};

var field = function() {
    // obsticle
    // bonus live or rockets
};
>>>>>>> origin/master
