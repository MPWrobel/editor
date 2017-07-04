var game;
var mapJSON;
var obj;
var output;
var sprites = [];
var layers = [];
var playerIndex;
var player;
var fileOut = document.getElementById("save");
function loadFile() {
    var fileIn = document.getElementById("file-input");
    var reader = new FileReader();
    if (fileIn.files[0] != null)
        reader.readAsText(fileIn.files[0]);
    reader.onload = function () {
        mapJSON = JSON.parse(reader.result);
        if (mapJSON.objects == null)
            mapJSON.objects = {};
        obj = mapJSON.objects;
        if (obj.player == null)
            obj.player = {};
        if (obj.coins == null)
            obj.coins = [];
        output = "data:application/json;base64," + btoa(JSON.stringify(mapJSON));
        fileOut.innerHTML = '<a href="' + output + '" download>Save</a>';
        if (game != null)
            game.destroy();
        game = new Phaser.Game(window.innerWidth - 290, innerHeight - 20, Phaser.AUTO, 'content', {
            preload: preload,
            create: create,
            update: update
        }, null, false);
    };
}
var esc;
var object;
var map;
var grid;
window.onresize = function (e) {
    if (game != null) {
        game.scale.setGameSize(window.innerWidth - 290, innerHeight - 20);
        layers[0].destroy();
        layers[1].destroy();
        layers[0] = map.createLayer('layer1');
        layers[1] = map.createLayer('clouds');
    }
};
function preload() {
    //game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.load.tilemap('map', null, mapJSON, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', '../assets/tileset.png');
    game.load.image('player', '../assets/player.png');
    game.load.image('coin', '../assets/coin.png');
    esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    game.input.onDown.add(function () {
        if (game.input.activePointer.leftButton.isDown) {
            if (object != null) {
                sprites.push(game.add.image(object.x, object.y, object.key));
                if (object.key == 'player') {
                    if (sprites[playerIndex] != null) {
                        sprites[playerIndex].destroy();
                        sprites[playerIndex] = null;
                    }
                    playerIndex = sprites.length - 1;
                    obj.player.x = object.x;
                    obj.player.y = object.y;
                }
                else if (object.key == 'coin') {
                    obj.coins.push({
                        x: object.x,
                        y: object.y
                    });
                }
                output = "data:application/json;base64," + btoa(JSON.stringify(mapJSON));
                fileOut.innerHTML = '<a href="' + output + '" download>Save</a>';
            }
        }
    });
}
function create() {
    map = game.add.tilemap('map');
    map.addTilesetImage('tileset', 'tileset');
    game.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    layers.push(map.createLayer('layer1'));
    layers.push(map.createLayer('clouds'));
    if (obj.player.x != null && obj.player.y != null) {
        sprites.push(game.add.sprite(obj.player.x, obj.player.y, 'player'));
        playerIndex = sprites.length - 1;
    }
    for (var i = 0; i < obj.coins.length; i++) {
        sprites.push(game.add.sprite(obj.coins[i].x, obj.coins[i].y, 'coin'));
    }
}
function update() {
    if (esc.justDown) {
        if (object != null) {
            object.destroy();
            object = null;
        }
        document.getElementById('content').style.cursor = 'auto';
    }
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
    if (object != null)
        object.destroy();
    object = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y, obj);
    document.getElementById('content').style.cursor = 'none';
}
//# sourceMappingURL=editor.js.map