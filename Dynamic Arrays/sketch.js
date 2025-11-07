let c = [];
let n = 3;
let mic;
let sound;

function preload() {
  sound = loadSound("assets/thunder.mp3");

}

function setup() {
  //createCanvas(400, 400);
  colorMode(HSB, 100);
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  mic = new p5.AudioIn();
  mic.start();
  //for (let i = 0; i < n; i++) {
  //c[i] = new Cloud(random(width), random(height), random(50, 100));
  //}
}
function mousePressed() {
  c.push(new Cloud(mouseX, mouseY, random(50, 100)));
}
function draw() {
  background(220);
  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      if (i != j) {
        c[i].checkCollision(c[j]);
      }
    }
    c[i].display();
    c[i].move();
    //c[i].moveback();
    if (c[i].isOut()) {
      c.splice(i, 1);
    }
  }
  console.log(c.length);
  //if (mouseIsPressed) {
  //c.push(new Cloud(mouseX, mouseY, random(50, 100)))
  //}
}
