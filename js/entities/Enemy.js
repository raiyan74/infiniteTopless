class Enemy {
    constructor(scene, x, y, patrolDistance) {
        this.scene = scene;
        this.startX = x;
        this.patrolDistance = patrolDistance || 200;
        
        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setCollideWorldBounds(true);
        
        // Start animation
        this.sprite.anims.play('enemy-move', true);
        
        // Initialize direction
        this.direction = 1; // 1 = right, -1 = left
        this.sprite.setVelocityX(100 * this.direction);
    }
    
    update() {
        // Check if we need to change direction
        if (
            this.sprite.x > this.startX + this.patrolDistance ||
            this.sprite.x < this.startX
        ) {
            this.switchDirection();
        }
        
        // Also check if blocked by wall
        if (this.sprite.body.blocked.right || this.sprite.body.blocked.left) {
            this.switchDirection();
        }
    }
    
    switchDirection() {
        // Flip direction
        this.direction *= -1;
        this.sprite.setVelocityX(100 * this.direction);
        
        // Flip sprite
        this.sprite.flipX = this.direction === -1;
    }
}