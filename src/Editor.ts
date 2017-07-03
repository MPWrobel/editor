let game;
let mapJSON;
let output;

function loadFile() {
    
    const fileIn = document.getElementById("file-input") as HTMLInputElement
    let fileOut = document.getElementById("save")

    let reader = new FileReader();
    reader.readAsText(fileIn.files[0]);
    reader.onload = () => {

        mapJSON = reader.result;
        
        output = "data:application/json;base64," + btoa(mapJSON);
        fileOut.innerHTML = '<a href="'+output+'" download>Save</a>';

        if(game!=null)
            game.destroy();
        game = new Phaser.Game(window.innerWidth - 280, innerHeight - 20, Phaser.AUTO, 'content', {
            preload: preload,
            create: create,
            update: update
        }, null, false);

    }
}



let esc;
let object;
let map;
let grid;

function preload() {

    game.load.tilemap('map', null, JSON.parse(mapJSON), Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', '../assets/tileset.png');
    game.load.image('player', '../assets/player.png')
    game.load.image('coin', '../assets/coin.png')

    esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    game.input.onDown.add(() => {

        if (game.input.activePointer.leftButton.isDown) {

            if (object != null)
                game.add.image(object.x, object.y, object.key);


        }

    })

}

function create() {

    map = game.add.tilemap('map');
    map.addTilesetImage('tileset', 'tileset');
    game.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    map.createLayer('layer1');
    map.createLayer('clouds');

    //new Grid(game, map.widthInPixels, map.heightInPixels);

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

    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||
        game.input.keyboard.isDown(Phaser.Keyboard.S)) {

        game.camera.y += 5;

    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.A) ||
        game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

        game.camera.x -= 5;

    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D) ||
        game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

        game.camera.x += 5;

    }

}

function addElement(obj) {

    if (object != null)
        object.destroy();

    object = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y, obj)
    document.getElementById('content').style.cursor = 'none';

}