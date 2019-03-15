import Cat from '../sprites/cat.js';

class CatFighter extends Phaser.Scene {
    constructor(){
        super({
            key: 'CatFighter'
        });
    }
    
    preload(){
        
    }
    
    create(){
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        
        this.cat = new Cat(this, 100, 400, 'cat');
        
        
    
        this.physics.add.collider(this.cat, this.platforms);
    }
    
    update(){
        
        
        this.cat.update();
        
    }
    /*
    catLanding(){
        this.airborne = false;
        this.cat.anims.play('catLand', true);
        console.log(this.airborne);
    }
    */
}

export default CatFighter;