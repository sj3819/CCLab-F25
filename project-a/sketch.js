/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let p;
let b;
let s; 

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5-canvas");
  canvas.parent("p5-canvas-container");
  colorMode(HSL, 360, 100, 100);
  noStroke();
  makeFlower();
  s = int(noise(1000) * 5000); 
}

function draw() {
  //background(255, 0.01);
  drawBackgroundFlowers();
  drawCreature(width / 2, height / 2);
}

// Background flowers (grid + noise offset)
function drawBackgroundFlowers() {
  let t = frameCount * 0.02; // time variable

  for (let i = 100; i < width; i += 100) {
    for (let j = 100; j < height; j += 100) {
      if (noise(i * j) > 0.2) { // randomly control which grid spots show flowers
        let offx = map(noise(i * j + s), 0, 1, -100, 100);
        let offy = map(noise(i + j + s), 0, 1, -150, 150);
        drawSingleBackgroundFlower(i + offx, j + offy, t);
      }
    }
  }
}

// Draws one background flower
function drawSingleBackgroundFlower(x, y, t) {
  let base = x * y + s;
  let petals = int(map(noise(base + 100), 0, 1, 5, 10));
  let hue = map(noise(base + 20), 0, 1, 0, 360);
  let size = map(noise(base + 30), 0, 1, 0.4, 0.8);
  let offset = noise(base + 40) * TWO_PI;

  push();
  translate(x, y);
  let breath = map(sin(t + offset), -1, 1, -0.3, 1.0);

  // Petals
  for (let j = 0; j < petals; j++) {
    let angle = (TWO_PI / petals) * j;
    push();
    rotate(angle);
    let len = 50 * size * breath;
    let w = 25 * size * breath;
    let distance = 40 * size;
    //noStroke();
    fill(hue, 60, 65, 0.4);
    ellipse(0, distance, w, len);
    pop();
  }

  // Center
  fill((hue + 180) % 360, 80, 50, 0.8);
  ellipse(0, 0, 15 * size * breath);
  pop();
}

// Flower Creature
function drawCreature(x, y) {
  push();
  translate(x, y);
  drawFlower();
  pop();
}

function drawFlower() {
  let breath = map(sin(frameCount * 0.02), -1, 1, -0.3, 1.0);

  for (let i = 0; i < p; i++) {
    let angle = (TWO_PI / p) * i;
    let f = 0.1;
    let timeOffset = frameCount * f + angle;
    let len = map(sin(timeOffset), -1, 1, 60, 140) * breath;
    let w = map(sin(timeOffset), -1, 1, 20, 60) * breath;
    let distance = map(sin(timeOffset), -1, 1, 85, 120) * breath;
    let hue = (b + map(sin(timeOffset), -1, 1, -20, 20)) % 360;

    push();
    rotate(angle);
    fill(hue, 70, 60, 0.5);
    ellipse(0, distance, w, len);
    pop();
  }

  // Face movement using mouse
  let moveX = map(mouseX, 0, width, -5, 5);
  let moveY = map(mouseY, 0, height, -3, 3);
  drawFace(moveX, moveY);
}

// Face
function drawFace(x, y) {
  push();
  translate(x, y);

  // Face
  fill(255);
  circle(0, 0, 35);

  // Eyes
  let eyeSpacing = 10;
  let eyeY = -3;
  let eyeSize = 7;
  let eyeMoveX = map(mouseX, 0, width, -1.5, 1.5);
  let eyeMoveY = map(mouseY, 0, height, -1, 1);

  // Left eye
  push();
  translate(-eyeSpacing + eyeMoveX, eyeY + eyeMoveY);
  fill(0);
  ellipse(0, 0, eyeSize, eyeSize * 1.3);
  fill(255, 80);
  ellipse(-1, -2, 2.5, 2.5);
  pop();

  // Right eye
  push();
  translate(eyeSpacing + eyeMoveX, eyeY + eyeMoveY);
  fill(0);
  ellipse(0, 0, eyeSize, eyeSize * 1.3);
  fill(255, 80);
  ellipse(-1, -2, 2.5, 2.5);
  pop();

  // Smile
  noFill();
  stroke(0);
  strokeWeight(1.5);
  let smileOffset = map(mouseY, 0, height, -1.5, 1.5);
  arc(0, 5 + smileOffset, 11, 10, 0, PI);

  // Cheeks
  noStroke();
  fill(0, 80, 80, 0.3);
  ellipse(-eyeSpacing - 4, 6, 7, 4);
  ellipse(eyeSpacing + 4, 6, 7, 4);
  pop();
}

// Interactions
function mousePressed() {
  makeFlower();
  s += 10; // shifts background flower layout
}

// Change flower when mouse clicked
function makeFlower() {
  p = int(random(6, 14)); // random petal count
  b = random(360); // random base color
}