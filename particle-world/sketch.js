// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 10; // initial number of particles
let MAX_OF_PARTICLES = 200; // maximum number of particles
let particles = [];
let mic;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // Microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Generate initial particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(180, 220, 255); // soft sky blue

  // microphone level and map it to a range for movement
  let f = map(mic.getLevel(), 0, 1, 1, 10);

  // Update and display all particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update(f); // pass the mapped speed factor
    p.display();
  }

  // Limit number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1);
  }
}

// Add new particles when mouseIspressed
function mousePressed() {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(mouseX + random(-10, 10), mouseY + random(-10, 10)));
  }
}

// Clear all particles when "C" key is pressed
function keyPressed() {
  if (key === 'c' || key === 'C') {
    particles = []; // clear all
    background(180, 220, 255);
  }
}

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = random(20, 40);
    this.color = color(random(100, 255), random(100, 200), random(150, 255));
    this.vx = random(-1.2, 1.2);
    this.vy = random(-0.8, 0.8);
    this.angle = random(TWO_PI);
    this.flapSpeed = random(0.1, 0.2);
  }

  update(f) {
    // f is the sound-based movement multiplier
    this.angle += this.flapSpeed;
    this.x += (this.vx + sin(this.angle)) * f * 0.2;
    this.y += (this.vy + cos(this.angle)) * f * 0.2;

    // wrap around edges
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();

    // flapping wings
    let wingOffset = sin(this.angle * 3) * 5;

    // Wings
    fill(this.color);
    ellipse(-this.dia * 0.6 - wingOffset, -this.dia * 0.3, this.dia, this.dia * 0.8);
    ellipse(-this.dia * 0.6 - wingOffset, this.dia * 0.3, this.dia * 0.8, this.dia * 0.6);
    ellipse(this.dia * 0.6 + wingOffset, -this.dia * 0.3, this.dia, this.dia * 0.8);
    ellipse(this.dia * 0.6 + wingOffset, this.dia * 0.3, this.dia * 0.8, this.dia * 0.6);

    // Body
    fill(50);
    rectMode(CENTER);
    rect(0, 0, this.dia * 0.15, this.dia * 0.9, 5);

    // Head
    fill(30);
    ellipse(0, -this.dia * 0.55, this.dia * 0.25, this.dia * 0.25);

    // Antennae
    stroke(30);
    strokeWeight(1.5);
    noFill();
    line(0, -this.dia * 0.65, -this.dia * 0.2, -this.dia * 0.9);
    line(0, -this.dia * 0.65, this.dia * 0.2, -this.dia * 0.9);

    pop();
  }
}