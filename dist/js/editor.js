var game = new Phaser.Game(1680, 1050, Phaser.AUTO, 'content', {
    preload: preload,
    create: create,
    update: update
});
var object;
var map;
function preload() {
    game.load.tilemap('map', '../map/map.json?' + new Date().getTime(), null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', '../assets/tileset.png');
    game.load.image('coin', '../assets/coin.png');
}
function create() {
    game.input.onDown.add(function () {
        if (game.input.activePointer.leftButton.isDown)
            console.log(game.input.activePointer.x +
                ', ' + game.input.activePointer.y);
    });
    game.input.keyboard.addCallbacks(null, null, function () {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC))
            console.log('hello world');
    }, null);
    map = game.add.tilemap('map');
    map.addTilesetImage('tileset', 'tileset');
    game.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    map.createLayer('layer1');
    map.createLayer('clouds');
}
function update() {
    if (object != null) {
        object.x = game.camera.x + game.input.x;
        object.y = game.camera.y + game.input.y;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) ||
        game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        game.camera.y -= 5;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||
        game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        game.camera.y += 5;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.A) ||
        game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        game.camera.x -= 5;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D) ||
        game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        game.camera.x += 5;
    }
}
function addElement(obj) {
    document.getElementById('content').style.cursor = 'none';
    if (object != null)
        object.destroy();
    object = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y, obj);
}
//# sourceMappingURL=editor.js.map