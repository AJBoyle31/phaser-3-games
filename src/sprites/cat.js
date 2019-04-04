export class Cat extends Phaser.GameObjects.Container {
    constructor(config){
        
        const cat = config.scene.add.sprite(0, 0, 'cat');
        //const attackArea = new Phaser.Geom.Circle(0, 0, 60);
        //const attackB = config.scene.add.sprite(0, 0, null);
        
        super(config.scene, config.x, config.y, [cat]);
        
        this.setSize(12, 26);
        
        config.scene.add.container(this);
        //this.setInteractive(new Phaser.Geom.Circle(this.x, this.y, 10), Phaser.Geom.Circle.Contains);
        
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        
        this.graphics = config.graphics;
        
        //Config
        this.alive = true;
        this.speed = 75;
        this.jumpSpeed = -330;
        this.setScale(2);
        this.cat = cat;
        //this.body.setSize(12, 26);
        this.body.setOffset(-1, 9);
        //this.attackArea = attackB;
        
        //player animation checkers
        this.movement = true;
        this.jumping = false;
        this.attacking = false;
        
        //controls
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyT = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyG = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyV = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
        
        
    }
    
    
    update(time, delta){
        
        if (!this.alive){
            return;
        }
        
        this.on('pointerover', function(){
                this.cat.setTint(0x44ff44);    
        });
        
        //Cat facing direction and physics body
        if (this.cat.flipX){
            this.body.setOffset(1, 9);
        } else {
            this.body.setOffset(-1, 9);
        }
        
        //Animations Controller
        if (this.movement){
            if (!this.body.touching.down){
                this.jumping = true;
                this.startNewAnim('Jump');    
            }
            else if (this.body.velocity.x !== 0 && this.body.touching.down){
                this.jumping = false;
                this.startNewAnim('Walk');
            }
            
            else if (this.body.velocity.x === 0 && this.body.touching.down){
                this.jumping = false;
                this.startNewAnim('Idle');
            } 
            
        }
        
        //Tells me what animation is playing
        //console.log(this.anims.getProgress());
        
        
        if (this.movement){
            if (this.cursors.left.isDown){
                this.body.setVelocityX(-this.speed);
                this.cat.flipX = true;    
            }
            else if (this.cursors.right.isDown){
                this.body.setVelocityX(this.speed);
                this.cat.flipX = false;    
            } 
            else {
                this.idle();    
            }
        }
        
        if (this.cursors.up.isDown && !this.attacking && this.body.touching.down){
            this.jump();    
        }
        
        if (this.keyQ.isDown){
            this.attackMove('Powershot');
        }
        if (this.keyW.isDown){
            this.attackMove('Fastshot');
        }
        if (this.keyE.isDown){
            this.attackMove('Uppercut');
        }
        if (this.keyA.isDown){
            this.attackMove('Roundkick');
        }
        if (this.keyS.isDown){
            this.attackMove('Flyingkick');
        }
        if (this.keyD.isDown){
            this.attackMove('Midkick');
        }
        if (this.keyZ.isDown){
            this.attackMove('Spin');
        }
        if (this.keyX.isDown){
            this.attackMove('Combo');
        }
        if (this.keyC.isDown){
            this.attackMove('Twoside');
        }
        
        
        /*
        if (this.keyV.isDown){
            this.attackMove('Roundkick');
        }
        if (this.keyT.isDown){
            this.attackMove('Punch');
        }
        if (this.keyD.isDown){
            this.attackMove('Lowkick');
        }
        if (this.keyZ.isDown){
            this.attackMove('Highkick');
        }
        if (this.keyX.isDown){
            this.attackMove('Downkick');
        }
        */
        
        //catFlyingkick forward motion
        if (this.cat.anims.getCurrentKey() == 'catFlyingkick' && this.cat.anims.getProgress() > 0.5){
            this.body.setVelocityX(this.cat.flipX ? -this.speed : this.speed);
        }
        
        //catUppercut jump
        if (this.cat.anims.getCurrentKey() == 'catUppercut' && this.cat.anims.getProgress() > 0.4 && this.body.touching.down){
            this.body.setVelocityY(-140);
            //this.anims.pause();
        }
        
        //catSpin forward motion
        if (this.cat.anims.getCurrentKey() == 'catSpin' && this.cat.anims.getProgress() > 0.3){
            this.body.setVelocityX(this.flipX ? -this.speed : this.speed);
        }
        if (this.cat.anims.getCurrentKey() == 'catSpin' && this.cat.anims.getProgress() > 0.85){
            this.body.setVelocityX(0);
        }
        
        
        
    }
    //END UPDATE
    
    idle(){
        this.body.setVelocityX(0);
    }
    
    jump(){
        this.body.setVelocityY(this.jumpSpeed);
    }
    
    attackMove(key){
        if(!this.attacking && !this.jumping){
            this.body.setVelocityX(0);
            this.movement = false;
            this.attacking = true;
            this.idle();
            this.startNewAnim(key);    
        } else {
            return;
        }
        
    }
    
    startNewAnim(key){
        
        switch(key){
            case 'Idle':
                this.cat.play('catIdle', true);
                break;
            case 'Walk':
                this.cat.play('catWalk', true);
                break;
            case 'Jump':
                this.cat.play('catAir', true);
                break;
            case 'Powershot':
                this.cat.play('catPowershot', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Fastshot':
                this.cat.play('catFastshot', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Flyingkick':
                this.cat.play('catFlyingkick', true);
                this.setInteractive(new Phaser.Geom.Circle(this.cat.x, this.cat.y, 30), Phaser.Geom.Circle.Contains);
            
                //  Just to display the hit area, not actually needed to work
                this.graphics.lineStyle(2, 0x00ffff, 1);
                this.graphics.strokeCircle(this.input.hitArea.x, this.input.hitArea.y, this.input.hitArea.radius);
            
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                    this.removeInteractive();
                    this.cat.clearTint();
                });
                break;
            case 'Spin':
                this.cat.play('catSpin', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Uppercut':
                this.cat.play('catUppercut', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;    
                    this.attacking = false;
                });
                break;
            case 'Combo':
                this.cat.play('catCombo', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;    
                    this.attacking = false;
                });
                break;
            case 'Lowkick':
                this.cat.play('catLowkick', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Midkick':
                this.cat.play('catMidkick', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Highkick':
                this.cat.play('catHighkick', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;  
                    this.attacking = false;
                });
                break;
            case 'Downkick':
                this.cat.play('catDownkick', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;  
                    this.attacking = false;
                });
                break;
            case 'Twoside':
                this.cat.play('catTwoside', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;  
                    this.attacking = false;
                });
                break;
            case 'Roundkick':
                this.cat.play('catRoundkick', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Punch':
                this.cat.play('catPunch', true);
                this.cat.on('animationcomplete-cat' + key, () => {
                    this.movement = true;    
                    this.attacking = false;
                });
                break;
        }
        
    }
    

}

/*
class CatFireball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'catFireball');
        this.body.setVelocityX(200);
    }    
}
*/