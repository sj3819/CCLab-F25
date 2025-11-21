let particles = [];
let memories = [];
let d = 200; // parallax depth

// Camera controls
let camRotX = 0;
let camRotY = 0;
let zoom = 600;
let lastMouseX = 0;
let lastMouseY = 0;

function preload() {
  // photos[1] = loadImage("assets/memory1.png");
  // sounds[1] = loadSound("assets/sound1.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);

  // CAMERA
  translate(0, 0, -zoom);  // zoom control
  rotateX(camRotX);  // vertical rotation
  rotateY(camRotY);  // horizontal rotation

  drawConnections();

  // Draw particles
  for (let p of particles) {
    p.update();
    p.display();
  }

  // Draw memories (for later)
  for (let m of memories) {
    m.display();
  }
}

// CAMERA DRAG TO ROTATE
function mouseDragged() {
  let sensitivity = 0.005;
  camRotY += (mouseX - lastMouseX) * sensitivity;
  camRotX += (mouseY - lastMouseY) * sensitivity;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// Reset stored mouse position when pressed
function mousePressed() {
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// PARTICLE CLASS
class Particle {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(-150, 150);
    this.r = random(2, 4);
    this.vx = random(-0.3, 0.3);
    this.vy = random(-0.3, 0.3);
    this.vz = random(-0.2, 0.2);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.z += this.vz;

    if (this.x < -width / 2 || this.x > width / 2) this.vx *= -1;
    if (this.y < -height / 2 || this.y > height / 2) this.vy *= -1;
    if (this.z < -200 || this.z > 200) this.vz *= -1;
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(180, 200, 255, 180);
    sphere(this.r);
    pop();
  }
}

// CONNECTION LINES
function drawConnections() {
  stroke(180, 200, 255, 70);
  strokeWeight(1);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let a = particles[i];
      let b = particles[j];
      let d = dist(a.x, a.y, a.z, b.x, b.y, b.z);

      if (d < 120) {
        line(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function keyPressed() {
  if (key === '+' || key === '=') {  // zoom in
    zoom -= 100;
  }
  if (key === '-' || key === '_') {  // zoom out (fix)
    zoom += 100;
  }
}
