import {Player, EnemyLaser, ChaserShip, GunShip, CarrierShip, ScrollingBackground} from '../sprites/entities.js';

class SpaceShooter extends Phaser.Scene {
    constructor(){
        super({
            key: 'SpaceShooter'
        });
    }
    
    preload(){
        this.sfx = {
            explosions: [
                this.sound.add('sndExplode0'),
                this.sound.add('sndExplode1')
            ],
            laser: this.sound.add('sndLaser')
        };
    }
    
    create(){
        this.backgrounds = [];
        for (var i = 0; i < 5; i++){
            var bg = new ScrollingBackground(this, 'sprBg0', i * 10);
            this.backgrounds.push(bg);
        }
        
        //The Player
        this.player = new Player (this, this.game.config.width * 0.5, this.game.config.height * 0.5, 'sprPlayer');
        
        //Control Variables
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        
        //timer that spawns one of three enemies
        this.time.addEvent({
            delay: 1000,
            callback: function(){
                var enemy = null;
                
                if (Phaser.Math.Between(0, 10) >= 3){
                    enemy = new GunShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                }
                else if (Phaser.Math.Between(0, 10) >= 5){
                    if (this.getEnemiesByType("ChaserShip").length < 5){
                        enemy = new ChaserShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                    }
                } 
                else {
                    enemy = new CarrierShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                }
                
                if (enemy !== null){
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });
        
        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy){
            if (enemy){
                if (enemy.onDestroy !== undefined){
                    enemy.onDestroy();
                }
                enemy.explode(true);
                playerLaser.destroy();
            }
        });
        
        this.physics.add.overlap(this.player, this.enemies, function(player, enemy){
            if (!player.getData('isDead') && !enemy.getData('isDead')){
                player.explode(false);
                enemy.explode(true);
            }
        });
        
        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser){
            if (!player.getData('isDead') && !laser.getData('isDead')){
                player.explode(false);
                laser.destroy();
            }
        });
    }
    
    update(){
        for (var i = 0; i < this.backgrounds.length; i++){
            this.backgrounds[i].update();
        }
        
        if(!this.player.getData('isDead')){
            this.player.update();
            
            if (this.keyW.isDown){
                this.player.moveUp();
            }
            else if (this.keyS.isDown){
                this.player.moveDown();
            }
            
            if (this.keyA.isDown){
                this.player.moveLeft();
            }
            else if (this.keyD.isDown){
                this.player.moveRight();
            }
            
            if (this.keySpace.isDown){
                this.player.setData("isShooting", true);
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }    
        
        //call the update funtion for each of the enemies
        for (var i = 0; i < this.enemies.getChildren().length; i++){
            var enemy = this.enemies.getChildren()[i];
            if (enemy.x < -enemy.displayWidth || enemy.x > this.game.config.width + enemy.displayWidth || enemy.y < -enemy.displayHeight * 4 || enemy.y > this.game.config.height + enemy.displayHeight){
                if (enemy){
                    if (enemy.onDestroy !== undefined){
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
            enemy.update();
        }
        
        //call the update function for each of the enemy lasers
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth || laser.x > this.game.config.width + laser.displayWidth || laser.y < -laser.displayHeight * 4 || laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        
        //call the update function for each of the player lasers
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
          var laser = this.playerLasers.getChildren()[i];
          laser.update();
          if (laser.x < -laser.displayWidth || laser.x > this.game.config.width + laser.displayWidth || laser.y < -laser.displayHeight * 4 || laser.y > this.game.config.height + laser.displayHeight) {
            if (laser) {
              laser.destroy();
            }
          }
        }
    }
    
    //provide an enemy type and get all the enemies in the enemies group
    //loops through the enemies group and checks if the type of the enemy in the loop is equal to the type given
    getEnemiesByType(type){
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++){
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type){
                arr.push(enemy);
            }
        }
        return arr;
    }
}

export default SpaceShooter;