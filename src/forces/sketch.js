let movers = [];
let attractor;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(50, 150);
    movers[i] = new Mover(x, y, m);
  }
  attractor = new Attractor(width / 2, height / 2, 100);
}

function draw() {
  background(0);

  for (let mover of movers) {
    mover.show();
    mover.update();
    attractor.attract(mover);
  }

  if (mouseIsPressed) {
    attractor.pos.x = mouseX;
    attractor.pos.y = mouseY;
  }

  attractor.show();
}
