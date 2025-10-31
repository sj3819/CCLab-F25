/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new BunBun(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class BunBun {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = 80;
    this.hopHeight = 45;
    this.baseY = startY;
  }

  update() {
    // Hop animation
    this.y = this.baseY - this.hopHeight * abs(sin(frameCount * 0.05));
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();

    // Shadow
    fill(120, 120, 120, 50);
    ellipse(0, this.s * 0.7, this.s * 0.8, this.s * 0.25);

    // Body
    fill(255);
    ellipse(0, 4, this.s * 0.9, this.s * 1.0);

    // Tummy
    fill(255, 200, 210);
    ellipse(0, this.s * 0.1, this.s * 0.55, this.s * 0.7);

    // Feet
    fill(255);
    let footY = this.s * 0.51;
    ellipse(-this.s * 0.25, footY, this.s * 0.35, this.s * 0.15);
    ellipse(this.s * 0.25, footY, this.s * 0.35, this.s * 0.15);

    // Arms (soft swing motion)
    let armOffset = 8 * cos(frameCount * 0.05);
    ellipse(-this.s * 0.45, armOffset + this.s * 0.1, this.s * 0.25, this.s * 0.2);
    ellipse(this.s * 0.45, -armOffset + this.s * 0.1, this.s * 0.25, this.s * 0.2);

    // Head
    fill(255);
    ellipse(0, -this.s * 0.75, this.s * 0.9, this.s * 0.9);

    // Ears
    fill(255);
    ellipse(-this.s * 0.25, -this.s * 1.6, this.s * 0.25, this.s * 0.8);
    ellipse(this.s * 0.25, -this.s * 1.6, this.s * 0.25, this.s * 0.8);

    // Inner ears (soft pink)
    fill(255, 190, 200);
    ellipse(-this.s * 0.25, -this.s * 1.6, this.s * 0.12, this.s * 0.5);
    ellipse(this.s * 0.25, -this.s * 1.6, this.s * 0.12, this.s * 0.5);

    // Eyes
    fill(50);
    ellipse(-this.s * 0.15, -this.s * 0.8, this.s * 0.12, this.s * 0.18);
    ellipse(this.s * 0.15, -this.s * 0.8, this.s * 0.12, this.s * 0.18);

    // Inside Eye
    fill(255);
    ellipse(-this.s * 0.17, -this.s * 0.85, this.s * 0.03, this.s * 0.06);
    ellipse(this.s * 0.13, -this.s * 0.85, this.s * 0.03, this.s * 0.06);

    // Blush 
    fill(255, 170, 180, 120);
    ellipse(-this.s * 0.30, -this.s * 0.60, this.s * 0.15);
    ellipse(this.s * 0.30, -this.s * 0.60, this.s * 0.15);

    // Nose
    fill(255, 150, 180);
    triangle(
      -this.s * 0.04,
      -this.s * 0.65,
      this.s * 0.04,
      -this.s * 0.65, 0,
      -this.s * 0.6);

    // Mouth (gentle smile)
    noFill();
    stroke(120);
    strokeWeight(1.2);
    arc(-this.s * 0.05, -this.s * 0.55, this.s * 0.1, this.s * 0.08, 0, PI / 2);
    arc(this.s * 0.06, -this.s * 0.55, this.s * 0.1, this.s * 0.08, PI / 2, PI);

    pop();
  }

  //drawReferenceShapes() { //remove after code is done
  //noFill();
  //stroke(255, 0, 0);
  //line(-5, 0, 5, 0);
  //line(0, -5, 0, 5);
  //stroke(255);
  //rect(-100, -100, 200, 200);
  //fill(255);
  //stroke(0);

  /*
  GOAL:
  The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 
  
  RULES:
  For this to work you need to follow one rule: 
    - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
    - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
    - Your dancer will always be initialized receiving two arguments: 
      - startX (currently the horizontal center of the canvas)
      - startY (currently the vertical center of the canvas)
    beside these, please don't add more parameters into the constructor function 
    - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
  */
}