class Collectible {
    constructor(scene, x, y) {
        this.scene = scene;
        
        // Create sprite
        this.sprite = scene.physics.add.sprite(x, y, 'collectible');
        
        // Add a small bounce effect
        this.sprite.setBounce(0.2);
        
        // Add a bobbing animation
        scene.tweens.add({
            targets: this.sprite,
            y: y - 10,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
}