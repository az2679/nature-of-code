let movers = [];

function setup() {
  createCanvas(400, 400);
  // for (let i = 0; i < 2; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let m = random(50, 150);
  //   movers[i] = new Mover(x, y, m);
  // }
  movers[0] = new Mover(300, 200, 0, 5, 10);
  movers[1] = new Mover(100, 200, 0, -5, 10);

  background(0);
}

function draw() {
  // background(0);
  movers[0].attract(movers[1]);
  movers[1].attract(movers[0]);

  for (let mover of movers) {
    mover.show();
    mover.update();
  }
}
