QUnit.test("GameFactory_getPlayer_ShouldCreatePlayerObject", function(assert) {
    var testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60);

    assert.notEqual(testPlayer, null);
});

QUnit.test("GameFactory_getPlayer_ShouldCreateEnemyObject", function(assert) {
    var testFactory = spaceImpactFactory(),
        testEnemy = testFactory.getEnemy(100, 30, 5000, 250, 50, 4, 70, 70);

    assert.notEqual(testEnemy, null);
});

QUnit.test("GameFactory_getPlayer_ShouldCreateFieldObject", function(assert) {
    var testFactory = spaceImpactFactory(),
        testField = testFactory.getField(100, 30);

    assert.notEqual(testField, null);
});

QUnit.test("GameEngine_enemyProjectileHit_ShouldReturnTrueWithCorrectParameters", function(assert) {
    var testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60),
        testProjectile = new projectile(10, 60);

    var result = enemyProjectileHit(testPlayer, testProjectile);

    assert.ok(result);
});

QUnit.test("GameEngine_enemyProjectileHit_ShouldReturnTrueWithIncorrectParameters", function(assert) {
    var testFactory = spaceImpactFactory(),
        testPlayer = testFactory.getPlayer("Mincho", 10, 60),
        testProjectile = new projectile(100, 600);

    var result = enemyProjectileHit(testPlayer, testProjectile);

    assert.notOk(result);
});