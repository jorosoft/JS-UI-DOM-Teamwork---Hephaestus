var spaceImpactFactory = function () {

    var player = (function () {
        var defaultPlayerScore = 0;
        defaultPlayerAttack = 2,
        defaultPlayerLife = 5;
        player = Object.create({});

        Object.defineProperty(player, "init", {
            value: function (name, positionX, positionY) {
                this.name = name;
                this.attack = defaultPlayerAttack;
                this.life = defaultPlayerLife;
                this.score = defaultPlayerScore;
                this.positionX = positionX;
                this.positionY = positionY;

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
                return this._attack;
            },
            set: function (val) {
                this._attack = val;
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

        Object.defineProperty(player, "positionX", {
            get: function () {
                return this._positionX;
            },
            set: function (val) {
                this._positionX = val;
            }
        });

        Object.defineProperty(player, "positionY", {
            get: function () {
                return this._positionY;
            },
            set: function (val) {
                this._positionY = val;
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
            value: function (life, attack, addScoreToPlayer, positionX, positionY, enemyType) {
                this.life = life;
                this.attack = attack;
                this.addScoreToPlayer = addScoreToPlayer;
                this.positionX = positionX;
                this.positionY = positionY;
                this.enemyType = enemyType;

                return this;
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

        Object.defineProperty(enemy, "addScoreToPlayer", {
            get: function () {
                return this._addScoreToPlayer;
            },
            set: function (val) {
                this._addScoreToPlayer = val;
            }
        });

        Object.defineProperty(enemy, "positionX", {
            get: function () {
                return this._positionX;
            },
            set: function (val) {
                this._positionX = val;
            }
        });

        Object.defineProperty(enemy, "positionY", {
            get: function () {
                return this._positionY;
            },
            set: function (val) {
                this._positionY = val;
            }
        });

        Object.defineProperty(enemy, "enemyType", {
            get: function () {
                return this._enemyType;
            },
            set: function (val) {
                this._enemyType = val;
            }
        });

        return enemy;
    }());

    var field = (function () {
        field = Object.create({});

        Object.defineProperty(field, "init", {
            value: function (positionX, positionY) {
                this.positionX = positionX;
                this.positionY = positionY;

                return this;
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

        return field;
    }());

    return {
        getPlayer: function (name, positionX, positionY) {
            return Object.create(player).init(name, positionX, positionY);
        },
        getEnemy: function (life, attack, addScoreToPlayer, positionX, positionY, enemyType) {
            return Object.create(enemy).init(life, attack, addScoreToPlayer, positionX, positionY, enemyType);
        },
        getField: function (positionX, positionY) {
            return Object.create(field).init(positionX, positionY);
        }
    }
}

