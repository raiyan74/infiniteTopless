class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load initial loading screen assets
        this.load.image('loading-background', 'assets/images/loading-background.png');
        this.load.image('loading-bar', 'assets/images/loading-bar.png');
    }

    create() {
        // Configure game settings here
        this.scene.start('PreloadScene');
    }
}