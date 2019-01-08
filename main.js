// import Title from './scenes/TitleScreen';
// import GameScene from './scenes/GameScene';

let tween;
let background;
let iter = 0;
let spaceKey;
let lasers;
let gameOver = false;
let enemies;
let lives = 3;
let wave = 1;
let score = 0;
let life1;
let life2;
let life3;
let laser;
let newScore = 0;
let nextWave = 1;
let scoreDisplay;
let waveDisplay;

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

        this.load.audio('gameMusic', 'assets/gameMusic.mp3')
    }

    create() {
         
        this.sound.play('gameMusic', {
            mute: false,
            volume: 5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        background = this.add.tileSprite(width/2, height/2, width, height, 'background');
        player = this.physics.add.sprite(100, 100, 'player').setScale(.1, .1);
        this.add.image(width/2, 50, 'logo').setScale(.5, .5);
        this.add.text(width-300, 50, `Lives:`, textStyle);
        life1 = this.add.sprite(width-200, 50, 'lives').setScale(.1, .1);
        life2 = this.add.sprite(width-150, 50, 'lives').setScale(.1, .1);
        life3 = this.add.sprite(width-100, 50, 'lives').setScale(.1, .1);
        scoreDisplay = this.add.text(20, 40, `Score: ${score}`);
        waveDisplay = this.add.text(20, 20, `Wave: ${wave}`);

        
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
        lasers = this.physics.add.group();
        enemies = this.physics.add.group();

        this.physics.add.overlap(lasers, enemies, this.killRick, null, this);
        this.physics.add.overlap(player, enemies, this.loseLife, null, this);

        this.addWave(wave);

        
    }

    update() {

        
        if (newScore != score) {
            score = newScore;
            scoreDisplay.destroy();
            scoreDisplay = this.add.text(20, 40, `Score: ${score}`);
        }

        if (nextWave != wave) {
            wave = nextWave;
            waveDisplay.destroy();
            waveDisplay = this.add.text(20, 20, `Wave: ${wave}`);
        }

        if (lives < 3 && life3.active) {
            life3.destroy();
        } else if (lives < 2 && life2.active) {
            life2.destroy();
        } else if (lives < 1 && life1.active) {
            life1.destroy();
            gameOver = true;
        }

        // background.tilePositionX = Math.cos(iter) * 700;
        // background.tilePositionY = Math.sin(iter) * 500;
        // background.tileScaleX = tween.getValue();
        // background.tileScaleY = tween.getValue();

        if (cursors.up.isDown) {
            player.body.setVelocityY(-200);
            console.log("down");
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(200);
            console.log("down");
        } else if (cursors.right.isDown) {
            player.body.setVelocityY(0);
            player.body.setVelocityX(200);
        } else if (cursors.left.isDown) {
            player.body.setVelocityY(0);
            player.body.setVelocityX(-200);
        }

        if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
            this.addLaser();
            this.nextWaveStart();
        }        
    }

    addLaser() {    
        laser = lasers.create(player.x + 100, player.y, 'laser1');
        laser.setVelocityX(500);  
    }

    addWave(wave) {
        for(let x=0; x<= wave; x++) {
            enemies.create(width - 50, Phaser.Math.Between(150, height), 'enemy').setScale(.5, .5).setVelocityX(-(wave * Phaser.Math.Between(100,500)));
            enemies.create(width - 50, Phaser.Math.Between(150, height), 'enemy').setScale(.5, .5).setVelocityX(-(wave * Phaser.Math.Between(100,500)));
            enemies.create(width - 50, Phaser.Math.Between(150, height), 'enemy').setScale(.5, .5).setVelocityX(-(wave * Phaser.Math.Between(100,500)));
        }
    }

    nextWaveStart(wave) {
        nextWave++;
        this.addWave(3);
    }

    killRick(laser, rick) {
        rick.destroy();
        newScore += 10;
    }

    loseLife(player, rick) {
        lives -= 1;
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


