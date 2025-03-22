const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloadScene,
        MainMenuScene,
        GameScene
    ]
};

window.game = new Phaser.Game(config);