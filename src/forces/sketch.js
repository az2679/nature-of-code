let movers = [];
let sun;
let qtree;
let G = 0.35;

let moons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  //creating movers with random mass. random spawn position within a donut around center, velocity set tangent via rotation 90 degrees.
  for (let i = 0; i < 100; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(10, 15));
    pos.setMag(random(150, 200));
    vel.rotate(PI / 2);
    let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
  background(0);
}

function draw() {
  clear();
  background(0);
  blendMode(ADD);

  //creating quadtree and placing points within quadtree for each mover
  let boundary = new Rectangle(0, 0, width, height);
  qtree = QuadTree.create(boundary, 8);
  for (let m of movers) {
    let point = new Point(m.pos.x, m.pos.y, m);
    qtree.insert(point);
  }
  //why are we creating a new point for each mover to insert into the qtree instead of inserting the movers directly into the tree?

  //create new point at each mouse xy location
  for (let i = 0; i < moons.length; i++) {
    // moons[i].show();
    strokeWeight(20);
    stroke(255);
    point(moons[i].pos.x, moons[i].pos.y);
  }

  //mutual attraction to each other + gravitational attraction to sun
  for (let mover of movers) {
    attractQuad(mover, qtree);
    sun.attract(mover);

    for (let i = 0; i < moons.length; i++) {
      // moons[i].repulse(mover);
      moons[i].attract(mover);
    }
  }

  //center sketch at origin & use push/pop so translate vector will translate from origin instead of last point
  push();
  translate(width / 2, height / 2);
  for (let mover of movers) {
    mover.update();
    mover.show();
  }
  qtree.show();
  // sun.show();
  pop();
}

//save mouse pos when pressed >> create new mover at mouse pos
function mousePressed() {
  // moons.push(createVector(mouseX, mouseY));

  let moon = new Mover(mouseX, mouseY, 0, 0, 100);
  moons.push(moon);
}

//mutual attraction - each point attracts every other point but not themselves. but if spiral out of qtree bounds, create temp mover to attract them back in.
function attractQuad(m, qtree) {
  let d = dist(m.pos.x, m.pos.y, qtree.boundary.x, qtree.boundary.y);
  if (d < 25) {
    if (qtree.points) {
      for (let p of qtree.points) {
        if (m != p.userData) {
          p.userData.attract(m);
        }
      }
    }
  } else {
    if (qtree.points) {
      let temp = new Mover(qtree.boundary.x, qtree.boundary.y, 0, 0, m.mass * qtree.points.length);
      temp.attract(m);
    }
  }

  if (qtree.divided) {
    attractQuad(m, qtree.northeast);
    attractQuad(m, qtree.northwest);
    attractQuad(m, qtree.southeast);
    attractQuad(m, qtree.southwest);
  }
}
