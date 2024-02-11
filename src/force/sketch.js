let movers = [];
let mu = 0.1;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), 200, random(1, 8));
  }
  mover = new Mover(100, 200, 2);
}

function draw() {
  background(0);

  for (let mover of movers) {
    mover.show();
    mover.update();
    mover.edges();

    let gravity = createVector(0, 0.2);
    let weight = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(weight);

    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }

    mover.friction();
  }
}
