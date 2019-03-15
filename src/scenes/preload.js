class Preload extends Phaser.Scene {
    constructor(){
        super({ key: 'Preload', active: false });
    }
    
    preload(){
        //Menu
        this.load.image('logo', './assets/phaserLogos/logo.png');
        
        //Dude Tutorial
        this.load.image('sky', './assets/dudeGame/sky.png');
        this.load.image('ground', './assets/dudeGame/platform.png');
        this.load.image('star', './assets/dudeGame/star.png');
        this.load.image('bomb', './assets/dudeGame/bomb.png');
        this.load.spritesheet('dude', './assets/dudeGame/dude.png', {frameWidth: 32, frameHeight: 48});
        
        //Spaceship Game
        this.load.image('space', './assets/spaceshipGame/space-background.jpg');
        this.load.spritesheet('shot', './assets/spaceshipGame/shot-85x50.png', {frameWidth: 85, frameHeight: 50});
        this.load.spritesheet('asteroid', './assets/spaceshipGame/asteroid-131x124.png', {frameWidth: 131, frameHeight: 124});
        this.load.atlas('ship', './assets/spaceshipGame/spaceship.png', './assets/spaceshipGame/spaceship.json');    
        
        //CatFighter Game
        this.load.atlas('cat', './assets/catFighter/catFighterSpritesheet.png', './assets/catFighter/catfightersprites.json');
        
        //spaceShooter Game
        this.load.image('sprBg0', './assets/spaceShooter/sprBg0.png');
        this.load.image('sprBg1', './assets/spaceShooter/sprBg1.png');
        this.load.spritesheet('sprExplosion', './assets/spaceShooter/sprExplosion.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('sprEnemy0', './assets/spaceShooter/sprEnemy0.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('sprEnemy1', './assets/spaceShooter/sprEnemy1.png');
        this.load.spritesheet('sprEnemy2', './assets/spaceShooter/sprEnemy2.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('sprLaserEnemy0', './assets/spaceShooter/sprLaserEnemy0.png');
        this.load.image('sprLaserPlayer', './assets/spaceShooter/sprLaserPlayer.png');
        this.load.spritesheet('sprPlayer', './assets/spaceShooter/sprPlayer.png', {frameWidth: 16, frameHeight: 16});
        this.load.audio('sndExplode0', './assets/spaceShooter/audio/sndExplode0.wav');
        this.load.audio('sndExplode1', './assets/spaceShooter/audio/sndExplode1.wav');
        this.load.audio('sndLaser', './assets/spaceShooter/audio/sndLaser.wav');
    }
    
    create(){
        
        //DUDE ANIMATIONS
        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
        });
        
        this.anims.create({
          key: 'turn',
          frames: [{ key: 'dude', frame: 4 }],
          frameRate: 20
        });
        
        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
          frameRate: 10,
          repeat: -1
        });
        
        //SHOT ANIMATION
        this.anims.create({
            key: 'pulse',
            frames: this.anims.generateFrameNumbers('shot', {start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        
        //ASTEROID ANIMATION
        this.anims.create({
            key: 'asteroidExplosion',
            frames: this.anims.generateFrameNumbers('asteroid', {start: 1, end: 4}),
            frameRate: 30
        });
        
        //SPACESHIP ANIMATIONS
        this.anims.create({ 
            key: 'move', 
            frames: this.anims.generateFrameNames('ship', {prefix: 'move', end: 2 }), 
            frameRate: 9, 
            repeat: -1 
        });
        
        this.anims.create({ 
            key: 'shipExplode', 
            frames: this.anims.generateFrameNames('ship', {prefix: 'exp', end: 5}), 
            frameRate: 30, 
            hideOnComplete: true
        });
        
        //SPACESHOOTER ANIMATIONS
        this.anims.create({
            key: 'sprEnemy0',
            frames: this.anims.generateFrameNumbers('sprEnemy0'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'sprEnemy2',
            frames: this.anims.generateFrameNumbers('sprEnemy2'),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: 'sprExplosion',
            frames: this.anims.generateFrameNumbers('sprExplosion'),
            frameRate: 20,
            repeat: 0
        });
        
        this.anims.create({
            key: 'sprPlayer',
            frames: this.anims.generateFrameNumbers('sprPlayer'),
            frameRate: 20,
            repeat: -1
        });
        
        //CAT FIGHTER
        this.anims.create({
            key: 'catIdle',
            frames: this.anims.generateFrameNames('cat', {prefix: 'idle', end: 5}),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'catWalk',
            frames: this.anims.generateFrameNames('cat', {prefix: 'walk', end: 9}),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'catJump',
            frames: this.anims.generateFrameNames('cat', {prefix: 'jumpup', end: 3}),
            frameRate: 7,
        });
        
        this.anims.create({
            key: 'catAir',
            frames: this.anims.generateFrameNames('cat', {prefix: 'inair', end: 3}),
            frameRate: 7,
            repeat: -1
        });
        
        this.anims.create({
            key: 'catLand',
            frames: this.anims.generateFrameNames('cat', {prefix: 'jumpdown', end: 5}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catPowershot',
            frames: this.anims.generateFrameNames('cat', {prefix: 'powershot', end: 8}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catFastshot', 
            frames: this.anims.generateFrameNames('cat', {prefix: 'fastshot', end: 6}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catFlyingkick',
            frames: this.anims.generateFrameNames('cat', {prefix: 'flyingkick', end: 8}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catSpin',
            frames: this.anims.generateFrameNames('cat', {prefix: 'spin', zeropad: 2, start: 1, end: 11}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catUppercut',
            frames: this.anims.generateFrameNames('cat', {prefix: 'uppercut', zeropad: 2, start: 1, end: 13}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catCombo',
            frames: this.anims.generateFrameNames('cat', {prefix: 'combo', zeropad: 2, end: 11}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catLowkick',
            frames: this.anims.generateFrameNames('cat', {prefix: 'lowkick', end: 6}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catMidkick',
            frames: this.anims.generateFrameNames('cat', {prefix: 'midkick', end: 6}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catHighkick',
            frames: this.anims.generateFrameNames('cat', {prefix: 'highkick', end: 6}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catDownkick',
            frames: this.anims.generateFrameNames('cat', {prefix: 'downkick', end: 8}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catTwoside',
            frames: this.anims.generateFrameNames('cat', {prefix: 'twoside', end: 8}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catRoundkick',
            frames: this.anims.generateFrameNames('cat', {prefix: 'roundkick', end: 8}),
            frameRate: 7
        });
        
        this.anims.create({
            key: 'catPunch',
            frames: this.anims.generateFrameNames('cat', {prefix: 'punch', end: 6}),
            frameRate: 7
        });
        
        this.scene.start('Menu');
    }
}

export default Preload;