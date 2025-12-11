let particles = [];
let memories = [];
let photos = [];
let sound = [];

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
  photos.push(loadImage("assets/p31.jpg"));
  photos.push(loadImage("assets/p32.jpg"));
  photos.push(loadImage("assets/p33.jpg"));
  photos.push(loadImage("assets/p34.jpg"));
  photos.push(loadImage("assets/p35.jpg"));
  photos.push(loadImage("assets/p36.jpg"));
  photos.push(loadImage("assets/p37.jpg"));
  photos.push(loadImage("assets/p38.jpg"));
  photos.push(loadImage("assets/p39.jpg"));
  photos.push(loadImage("assets/p40.jpg"));
  photos.push(loadImage("assets/p41.jpg"));
  photos.push(loadImage("assets/p42.jpg"));
  photos.push(loadImage("assets/p43.jpg"));
  photos.push(loadImage("assets/p44.jpg"));
  photos.push(loadImage("assets/p45.jpg"));
  photos.push(loadImage("assets/p46.jpg"));

  sound.push(loadSound("assets/click.mp3"));        // sound[0]
  sound.push(loadSound("assets/Photograph.mp3"));   // sound[1]
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Play background music once loaded
  if (sound[1].isLoaded()) {
    sound[1].loop();
    sound[1].setVolume(0.3);
  }

  // Create particles
  for (let i = 0; i < 120; i++) {
    let img = random(photos);

    particles.push({
      x: random(width),
      y: random(height),
      r: random(3, 6),
      vx: random(-0.6, 0.6),
      vy: random(-0.6, 0.6),
      img: img,
      activeMemory: null
    });
  }
  textFont("Georgia");
}

function draw() {
  background(10, 10, 15);

  drawConnections();
  drawParticles();

  // CENTER TITLE 
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  textStyle(BOLD);
  text("My Memories", width / 2, height / 2 - 40);

  // INSTRUCTIONS BELOW TITLE
  textSize(15);
  textStyle(NORMAL);
  text("Click each particle to reveal a unique memory.", width / 2, height / 2 + 20);

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

// CLICK — one memory per particle
function mousePressed() {
  for (let p of particles) {
    let d = dist(mouseX, mouseY, p.x, p.y);

    if (d < p.r + 8 && p.activeMemory == null) {
      let mem = new PixelMemory(p, p.img);
      p.activeMemory = mem;
      memories.push(mem);

      if (sound[0].isLoaded()) sound[0].play();
      break;
    }
  }
}

function drawParticles() {
  noStroke();

  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Glow effect when memory is active
    if (p.activeMemory) {
      let glowAlpha = map(p.activeMemory.lifespan, 0, 600, 40, 180);
      fill(180, 200, 255, glowAlpha);
      ellipse(p.x, p.y, p.r * 10);  // big glow
    }

    fill(180, 200, 255, 150);
    ellipse(p.x, p.y, p.r * 2);
  }
}

function drawConnections() {
  stroke(180, 200, 255, 60);
  strokeWeight(1);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let a = particles[i];
      let b = particles[j];
      let d = dist(a.x, a.y, b.x, b.y);

      if (d < 120) line(a.x, a.y, b.x, b.y);
    }
  }
}

class PixelMemory {
  constructor(particle, img) {
    this.particle = particle;
    this.img = img;

    this.lifespan = 600;
    this.fadeStart = 200;

    this.pixelSize = 3;
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
          b: img.pixels[idx + 2],
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
    let x = this.particle.x;
    let y = this.particle.y;

    let halfW = this.displayW / 2;
    let halfH = this.displayH / 2;

    x = constrain(x, halfW, width - halfW);
    y = constrain(y, halfH, height - halfH);

    push();

    let alpha = 255;
    if (this.lifespan < this.fadeStart)
      alpha = map(this.lifespan, 0, this.fadeStart, 0, 255);

    let shrink = 1;
    if (this.lifespan < this.fadeStart)
      shrink = map(this.lifespan, 0, this.fadeStart, 0, 1);

    translate(x, y);
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