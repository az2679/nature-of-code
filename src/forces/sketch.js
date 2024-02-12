let movers = [];
let sun;

function setup() {
  createCanvas(600, 600);
  background(0);
  for (let i = 0; i < 10; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(10, 15));
    pos.setMag(random(100, 150));
    vel.rotate(PI / 2);
    let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
}

function draw() {
  background(0, 20);
  translate(width / 2, height / 2);
  for (let mover of movers) {
    sun.attract(mover);
    for (let other of movers) {
      if (mover != other) {
        mover.attract(other);
      }
    }
  }
  for (let mover of movers) {
    mover.show();
    mover.update();
  }
  // sun.show();
}
