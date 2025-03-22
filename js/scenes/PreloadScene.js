class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Create loading bar
        const loadingBar = this.add.image(400, 300, 'loading-bar');
        
        // Display loading progress
        this.load.on('progress', (value) => {
            loadingBar.setScale(value, 1);
        });
        
        // Load game assets
        this.load.image('background', 'assets/images/background.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('platform-small', 'assets/images/platform-small.png');
        this.load.image('collectible', 'assets/images/collectible.png');
        
        // Load sprite sheets
        this.load.spritesheet('player', 
            'assets/spritesheets/player.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        
        this.load.spritesheet('enemy', 
            'assets/spritesheets/enemy.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        
        // Load audio
        this.load.audio('jump', 'assets/audio/jump.wav');
        this.load.audio('collect', 'assets/audio/collect.wav');
        this.load.audio('hurt', 'assets/audio/hurt.wav');
        this.load.audio('music', 'assets/audio/background-music.mp3');
        
        // Load level data
        this.load.tilemapTiledJSON('level-1', 'assets/levels/level-1.json');
        this.load.image('tiles', 'assets/tilesets/tileset.png');
    }

    create() {
        // Create animations
        this.createAnimations();
        
        // Start the main menu scene
        this.scene.start('MainMenuScene');
    }
    
    createAnimations() {
        // Player animations
        this.anims.create({
            key: 'player-idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
        
        this.anims.create({
            key: 'player-run',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        
        this.anims.create({
            key: 'player-jump',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 12 }),
            frameRate: 8,
            repeat: 0
        });
        
        // Enemy animations
        this.anims.create({
            key: 'enemy-move',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }
}