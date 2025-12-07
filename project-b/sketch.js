let particles = [];
let memories = [];
let photos = [];
let revealSize = 260;

function preload() {
  photos.push(loadImage("assets/DSCF9399.JPG"));
  photos.push(loadImage("assets/DSCF3267.JPG"));
  photos.push(loadImage("assets/DSCF1683.JPG"));
  photos.push(loadImage("assets/concert.jpg"));
  photos.push(loadImage("assets/01000407.JPG"));
  photos.push(loadImage("assets/ballet.JPG"));
  photos.push(loadImage("assets/beach.jpg"));
  photos.push(loadImage("assets/DSCF0204.JPG"));
  photos.push(loadImage("assets/DSCF3175.JPG"));
  photos.push(loadImage("assets/DSCF4484.JPG"));
  photos.push(loadImage("assets/DSCF4518.JPG"));
  photos.push(loadImage("assets/DSCF5207.JPG"));
  photos.push(loadImage("assets/DSCF5228.JPG"));
  photos.push(loadImage("assets/DSCF7163.JPG"));
  photos.push(loadImage("assets/DSCF7195.JPG"));
  photos.push(loadImage("assets/DSCF7408.JPG"));
  photos.push(loadImage("assets/DSCF9493.JPG"));
  photos.push(loadImage("assets/IMG_0888.JPG"));
  photos.push(loadImage("assets/IMG_1325.JPG"));
  photos.push(loadImage("assets/IMG_3250.JPG"));
  photos.push(loadImage("assets/IMG_4030.JPG"));
  photos.push(loadImage("assets/IMG_4669.JPG"));
  photos.push(loadImage("assets/IMG_6244.jpeg"));
  photos.push(loadImage("assets/lantern.jpg"));
  photos.push(loadImage("assets/photobooth.jpg"));
  photos.push(loadImage("assets/photoshoot.jpg"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      r: random(3, 5),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
      img: random(photos)
    });
  }
}

function draw() {
  background(10, 10, 15);

  drawConnections();
  drawParticles();

  for (let m of memories) {
    m.display();
  }
}

function drawParticles() {
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

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

      if (d < 110) {
        line(a.x, a.y, b.x, b.y);
      }
    }
  }
}

function mousePressed() {
  for (let p of particles) {
    let d = dist(mouseX, mouseY, p.x, p.y);

    if (d < p.r + 8) {
      memories.push(new PixelMemory(p.x, p.y, p.img));
      break;
    }
  }
}

class PixelMemory {
  constructor(x, y, img) {
    this.img = img;
    this.pixels = [];
    this.size = 2;

    // scale factor to fit screen if needed
    let maxPopupWidth = min(width * 0.5, revealSize);
    let maxPopupHeight = min(height * 0.5, revealSize);
    this.scaleFactor = min(maxPopupWidth / img.width, maxPopupHeight / img.height);

    this.displayWidth = img.width * this.scaleFactor;
    this.displayHeight = img.height * this.scaleFactor;

    // clamp popup to screen bounds
    this.x = constrain(x - this.displayWidth / 2, 0, width - this.displayWidth);
    this.y = constrain(y - this.displayHeight / 2, 0, height - this.displayHeight);

    img.loadPixels();

    for (let yy = 0; yy < this.displayHeight; yy += this.size) {
      for (let xx = 0; xx < this.displayWidth; xx += this.size) {
        let origX = floor(xx / this.scaleFactor);
        let origY = floor(yy / this.scaleFactor);
        let idx = (origX + origY * img.width) * 4;

        let r = img.pixels[idx];
        let g = img.pixels[idx + 1];
        let b = img.pixels[idx + 2];

        this.pixels.push({ x: xx, y: yy, r, g, b });
      }
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    for (let p of this.pixels) {
      fill(p.r, p.g, p.b);
      noStroke();
      rect(p.x, p.y, this.size, this.size);
    }

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
