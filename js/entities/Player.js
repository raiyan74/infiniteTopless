class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        
        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);
        
        // Track player state
        this.health = 3;
        this.isJumping = false;
        this.isDamaged = false;
        
        // Set up input
        this.cursors = scene.input.keyboard.createCursorKeys();
    }
    
    update() {
        const onGround = this.sprite.body.blocked.down;
        
        // Reset jumping state when landing
        if (onGround && this.isJumping) {
            this.isJumping = false;
        }
        
        // Handle left/right movement
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-200);
            this.sprite.flipX = true;
            
            if (onGround && !this.isDamaged) {
                this.sprite.anims.play('player-run', true);
            }
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(200);
            this.sprite.flipX = false;
            
            if (onGround && !this.isDamaged) {
                this.sprite.anims.play('player-run', true);
            }
        } else {
            this.sprite.setVelocityX(0);
            
            if (onGround && !this.isDamaged) {
                this.sprite.anims.play('player-idle', true);
            }
        }
        
        // Handle jumping
        if (this.cursors.space.isDown && onGround) {
            this.jump();
        }
    }
    
    jump() {
        this.sprite.setVelocityY(-500);
        this.isJumping = true;
        this.sprite.anims.play('player-jump');
        this.scene.sound.play('jump');
    }
    
    takeDamage() {
        if (this.isDamaged) return;
        
        this.health--;
        this.isDamaged = true;
        
        // Flash player to indicate damage
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0.5,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.isDamaged = false;
            }
        });
        
        // Check if player is dead
        if (this.health <= 0) {
            this.die();
        }
    }
    
    die() {
        this.sprite.setTint(0xff0000);
        this.sprite.anims.play('player-idle');
        
        // Game over after a short delay
        this.scene.time.delayedCall(1000, () => {
            this.scene.scene.restart();
        });
    }
}