class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, 'cat', frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this);
        this.body.setCollideWorldBounds(true);
        this.alive = true;
        this.speed = 75;
        this.jumpSpeed = -330;
        this.setScale(2);
        this.body.setSize(12, 26);
        this.body.setOffset(24, 28);
        
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
        
        //Cat facing direction and physics body
        if (this.flipX){
            this.body.setOffset(28, 28);
        } else {
            this.body.setOffset(24, 28);
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
        //console.log(this.anims.getCurrentKey());
        
        //Cat Controller
        
            if (this.cursors.left.isDown){
                if (this.movement){
                    this.body.setVelocityX(-this.speed);
                    this.flipX = true;    
                }
            }
            else if (this.cursors.right.isDown){
                if (this.movement){
                    this.body.setVelocityX(this.speed);
                    this.flipX = false;    
                }
            } 
            else {
                this.idle();
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
            this.attackMove('Flyingkick');
        }
        if (this.keyR.isDown){
            this.attackMove('Spin');
        }
        if (this.keyT.isDown){
            this.attackMove('Punch');
        }
        if (this.keyA.isDown){
            this.attackMove('Uppercut');
        }
        if (this.keyS.isDown){
            this.attackMove('Flyingkick');
        }
        if (this.keyD.isDown){
            this.attackMove('Lowkick');
        }
        if (this.keyF.isDown){
            this.attackMove('Midkick');
        }
        if (this.keyZ.isDown){
            this.attackMove('Highkick');
        }
        if (this.keyX.isDown){
            this.attackMove('Downkick');
        }
        if (this.keyC.isDown){
            this.attackMove('Twoside');
        }
        if (this.keyV.isDown){
            this.attackMove('Roundkick');
        }
    }
    
    idle(){
        this.body.setVelocityX(0);
    }
    
    
    
    jump(){
        this.body.setVelocityY(this.jumpSpeed);
    }
    
    attackMove(key){
        if(!this.attacking && !this.jumping){
            this.movement = false;
            this.attacking = true;
            this.idle();
            this.startNewAnim(key);    
        } else {
            return;
        }
        
    }
    
    startNewAnim(key){
        /*
        if (key != this.anims.getCurrentKey()){
            this.anims.stop();

        }
        */
        switch(key){
            case 'Idle':
                this.play('catIdle', true);
                break;
            case 'Walk':
                this.play('catWalk', true);
                break;
            case 'Jump':
                this.play('catAir', true);
                break;
            case 'Powershot':
                this.play('catPowershot', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Fastshot':
                this.play('catFastshot', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Flyingkick':
                this.play('catFlyingkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;
                    this.attacking = false;
                });
                break;
            case 'Spin':
                this.play('catSpin', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Uppercut':
                this.play('catUppercut', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;    
                    this.attacking = false;
                });
                break;
            case 'Combo':
                this.play('catCombo', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;    
                    this.attacking = false;
                });
                break;
            case 'Lowkick':
                this.play('catLowkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Midkick':
                this.play('catMidkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Highkick':
                this.play('catHighkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;  
                    this.attacking = false;
                });
                break;
            case 'Downkick':
                this.play('catDownkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;  
                    this.attacking = false;
                });
                break;
            case 'Twoside':
                this.play('catTwoside', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;  
                    this.attacking = false;
                });
                break;
            case 'Roundkick':
                this.play('catRoundkick', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;   
                    this.attacking = false;
                });
                break;
            case 'Punch':
                this.play('catPunch', true);
                this.on('animationcomplete-cat' + key, () => {
                    this.movement = true;    
                    this.attacking = false;
                });
                break;
        }
        
    }
    

}

export default Cat;