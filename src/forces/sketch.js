// let movers = [];
// let sun;

// function setup() {
//   createCanvas(600, 600);
//   background(0);
//   for (let i = 0; i < 10; i++) {
//     let pos = p5.Vector.random2D();
//     let vel = pos.copy();
//     vel.setMag(random(10, 15));
//     pos.setMag(random(100, 150));
//     vel.rotate(PI / 2);
//     let m = random(10, 15);
//     movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
//   }
//   sun = new Mover(0, 0, 0, 0, 500);
// }

// function draw() {
//   background(0, 20);
//   translate(width / 2, height / 2);
//   for (let mover of movers) {
//     sun.attract(mover);
//     for (let other of movers) {
//       if (mover != other) {
//         mover.attract(other);
//       }
//     }
//   }
//   for (let mover of movers) {
//     mover.show();
//     mover.update();
//   }
//   // sun.show();
// }

let qtree;

function setup() {
  createCanvas(400, 400);
  let boundary = new Rectangle(200, 200, 200, 200);
  qtree = new QuadTree(boundary, 4);

  for (let i = 0; i < 300; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x, y);
    qtree.insert(p);
  }
}

function draw() {
  background(0);
  qtree.show();

  stroke(0, 255, 0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 25, 25);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points = qtree.query(range);
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y);
  }
}
