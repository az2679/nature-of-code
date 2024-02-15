import Mover from './mover.js';
import { Point, Rectangle } from './quadtree.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/p5.js';

let movers = [];
let qtree;
let sun, paint, paint1;
let moons = [];
let color1, color2;

let G = 0.35;
let dragC = 0.5;
let mu = 0.2;

// window.onload = function () {
//   setup();
//   draw();
// };

new p5((p) => {
  p.setup = () => {
    setup1();
  };
  p.draw = () => {
    draw1();
  };
  p.mousePressed = mousePressed1;
});

// new p5((p) => {
// p.setup = () => {setup()};
// p.draw = () => {draw()};
// p.mousePressed = () => {mousePressed()};

//   p.mousePressed = mousePressed;
// });

function setup1() {
  createCanvas(windowWidth, windowHeight);
  background(246, 238, 227);
  noStroke();

  color1 = color(248, 148, 143);
  color2 = color(203, 190, 250);

  for (let i = 0; i < 50; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(5, 10));
    pos.setMag(random(150, 200));
    vel.rotate(PI / 2);
    let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
  paint = new Mover(-150, -150, 0, 0, 5000);
  paint1 = new Mover(150, 150, 0, 0, 5000);
}

function draw1() {
  clear();
  background(160);
  // blendMode(ADD);

  let boundary = new Rectangle(0, 0, width, height);
  qtree = Quadtree.create(boundary, 8);

  for (let m of movers) {
    let point = new Point(m.pos.x, m.pos.y, m);
    qtree.insert(point);
  }

  strokeWeight(20);
  stroke(255);
  for (let i = 0; i < moons.length; i++) {
    // moons[i].show();
    point(moons[i].pos.x, moons[i].pos.y);
  }

  strokeWeight(1);

  for (let mover of movers) {
    attractQuad(mover, qtree);
    sun.attract(mover);

    for (let i = 0; i < moons.length; i++) {
      moons[i].attract(mover);
    }
  }

  noStroke();

  push();
  translate(width / 2, height / 2);

  fill(0);
  ellipse(sun.pos.x, sun.pos.y, 20);

  for (let i = 0; i < movers.length; i++) {
    let colorLerp = lerpColor(color1, color2, i / movers.length);

    let d = dist(movers[i].pos.x, movers[i].pos.y, sun.pos.x, sun.pos.y);
    let dmapped = map(d, 0, width * 0.15, 0, 255);

    let distlerp = map(d, 0, width * 0.2, 0, 1);
    let dlerp = lerpColor(color1, color2, distlerp);
    fill(dlerp);

    let gravity = createVector(0, 0.2);
    let weight = p5.Vector.mult(gravity, movers[i].mass);
    // movers[i].applyForce(weight);
    // movers[i].friction();

    if (movers[i].intersect(paint)) {
      fill(dmapped);
    } else if (movers[i].intersect(paint1)) {
      fill(map(d, 0, width * 0.4, 255, 0));
    } else {
      fill(dlerp);
    }

    movers[i].update();
    movers[i].show();
  }

  stroke(255);
  noFill();
  // sun.show();
  paint.show();
  paint1.show();
  // qtree.show();
  pop();

  // if (moons.length > 1) {
  // console.log(moons[0].intersect(sun));
  // }

  //
  //
  // if (mouseIsPressed) {
  //   mousePressed();
  // }

  // requestAnimationFrame(draw);
}

function mousePressed1() {
  let moon = new Mover(mouseX, mouseY, 0, 0, 100);
  moons.push(moon);

  // console.log(moon.intersect(sun));

  if (moon.intersect(sun)) {
    // moons.splice(0, moons.length)
    // console.log('test');
  }
}

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
