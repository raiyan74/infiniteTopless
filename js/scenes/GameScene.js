class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Set up world bounds
        this.physics.world.bounds.width = 3200;
        this.physics.world.bounds.height = 600;
        
        // Add background
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(0.1);
        
        // Create level from tilemap
        this.createLevel();
        
        // Create player
        this.player = new Player(this, 100, 450);
        
        // Create collectibles
        this.collectibles = this.physics.add.group();
        this.createCollectibles();
        
        // Create enemies
        this.enemies = this.physics.add.group();
        this.createEnemies();
        
        // Set up collisions
        this.setupCollisions();
        
        // Add score display
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0);
        
        // Set up camera to follow player
        this.cameras.main.setBounds(0, 0, 3200, 600);
        this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);
    }
    
    update() {
        // Update player
        this.player.update();
        
        // Update enemies
        this.enemies.getChildren().forEach(enemy => {
            enemy.update();
        });
    }
    
    createLevel() {
        // Create platforms from tilemap
        this.map = this.make.tilemap({ key: 'level-1' });
        const tileset = this.map.addTilesetImage('tileset', 'tiles');
        
        // Create layers
        this.backgroundLayer = this.map.createLayer('Background', tileset, 0, 0);
        this.platformLayer = this.map.createLayer('Platforms', tileset, 0, 0);
        
        // Set collision on platforms
        this.platformLayer.setCollisionByProperty({ collides: true });
    }
    
    createCollectibles() {
        // Create collectibles from object layer in tilemap
        const collectibleObjects = this.map.getObjectLayer('Collectibles').objects;
        
        collectibleObjects.forEach(collectibleObject => {
            const collectible = new Collectible(
                this,
                collectibleObject.x,
                collectibleObject.y
            );
            this.collectibles.add(collectible.sprite);
        });
    }
    
    createEnemies() {
        // Create enemies from object layer in tilemap
        const enemyObjects = this.map.getObjectLayer('Enemies').objects;
        
        enemyObjects.forEach(enemyObject => {
            const enemy = new Enemy(
                this,
                enemyObject.x,
                enemyObject.y,
                enemyObject.properties.find(prop => prop.name === 'patrolDistance').value
            );
            this.enemies.add(enemy.sprite);
        });
    }
    
    setupCollisions() {
        // Player and platforms
        this.physics.add.collider(this.player.sprite, this.platformLayer);
        
        // Collectibles and platforms
        this.physics.add.collider(this.collectibles, this.platformLayer);
        
        // Enemies and platforms
        this.physics.add.collider(this.enemies, this.platformLayer);
        
        // Player and collectibles
        this.physics.add.overlap(
            this.player.sprite,
            this.collectibles,
            this.collectCollectible,
            null,
            this
        );
        
        // Player and enemies
        this.physics.add.overlap(
            this.player.sprite,
            this.enemies,
            this.hitEnemy,
            null,
            this
        );
    }
    
    collectCollectible(playerSprite, collectibleSprite) {
        collectibleSprite.disableBody(true, true);
        this.sound.play('collect');
        
        // Increase score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }
    
    hitEnemy(playerSprite, enemySprite) {
        // Check if player is jumping on top of enemy
        if (playerSprite.body.velocity.y > 0 && playerSprite.y < enemySprite.y - 20) {
            enemySprite.disableBody(true, true);
            this.sound.play('jump');
            playerSprite.body.velocity.y = -400;
        } else {
            // Player hit enemy from the side or bottom
            this.sound.play('hurt');
            
            // Reset player position
            this.player.takeDamage();
        }
    }
}