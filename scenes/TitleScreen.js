class TitleScreen extends Phaser.Scene {
    constructor() {
        super({key: 'titleScreen'})
    }

    preload() {
        this.load.image('logo', 'assets/rnmlogo.png');
        this.load.image('sky', 'assets/nebula.jpg');
        this.load.image('rick', 'assets/rick.png');
        this.load.image('blue', 'assets/blue-flare.png');
        this.load.image('morty', 'assets/morty.png');
        this.load.image('greenorb', 'assets/greenorb.png');
        this.load.image('button', 'assets/button.png');
        this.load.image('rickraygun', 'assets/rickraygun.png');
    }

    create() {
        let bg = this.add.sprite(0, 0, 'sky');
        bg.setOrigin(0, 0);
    }
}

export default TitleScreen;