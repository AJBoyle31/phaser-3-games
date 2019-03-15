import 'phaser';
import Boot from './scenes/boot.js';
import Preload from './scenes/preload.js';
import Menu from './scenes/menu.js';
import DudeTutorial from './scenes/dudeTutorial.js';
import SpaceshipGame from './scenes/spaceshipGame.js';
import CatFighter from './scenes/catFighter.js';
import SpaceShooter from './scenes/spaceShooter.js';
import SpaceShooterGameOver from './scenes/spaceShooterGameOver.js';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    //backgroundColor: 'black',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 300},
            debug: true
        }
    },
    pixelArt: true,
    roundPixels: true,
    scene: [Boot, Preload, Menu, SpaceShooter, SpaceShooterGameOver, DudeTutorial, SpaceshipGame, CatFighter]
};

new Phaser.Game(config);


/*
type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    width: 800,
    height: 600,
*/