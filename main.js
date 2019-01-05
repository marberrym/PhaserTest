var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/rnmlogo.png');
    this.load.image('sky', 'assets/nebula.jpg');
    this.load.image('rick', 'assets/rick.png');
    this.load.image('blue', 'assets/blue-flare.png');
    this.load.image('morty', 'assets/morty.png');
    this.load.image('greenorb', 'assets/greenorb.png');
    this.load.image('button', 'assets/button.png');
    this.load.image('rickraygun', 'assets/rickraygun.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 80, 'logo')

    var particles = this.add.particles('blue');
    var particles2 = this.add.particles('greenorb');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var emitter2 = particles2.createEmitter({
        speed: 100,
        scale: {start: 1, end: 0},
        blendMode: 'ADD'
    })

    var textStyle = {
        font: "normal 24px Arial",
        fill: '#ffffff',
        align: 'center',
        boundsAlignH: "center", // bounds center align horizontally
        boundsAlignV: "middle" // bounds center align vertically
    }
    
    
    this.devButton = this.add.text(600, 200, 'About the Developer!');

    this.playBtn = this.add.sprite(300, 200, 'button').setScale(.25, .25);
    this.playButton = this.add.text(275, 175, 'PLAY!', textStyle);

    this.devButton.setInteractive();
    this.playBtn.setInteractive();

    // this.playButtonBox.on('pointerup', () => console.log("Start Game!"))
    // this.playButtonBox.on('pointerover', () => {
    //     console.log("hover");
    //     this.hoverState(playButtonBox);
    // })

    var Rick = this.physics.add.image(500, 100, 'rick');
    var Rick2 = this.physics.add.image(300, 100, 'rickraygun').setScale(.25, .25);
    var Morty = this.physics.add.image(100, 50, 'morty').setScale(.5, .5);

    Morty.setBounce(1, .8);

    
    Morty.setCollideWorldBounds(true);

    Rick.setBounce(1, .5);
    Rick.setCollideWorldBounds(true);
    Rick2.setBounce(1, .7);
    Rick2.setCollideWorldBounds(true);

    emitter2.startFollow(Rick);
    emitter.startFollow(Morty);
}

function hoverState(button) {
    var btn = button;
    btn.fillStyle({})
}
