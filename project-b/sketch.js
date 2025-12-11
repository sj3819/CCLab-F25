let particles = [];
let memories = [];
let photos = [];
let sound = [];

// Camera controls
let camRotX = 0;
let camRotY = 0;
let zoom = 600;
let lastMouseX = 0;
let lastMouseY = 0;

function preload() {
  photos.push(loadImage("assets/p1.jpg"));
  photos.push(loadImage("assets/p2.jpg"));
  photos.push(loadImage("assets/p3.jpg"));
  photos.push(loadImage("assets/p4.jpg"));
  photos.push(loadImage("assets/p5.jpg"));
  photos.push(loadImage("assets/p6.jpg"));
  photos.push(loadImage("assets/p7.jpg"));
  photos.push(loadImage("assets/p8.jpg"));
  photos.push(loadImage("assets/p9.jpg"));
  photos.push(loadImage("assets/p10.jpg"));
  photos.push(loadImage("assets/p11.jpg"));
  photos.push(loadImage("assets/p12.jpg"));
  photos.push(loadImage("assets/p13.jpg"));
  photos.push(loadImage("assets/p14.jpg"));
  photos.push(loadImage("assets/p15.jpg"));
  photos.push(loadImage("assets/p16.jpg"));
  photos.push(loadImage("assets/p17.jpg"));
  photos.push(loadImage("assets/p18.jpg"));
  photos.push(loadImage("assets/p19.jpg"));
  photos.push(loadImage("assets/p20.jpg"));
  photos.push(loadImage("assets/p21.jpg"));
  photos.push(loadImage("assets/p22.jpg"));
  photos.push(loadImage("assets/p23.jpg"));
  photos.push(loadImage("assets/p24.jpg"));
  photos.push(loadImage("assets/p25.jpg"));
  photos.push(loadImage("assets/p26.jpg"));
  photos.push(loadImage("assets/p27.jpg"));
  photos.push(loadImage("assets/p28.jpg"));
  photos.push(loadImage("assets/p29.jpg"));
  photos.push(loadImage("assets/p30.jpg"));
  // photos.push(loadImage("assets/p31.jpg"));
  // photos.push(loadImage("assets/p32.jpg"));
  // photos.push(loadImage("assets/p33.jpg"));
  // photos.push(loadImage("assets/p34.jpg"));
  // photos.push(loadImage("assets/p35.jpg"));
  // photos.push(loadImage("assets/p36.jpg"));
  // photos.push(loadImage("assets/p37.jpg"));
  // photos.push(loadImage("assets/p38.jpg"));
  // photos.push(loadImage("assets/p39.jpg"));
  // photos.push(loadImage("assets/p40.jpg"));
  // photos.push(loadImage("assets/p41.jpg"));
  // photos.push(loadImage("assets/p42.jpg"));
  // photos.push(loadImage("assets/p43.jpg"));
  // photos.push(loadImage("assets/p44.jpg"));
  // photos.push(loadImage("assets/p45.jpg"));
  // photos.push(loadImage("assets/p46.jpg"));

  sound.push(loadSound("assets/click.mp3"));
  sound.push(loadSound("assets/Photograph.mp3"));
}
// display text
// fill(255);
// text("Zoom into each particle to see each unique memory.", 10, 20);

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Play background song
  if (sound[2].isLoaded()) {
    sound[2].loop();
    sound[2].setVolume(0.3);
  }

  for (let i = 0; i < 31; i++) {
    let img = random(photos);

    particles.push({
      x: random(-width / 2, width / 2),
      y: random(-height / 2, height / 2),
      z: random(-200, 200),
      r: random(3, 6),
      vx: random(-0.6, 0.6),
      vy: random(-0.6, 0.6),
      vz: random(-0.3, 0.3),
      img: img,
      activeMemory: null
    });
  }
}

function draw() {
  background(10, 10, 15);

  // Camera rotation
  translate(0, 0, -zoom);
  rotateX(camRotX);
  rotateY(camRotY);

  drawConnections();
  drawParticles();

  // Update & display memories
  for (let i = memories.length - 1; i >= 0; i--) {
    let m = memories[i];
    m.update();
    m.display();

    if (m.lifespan <= 0) {
      m.particle.activeMemory = null;
      memories.splice(i, 1);
    }
  }
}

