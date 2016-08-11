QUnit.test("GameFactory_getPlayer_ShouldCreatePlayerObject", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60);

    assert.notEqual(testPlayer, undefined);
});

QUnit.test("GameFactory_getEnemy_ShouldCreateEnemyObject", function(assert) {
    let testFactory = spaceImpactFactory(),
        testEnemy = testFactory.getEnemy(100, 30, 5000, 250, 50, 4, 70, 70);

    assert.notEqual(testEnemy, undefined);
});

QUnit.test("GameFactory_getField_ShouldCreateFieldObject", function(assert) {
    let testFactory = spaceImpactFactory(),
        testField = testFactory.getField(100, 30);

    assert.notEqual(testField, undefined);
});

QUnit.test("GameEngine_projectileConsstructor_ShouldCreateProjectileObject", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getField(100, 30);

    let testProjectile = new projectile(20, 20, testPlayer);

    assert.notEqual(testProjectile, undefined);
});

QUnit.test("GameEngine_enemyProjectileHit_ShouldReturnTrueWithCorrectParameters", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60),
        testProjectile = new projectile(10, 60);

    let result = enemyProjectileHit(testPlayer, testProjectile);

    assert.ok(result);
});

QUnit.test("GameEngine_enemyProjectileHit_ShouldReturnFalseWithIncorrectParameters", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60),
        testProjectile = new projectile(100, 600);

    let result = enemyProjectileHit(testPlayer, testProjectile);

    assert.notOk(result);
});

QUnit.test("GameEngine_moveShip_ShouldChangeShipCoordsWithCorrectValuesAtLeftCommand", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60);

    let result = moveShip(testPlayer, "left");

    assert.equal(testPlayer.positionX, 5);
    assert.equal(testPlayer.positionY, 60);
});

QUnit.test("GameEngine_moveShip_ShouldChangeShipCoordsWithCorrectValuesAtRightCommand", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60);

    let result = moveShip(testPlayer, "right");

    assert.equal(testPlayer.positionX, 15);
    assert.equal(testPlayer.positionY, 60);
});

QUnit.test("GameEngine_moveShip_ShouldChangeShipCoordsWithCorrectValuesAtUpCommand", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60);

    let result = moveShip(testPlayer, "up");

    assert.equal(testPlayer.positionX, 10);
    assert.equal(testPlayer.positionY, 55);
});

QUnit.test("GameEngine_moveShip_ShouldChangeShipCoordsWithCorrectValuesAtDownCommand", function(assert) {
    let testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60);

    let result = moveShip(testPlayer, "down");

    assert.equal(testPlayer.positionX, 10);
    assert.equal(testPlayer.positionY, 65);
});