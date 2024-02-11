let moverA;
let moverB;

function setup() {
  createCanvas(400, 400);
  moverA = new Mover(100, 200, 2);
  moverB = new Mover(300, 200, 4);
}

function draw() {
  background(0);
  moverA.show();
  moverA.update();
  moverA.edges();
  moverB.show();
  moverB.update();
  moverB.edges();

  let gravity = createVector(0, 0.2);
  let weightA = p5.Vector.mult(gravity, moverA.mass);
  let weightB = p5.Vector.mult(gravity, moverB.mass);
  moverA.applyForce(weightA);
  moverB.applyForce(weightB);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }
}
