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

  // for (let i = 0; i < 500; i++) {
  //   let p = new Point(random(width), random(height));
  //   qtree.insert(p);
  // }
}

function draw() {
  background(0);
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
      qtree.insert(m);
    }
  }
  qtree.show();
}
