let mySound1;
let mySound2;
let x = 25;
let speedX = 5;

function preload() {//allows for the files to download first
  mySound1 = loadSound("assets/kick.mp3");
  mySound1 = loadSound("assets/beat.mp3");
}
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");
  mySound.play();
}

function draw() {
  background(220);
  fill(0);
  circle(x, height / 2, 50);
  x = x + speedX;
  if (x > width - 25 || x < 25) {
    speedX = -speedX;
    mySound1.play();
  }
  if (x < 25) {
    speedX = -speedX;
    mySound2.play();
  }
}

//function mousePressed() {
//if (mySound.isPlaying() == false) {
//mySound.play();
//} else {
//mySound.pause(); //use pause instead of stop to continue the song where it left off my clicking again
//}
//}