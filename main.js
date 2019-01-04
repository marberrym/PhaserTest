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
}

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 80, 'logo')

    var particles = this.add.particles('blue');

    var emitter = particles.createEmitter({
        speed: 50,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var emitter2 = particles.createEmitter({
        speed: 100,
        scale: {start: 1, end: 0},
        blendMode: 'ADD'
    })

    this.playButton = this.add.text(300, 200, 'PLAY!', { fill: '#0f0' });
    this.devButton = this.add.text(600, 200, 'About the Developer!');

    this.devButton.setInteractive();
    this.playButton.setInteractive();

    this.playButton.on('pointerup', () => console.log("Start Game!"))
    this.devButton.on('pointerup', () => console.log("Matthew Marberry"))
    this.devButton.on('pointerover', () => {
        console.log("hover");
        this.hoverState(devButton);
    })

    var Rick = this.physics.add.image(500, 100, 'rick');
    var Morty = this.physics.add.image(100, 50, 'morty')

    Morty.setBounce(1, .8);
    
    Morty.setCollideWorldBounds(true);

    Rick.setBounce(1, .5);
    Rick.setCollideWorldBounds(true);

    emitter.startFollow(Rick);
    emitter2.startFollow(Morty);
}

function hoverState(button) {
    this.devButton.setStyle({fill: '#ff0'})
}
