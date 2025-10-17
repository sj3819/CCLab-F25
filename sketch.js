let p;
let b;
let s; // offset for background layout noise seed

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container"); 
  colorMode(HSL, 360, 100, 100);
  noStroke();
  makeFlower();
  s = int(noise(10000) * 5000); // base noise offset
}

function draw() {
  //background(255, 0.01);

  drawBackgroundFlowers();
  drawCreature(width / 2, height / 2);
}

function drawBackgroundFlowers() {
  let t = frameCount * 0.02;

  for (let i = 0; i < 12; i++) {
    // Use Perlin noise instead of random for placement & variation
    let nx = i * 0.31 + s;
    let ny = i * 0.57 + s;
    let np = i * 0.19 + s;

    let x = noise(nx) * width;
    let y = noise(ny) * height;
    let petals = int(map(noise(np), 0, 1, 5, 10));
    let hue = map(noise(i * 0.12 + s), 0, 1, 0, 360);
    let size = map(noise(i * 0.45 + s), 0, 1, 0.4, 0.8);
    let offset = i * 0.5;

    push();
    translate(x, y);
    let breath = map(sin(t + offset), -1, 1, 0.7 - 1, 1.0);

    // Petals
    for (let j = 0; j < petals; j++) {
      let angle = (TWO_PI / petals) * j;
      push();
      rotate(angle);
      let len = 50 * size * breath;
      let w = 25 * size * breath;
      let distance = 40 * size;
      fill(hue, 60, 65, 0.4);
      ellipse(0, distance, w, len);
      pop();
    }

    // Center
    fill((hue + 180) % 360, 80, 50, 0.8);
    ellipse(0, 0, 10 * size * breath);
    pop();
  }
}

// Main flower creature
function drawCreature(x, y) {
  push();
  translate(x, y);
  drawFlower();
  pop();
}

function drawFlower() {
  let breath = map(sin(frameCount * 0.02), -1, 1, 0.7 - 1, 1.0);

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

  drawFace(0, 0);
}

function drawFace(x, y) {
  push();
  translate(x, y);
  fill(255);
  circle(0, 0, 30);

  fill(0);
  circle(-9, 0, 5);
  circle(9, 0, 5);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(0, 5, 10, 10, 0, PI);
  noStroke();
  pop();
}

function mousePressed() {
  makeFlower();
  s += 100; // shifts noise space to generate a new layout
}

function makeFlower() {
  p = int(map(noise(frameCount * 0.01), 0, 1, 6, 16));
  b = map(noise(frameCount * 0.02), 0, 1, 0, 360);
}
