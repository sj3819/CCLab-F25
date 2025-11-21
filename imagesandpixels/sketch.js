let img;
let img2;
let vid;
let cam;
let f = [];
function preload() {
  img = loadImage("assets/sprite.png");
  img2 = loadImage("assets/hokusai.jpg");
  //vid = createVideo("assets/videoweb2.mp4");
}
function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");
  //noCursor();
  background(0);
  //vid.loop();
  //vid.hide();

  cam = createCapture(VIDEO);
  cam.hide();
}
let s = 50;
function draw() {
  background(0);
  for (let x = 0; x < cam.width; x += 20) {
    for (let y = 0; y < cam.height; y += 20) {
      let d = dist(mouseX, mouseY, x, y);
      let maxVal = dist(0, 0, width, height);
      let new_s = map(d, 0, maxVal, 1, s);
      let c = cam.get(x, y);
      fill(c);
      noStroke();
      rect(x, y, new_s, new_s);
      //circle(x, y, new_s);
    }
  }
}
//let c = img2.get(mouseX, mouseY);
//background(0);
//image(cam, 0, 0);
//for (let i = 0; i < 100; i++); {
//let x = random(cam.width);
//let y = random(cam.height);
//let s = random(2, 20);
//let c = cam.get(x, y);
//fill(c);
//noStroke();
//circle(x, y, s);
//}
//}
//image = (img2, 0, 0);
//for (let i = 0; i < f.length; i++) {
//f[i].update();
//f[i].display();
//}
// if (mouseIsPressed) {
// f.push(new Face(img, mouseX, mouseY));
//}
//}

class Face {
  constructor(img, x, y) {
    this.x = x;
    this.y = y;
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.s = random(2, 50);
  }
  display() {
    push();
    blendMode(ADD);
    tint(255, 120, 10, 40);
    imageMode(CENTER);
    image(img, this.x, this.y, this.s, this.s);
    pop();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
