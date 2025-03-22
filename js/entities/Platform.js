class Platform {
    constructor(scene, x, y, width) {
        this.scene = scene;
        
        // Choose the appropriate platform image based on width
        const imageKey = width && width > 200 ? 'platform' : 'platform-small';
        
        // Create sprite
        this.sprite = scene.physics.add.staticImage(x, y, imageKey);
    }
}