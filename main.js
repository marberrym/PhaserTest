// import Title from './scenes/TitleScreen';
// import GameScene from './scenes/GameScene';

let tween;
let background;
let iter = 0;
let spaceKey;
let lasers;
let gameOver = false;
let enemies = [];
let lives = [];
let wave = 1;
let score = 0;
let lifecount = 3;
let life1;
let life2;
let life3;
const height = window.innerHeight;
const width = window.innerWidth;

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }
    
    preload() {
        this.load.image('player', 'assets/playerImage.png');
        this.load.image('background', 'assets/nebula.jpg');
        this.load.image('logo', 'assets/rnmlogo.png');
        this.load.image('laser1', 'assets/laser1.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('lives', 'assets/lives.png');
    }

    create() {
        

        
        background = this.add.tileSprite(width/2, height/2, width, height, 'background');
        player = this.physics.add.sprite(100, 100, 'player').setScale(.1, .1);
        this.add.image(width/2, 50, 'logo').setScale(.5, .5);
        this.add.text(0, 0, `Lives:`, textStyle);
        this.add.text(0, 20, `Score: ${score}`);

        

        player.setCollideWorldBounds(true);

        // tween = this.tweens.addCounter({
        //     from: 1,
        //     to: 2,
        //     duration: 5000,
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1
        // });

        // player.setColliderWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.addWave(wave);

        
    }

    update() {

        // background.tilePositionX = Math.cos(iter) * 700;
        // background.tilePositionY = Math.sin(iter) * 500;
        // background.tileScaleX = tween.getValue();
        // background.tileScaleY = tween.getValue();

        if (cursors.up.isDown) {
            player.body.setVelocityY(-100);
            console.log(down);
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(100);
            console.log(down);
        } else if (cursors.right.isDown) {
            player.body.setVelocityY(0);
            player.body.setVelocityX(100);
        } else if (cursors.left.isDown) {
            player.body.setVelocityY(0);
            player.body.setVelocityX(-100);
        }

        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            this.addLaser();
            this.removeLife();
            this.nextWave();
        }
    }

    addLaser() {
        lasers = this.physics.add.sprite(player.x + 100, player.y, 'laser1');
        lasers.setVelocityX(500);
        console.log(player)
        
    }

    removeLife() {
        lifecount -= 1;
    }

    addWave(wave) {
        for(let x=0; x<= wave; x++) {
            enemies.push(this.physics.add.sprite(width - 50, Phaser.Math.Between(150, height), 'enemy').setScale(.5, .5));
            enemies.push(this.physics.add.sprite(width - 50, Phaser.Math.Between(150, height), 'enemy').setScale(.5, .5));
            enemies.push(this.physics.add.sprite(width - 50, Phaser.Math.Between(150, height), 'enemy').setScale(.5, .5));
        }

        enemies.forEach(enemy => {
            enemy.setVelocityX(-(wave * Phaser.Math.Between(50, 200)));
        })
    }

    nextWave(wave) {
        let nextWave = wave + 1;
        this.addWave(2);
        wave+=1;
    }
}



var textStyle = {
        font: "normal 24px Arial",
        fill: '#ffffff',
        align: 'center',
        boundsAlignH: "center", // bounds center align horizontally
        boundsAlignV: "middle" // bounds center align vertically
    }

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    parent: 'canvas-container',
    // scene: [ GameScene ]
    scene: GameScene
};

const game = new Phaser.Game(config);

let cursors;
let player;



// function create ()
// {
//     // this.add.image(400, 300, 'sky');
//     // this.add.image(400, 80, 'logo')

//     // var particles = this.add.particles('blue');
//     // var particles2 = this.add.particles('greenorb');

//     // var emitter = particles.createEmitter({
//     //     speed: 100,
//     //     scale: { start: 1, end: 0 },
//     //     blendMode: 'ADD'
//     // });

//     // var emitter2 = particles2.createEmitter({
//     //     speed: 100,
//     //     scale: {start: 1, end: 0},
//     //     blendMode: 'ADD'
//     // })

//     // var textStyle = {
//     //     font: "normal 24px Arial",
//     //     fill: '#ffffff',
//     //     align: 'center',
//     //     boundsAlignH: "center", // bounds center align horizontally
//     //     boundsAlignV: "middle" // bounds center align vertically
//     // }
    
    
//     // this.devButton = this.add.text(600, 200, 'About the Developer!');

//     // this.playBtn = this.add.sprite(300, 200, 'button').setScale(.25, .25);
//     // this.playButton = this.add.text(275, 175, 'PLAY!', textStyle);

//     // this.devButton.setInteractive();
//     // this.playBtn.setInteractive();

//     // this.playBtn.on('pointerup', () => {
//     //     console.log("Start Game!")
//     //     startGame(this);
//     // });

//     // this.playBtn.on('pointerover', () => {
//     //     console.log("hover");
//     // })

//     // // this.playButtonBox.on('pointerup', () => console.log("Start Game!"))
//     // // this.playButtonBox.on('pointerover', () => {
//     // //     console.log("hover");
//     // //     this.hoverState(playButtonBox);
//     // // })

//     // var Rick = this.physics.add.image(500, 100, 'rick');
//     // var Rick2 = this.physics.add.image(300, 100, 'rickraygun').setScale(.25, .25);
//     // var Morty = this.physics.add.image(100, 50, 'morty').setScale(.5, .5);

//     // Morty.setBounce(1, .8);

    
//     // Morty.setCollideWorldBounds(true);

//     // Rick.setBounce(1, .5);
//     // Rick.setCollideWorldBounds(true);
//     // Rick2.setBounce(1, .7);
//     // Rick2.setCollideWorldBounds(true);

//     // emitter2.startFollow(Rick);
//     // emitter.startFollow(Morty);
// }


