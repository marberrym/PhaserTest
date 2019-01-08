import Phaser from 'phaser';

const width = window.innerWidth < 1300 ? 1325: window.innerWidth;
const height = window.innerHeight;

document.querySelector("#canvas-container").style.height = height+'px';

//Game Variables

let player;
let enemies;
let playerLasers;
let enemyLasers;
let powerUp;
let meteors;
let score=0;
let gameOver=false;
let scoreText;
let gameOverText;
let lives=3;
let gameText;
let gameMusic;

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }

    preload() {
        this.load.image('player', 'assets/playerImage.png');
        this.load.image('background', 'assets/nebula.jpg');
        this.load.image('logo', 'rnmlogo.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.physics.add.sprite(0, 0, 'player');
    }
}

export default GameScene;