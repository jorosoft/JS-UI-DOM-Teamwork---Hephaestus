var Player = (function() {
    // getPlayerScore
    // live
    // attack 
    // position
    // direction

    var player = Object.create({});

    Object.defineProperty(player, 'create', {
        value: function(name) {
            this.name = name;
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