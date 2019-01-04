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
    this.load.image('pic', 'assets/pics/acryl_bladerunner.png');


    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/nebula.jpg');
    this.load.image('street', 'assets/sprites/cyberpunk-street.png')
    this.load.image('rick', 'assets/sprites/rick.png');
    this.load.image('blue', 'assets/particles/blue-flare.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'street');
    this.add.image(400, 300, 'logo')

    this.add.image(300, 300, 'pic');

    var particles = this.add.particles('blue');

    var emitter = particles.createEmitter({
        speed: 50,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'rick');

    
    logo.setBounce(1, .5);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}