// CLICK TO REVEAL — One memory per particle
function mousePressed() {
  lastMouseX = mouseX;
  lastMouseY = mouseY;

  for (let p of particles) {
    let screenPos = createVector();
    screenPos = screenPosition(p.x, p.y, p.z);

    let d = dist(mouseX - width / 2, mouseY - height / 2, screenPos.x, screenPos.y);

    if (d < p.r + 8 && p.activeMemory == null) {
      let mem = new PixelMemory(p, p.img);
      p.activeMemory = mem;
      memories.push(mem);

      if (sound[0].isLoaded()) sound[0].play();
      if (sound[1].isLoaded()) setTimeout(() => sound[1].play(), 200);

      break;
    }
  }
}

function drawParticles() {
  noStroke();
  fill(180, 200, 255, 150);

  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;

    if (p.x < -width / 2 || p.x > width / 2) p.vx *= -1;
    if (p.y < -height / 2 || p.y > height / 2) p.vy *= -1;
    if (p.z < -200 || p.z > 200) p.vz *= -1;

    push();
    translate(p.x, p.y, p.z);
    sphere(p.r);
    pop();
  }
}

function drawConnections() {
  stroke(180, 200, 255, 60);
  strokeWeight(1);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let a = particles[i];
      let b = particles[j];
      let d = dist(a.x, a.y, a.z, b.x, b.y, b.z);

      if (d < 120) line(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
}

// MEMORY CLASS
class PixelMemory {
  constructor(particle, img) {
    this.particle = particle;
    this.img = img;
    this.lifespan = 600;
    this.fadeStart = 200;
    this.pixelSize = 4;
    this.pixelsPerFrame = 230;
    this.revealSize = random(280, 420);

    let maxW = this.revealSize;
    let maxH = this.revealSize;
    this.scaleFactor = min(maxW / img.width, maxH / img.height);

    this.displayW = img.width * this.scaleFactor;
    this.displayH = img.height * this.scaleFactor;

    img.loadPixels();
    this.pixels = [];
    for (let yy = 0; yy < this.displayH; yy += this.pixelSize) {
      for (let xx = 0; xx < this.displayW; xx += this.pixelSize) {
        let ix = floor(xx / this.scaleFactor);
        let iy = floor(yy / this.scaleFactor);
        let idx = (ix + iy * img.width) * 4;

        this.pixels.push({
          x: xx,
          y: yy,
          r: img.pixels[idx],
          g: img.pixels[idx + 1],
          b: img.pixels[idx + 2]
        });
      }
    }
    this.pixels = shuffle(this.pixels);
    this.currentIndex = 0;
  }

  update() {
    this.lifespan--;
  }

  display() {
    push();

    let alpha = 255;
    if (this.lifespan < this.fadeStart)
      alpha = map(this.lifespan, 0, this.fadeStart, 0, 255);

    let shrink = 1;
    if (this.lifespan < this.fadeStart)
      shrink = map(this.lifespan, 0, this.fadeStart, 0, 1);

    translate(this.particle.x, this.particle.y, this.particle.z);
    scale(shrink);
    translate(-this.displayW / 2, -this.displayH / 2);

    let endIndex = min(this.currentIndex + this.pixelsPerFrame, this.pixels.length);

    noStroke();
    for (let i = 0; i < endIndex; i++) {
      let p = this.pixels[i];
      fill(p.r, p.g, p.b, alpha);
      rect(p.x, p.y, this.pixelSize, this.pixelSize);
    }

    this.currentIndex = endIndex;

    pop();
  }
}

// Camera drag to rotate
function mouseDragged() {
  let sensitivity = 0.005;
  camRotY += (mouseX - lastMouseX) * sensitivity;
  camRotX += (mouseY - lastMouseY) * sensitivity;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function keyPressed() {
  if (key === '+' || key === '=') zoom -= 100;
  if (key === '-' || key === '_') zoom += 100;
}