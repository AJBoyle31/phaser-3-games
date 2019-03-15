class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type){
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
    explode(canDestroy){
        if (!this.getData("isDead")){
            //Set the texture to the explosion image, then play the animation
            this.setTexture('sprExplosion'); //this refers to the same animation key we used when we added this.aninms.create
            this.play('sprExplosion'); //play the animation
            
            //pick a random explosion sound within the array we defined in this.sfx 
            this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length -1)].play();
            
            if (this.shootTimer !== undefined){
                if (this.shootTimer){
                    this.shootTimer.remove(false);
                }
            }
            
            this.setAngle();
            this.body.setVelocity(0, 0);
            
            this.on('animationcomplete', () => {
                if (canDestroy) {
                    this.destroy();
                }
                else {
                    this.setVisible(false);
                }
            });
            this.setData("isDead", true);
        }
    }
}

export class Player extends Entity {
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'Player');
        this.setData("speed", 200);
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    }
    
    moveUp(){
        this.body.velocity.y = -this.getData('speed');
    }
    
    moveDown(){
        this.body.velocity.y = this.getData('speed');
    }
    
    moveLeft(){
        this.body.velocity.x = -this.getData('speed');
    }
    
    moveRight(){
        this.body.velocity.x = this.getData('speed');
    }
    
    update(){
        this.body.setVelocity(0, 0);
        
        //ensures the player cannot move off-screen
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
        
        if (this.getData("isShooting")){
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")){
                this.setData("timerShootTick", this.getData("timerShootTick") + 1); //every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { //when the "manual timer" is triggered
                var laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);
                
                this.scene.sfx.laser.play(); //laser sound effect
                this.setData("timerShootTick", 0);
            }
        }
    }
}

export class PlayerLaser extends Entity {
    constructor(scene, x, y){
        super(scene, x, y, 'sprLaserPlayer');
        this.body.velocity.y = -200;
    }
}

export class EnemyLaser extends Entity {
    constructor(scene, x, y){
        super(scene, x, y, 'sprLaserEnemy0');
        this.body.velocity.y = 200;
    }
    
    onDestroy(){
        
    }
}

export class ChaserShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'sprEnemy1', 'ChaserShip');
        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.states = {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        };
        this.state = this.states.MOVE_DOWN;
    }
    
    update(){
        //if the enemy ship and player are alive
        if (!this.getData("isDead") && this.scene.player){
            //if the distance between the enemy and player is less than 320
            if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y ) < 320){
                //set the state to CHASE
                this.state = this.states.CHASE;
            }
        }
        
        //if the state is CHASE
        if (this.state == this.states.CHASE){
            //calculate the distance from enemy to player in x and y
            var dx = this.scene.player.x - this.x;
            var dy = this.scene.player.y - this.y;
            
            //returns the angle in the plane between player and enemy
            var angle = Math.atan2(dy, dx);
            
            var speed = 100;
            //changes the enemy's velocity to follow the player
            this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
            
            //rotates the chaser ship
            if (this.x < this.scene.player.x){
                this.angle -= 5;
            } else {
                this.angle += 5;
            }
        }
    }
}

export class GunShip extends Entity {
    constructor(scene, x, y){
        super(scene, x, y, 'sprEnemy0', 'GunShip');
        this.play('sprEnemy0');
        this.body.velocity.y = Phaser.Math.Between(50, 100);
        
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function(){
                var laser = new EnemyLaser(this.scene, this.x, this.y);
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }
    
    //destroys the shoot timer when the enemy is destroyed
    onDestroy(){
        if (this.shootTimer !== undefined){
            if (this.shootTimer){
                this.shootTimer.remove(false);
            }
        }
    }
}

export class CarrierShip extends Entity {
    constructor(scene, x, y){
        super(scene, x, y, 'sprEnemy2', 'CarrierShip');
        this.play('sprEnemy2');
        this.body.velocity.y = Phaser.Math.Between(50, 100);
    }
}

export class ScrollingBackground {
    constructor(scene, key, velocityY){
        this.scene = scene;
        this.key = key;
        this.velocityY = velocityY;
        this.layers = this.scene.add.group();
        this.createLayers();
    }
    createLayers(){
        for (var i = 0; i < 2; i++){
            //creating two backgrounds will allow a continuous scroll
            var layer = this.scene.add.sprite(0, 0, this.key);
            layer.y = (layer.displayHeight * i);
            var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
            var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
            layer.setScale(flipX * 2, flipY * 2);
            layer.setDepth(-5 - (i-1));
            this.scene.physics.world.enableBody(layer, 0);
            layer.body.velocity.y = this.velocityY;
            
            this.layers.add(layer);
        }
    }
    update(){
        //allow the background layers to wrap back around to the bottom.
        //without this the backgrounds will just move off screen and there would only be a black background
        if (this.layers.getChildren()[0].y > 0){
            for (var i = 0; i < this.layers.getChildren().length; i++){
                var layer = this.layers.getChildren()[i];
                layer.y = (-layer.displayHeight) + (layer.displayHeight * i);
            }
        }
    }
}