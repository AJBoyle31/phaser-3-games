class SpaceshipGame extends Phaser.Scene {
    constructor(){
        super({ key: 'SpaceshipGame', active: false });
        
    }
    
    preload(){
        
    }
    
    create(){
        this.lastFired = 0;
        this.lastAsteroid = 0;
        this.stillAlive = true;
        this.score = 0;
        this.asteroidDelay = 900;
        
        //GET HIGH SCORE FROM LOCALSTORAGE
        if(typeof(Storage) !== 'undefined'){
            if(localStorage.getItem('spaceHighScore') === 'undefined'){
                localStorage.setItem('spaceHighScore', 0);
                this.highScore = 0;
            } else {
                this.highScore = Number(localStorage.getItem('spaceHighScore'));
            }
        }

        //STARFIELD
        this.starfield = this.add.tileSprite(0, 0, 800, 600, 'space').setOrigin(0, 0);
        
        //SPACESHIP
        this.spaceship = this.physics.add.sprite(100, 400, 'ship').play('move');
        this.spaceship.setCollideWorldBounds(true);
        this.spaceship.body.setSize(115,70);
        
        //SHOT GROUP
        this.shots = this.physics.add.group({
            classType: Shot,
            runChildUpdate: true
        });

        //ASTEROID GROUP
        this.asteroids = this.physics.add.group({
            classType: Asteroid,
            runChildUpdate: true
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
        //PHYSICS OVERLAPS
        this.physics.add.overlap(this.spaceship, this.asteroids, this.destroyShip, null, this);
        this.physics.add.overlap(this.shots, this.asteroids, this.destroyAsteroid, null, this);
        
        //SCORE TEXT
        this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#fff'});
        this.highScoreText = this.add.text(500, 16, 'High Score: ' + this.highScore, {fontSize: '32px', fill: '#fff'});
        
    }
    
    update(time){
        
        //scrolling starfield
        if (this.stillAlive){
            this.starfield.tilePositionX += 2;    
        }
        
        //spaceship controls
        if (this.cursors.up.isDown){
            this.spaceship.setVelocityY(-150);
        }
        else if (this.cursors.down.isDown){
            this.spaceship.setVelocityY(150);
        } else {
            this.spaceship.setVelocityY(0);
        }
        
        //fire shot
        if (this.cursors.space.isDown && time > this.lastFired && this.stillAlive){
            var shot = this.shots.get();
            if (shot){
                shot.fire(this.spaceship.x, this.spaceship.y);
                this.lastFired = time + 400;
            }
        }
        
        if (this.stillAlive){
            this.createAsteroid(time);
        }
        
        if (this.cursors.space.isDown && !this.stillAlive){
            this.scene.restart();    
        }
    }
    
    createAsteroid(time){
        if (time > this.lastAsteroid){
            var asteroid = this.asteroids.get();
            if (asteroid){
                asteroid.birth(825, Phaser.Math.Between(50, 550), 1 + (this.score * 0.005));
                this.lastAsteroid = time + this.asteroidDelay;
            }
        }
    }
    
    destroyAsteroid(shot, asteroid){
        this.shots.killAndHide(shot);
        shot.body.enable = false;
        asteroid.body.enable = false;
        asteroid.on('animationcomplete', ()=> this.asteroids.killAndHide(asteroid));
        asteroid.anims.play('asteroidExplosion', false);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        if (this.score % 100 == 0){
            this.asteroidDelay -= 100;
        }
        if (this.asteroidDelay <= 100){
            this.asteroidDelay = 100;
        }
    }
    
    destroyShip(spaceship, asteroid){
        asteroid.destroy();
        spaceship.on('animationcomplete', this.gameOver, this); 
        spaceship.anims.play('shipExplode', false);
    }
    
    gameOver(){
        this.stillAlive = false;
        this.physics.pause();
        this.gameOverText = this.add.text( 400, 300, 'Game Over', {fontSize: '40px', fill: '#fff'}).setOrigin(0.5, 0.5);
        this.restartLevel = this.add.text(400, 350, 'Press Spacebar to restart', {fontSize: '35px', fill: '#fff'}).setOrigin(0.5, 0.5);
        if (this.score > this.highScore){
            this.highScore = this.score;
            this.highScoreText.setText('High Score: ' + this.highScore);
            localStorage.setItem('spaceHighScore', this.highScore);
        }
        
        
    }
}

export default SpaceshipGame;


class Shot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, 'shot', frame);
        scene.add.existing(this);
        this.speed = Phaser.Math.GetSpeed(300, 1);
    }
    
    fire(x, y){
        this.setPosition(x + 100, y + 25);
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
        this.body.setSize(50,28);
        this.anims.play('pulse', true);
    }
    
    update(time, delta){
        
        this.x += this.speed * delta;
        
        if (this.x > 800){
            this.kill;    
        }
        
    }
    
    kill(){
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
    }
}

class Asteroid extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, 'asteroid', frame);
        scene.add.existing(this);
        this.speed = Phaser.Math.GetSpeed(200, 1);
        
    }
    
    birth(x, y, speed){
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setOrigin(0.5, 0.5);
        this.speed *= speed;
        console.log(speed);
    }
    
    update(time, delta){
        this.x -= this.speed * delta;
        this.rotation += 0.02;
        
        if (this.x < 0){
            this.kill;            
        }
    }
    
    kill(){
        this.setActive(false);
        this.setVisible(false);
        this.body.stop();
    }
}