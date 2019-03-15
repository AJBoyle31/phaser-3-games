class Menu extends Phaser.Scene {
    constructor(){
        super({ key: 'Menu', active: false });
    }
    
    preload () {
        //SPACESHOOTER GAME BUTTONS
        this.load.image("sprBtnPlay", "./assets/spaceShooter/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "./assets/spaceShooter/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "./assets/spaceShooter/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "./assets/spaceShooter/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "./assets/spaceShooter/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "./assets/spaceShooter/sprBtnRestartDown.png");
        this.load.audio("sndBtnOver", "./assets/spaceShooter/audio/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "./assets/spaceShooter/audio/sndBtnDown.wav");
    }

    create () {
        
        
        /* 
        *   let textConfigTitle = {fontSize: '48px', fill: '#fff'};
        *   let textConfigSub = {fontSize: '32px', fill: '#fff'};
        *   let starfield = this.add.image(0, 0, 'space').setOrigin(0, 0);
        *   let spaceship = this.add.sprite(400, 200, 'ship').play('move').setOrigin(0.5, 0.5);
        *   let gameTitle = this.add.text(400, 300, 'Spaceship Game', textConfigTitle).setOrigin(0.5, 0.5);
        *   let howToStart = this.add.text(400, 400, 'Click to Start', textConfigSub).setOrigin(0.5, 0.5);
        */
        
       
        
        this.scene.start('CatFighter');
        /*
        this.input.once('pointerdown', function(event){
            
        }, this);
        */
    }
    
}

export default Menu;