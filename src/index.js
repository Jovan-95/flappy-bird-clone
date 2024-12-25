// cd to flapy-birds-clone
// npm install
// npm run dev

import Phaser from "phaser";

const config = {
  // WebGL (Web grphic library) JS API for 2D and 3D
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: "arcade",
    arcade: {
      // gravity: { y: 400 },
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const VELOCITY = 200;

let bird = null;
let upperPipe = null;
let lowerPipe = null;

const pipeVerticalDistanceRange = [150, 250];
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
let pipeVerticalPosition = Phaser.Math.Between(
  0 + 20,
  config.height - 20 - pipeVerticalDistance
);

const initalBirdPosition = { x: config.width / 10, y: config.height / 2 };
const flapVelocity = 250;

// Loading imgs, music, animations..
function preload() {
  // This context - scene
  // contains functions and props we can use
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

// Initialize
function create() {
  this.add.image(0, 0, "sky").setOrigin(0, 0);
  bird = this.physics.add
    .sprite(initalBirdPosition.x, initalBirdPosition.y, "bird")
    .setOrigin(0);
  bird.body.gravity.y = 400;

  upperPipe = this.physics.add
    .sprite(400, pipeVerticalPosition, "pipe")
    .setOrigin(0, 1);
  lowerPipe = this.physics.add
    .sprite(400, upperPipe.y + pipeVerticalDistance, "pipe")
    .setOrigin(0, 0);

  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown_SPACE", flap);
}

function update(time, delta) {
  if (bird.y > config.height || bird.y < 0 - bird.height) {
    restartBirdPosition();
  }
}

function restartBirdPosition() {
  bird.x = initalBirdPosition.x;
  bird.y = initalBirdPosition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);
