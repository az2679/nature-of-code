import Mover from './mover.js';
import Attractor from './attractor.js';
import { Point, Rectangle, QuadTree, Circle } from './quadtree.js';

let movers = [];
let qtree;
let sun, paint, paint1;
let moons = [];
let color1, color2;

let G = 0.35;
let dragC = 0.5;
let mu = 0.2;

new p5((p) => {
  function setup() {
    p.createCanvas(windowWidth, windowHeight);
    p.background(246, 238, 227);
    p.noStroke();

    color1 = p.color(248, 148, 143);
    color2 = p.color(203, 190, 250);

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

  function draw() {
    p.clear();
    p.background(160);
    // blendMode(ADD);

    let boundary = new Rectangle(0, 0, width, height);
    qtree = Quadtree.create(boundary, 8);

    for (let m of movers) {
      let point = new Point(m.pos.x, m.pos.y, m);
      qtree.insert(point);
    }

    p.strokeWeight(20);
    p.stroke(255);
    for (let i = 0; i < moons.length; i++) {
      // moons[i].show();
      p.point(moons[i].pos.x, moons[i].pos.y);
    }

    p.strokeWeight(1);

    for (let mover of movers) {
      attractQuad(mover, qtree);
      sun.attract(mover);

      for (let i = 0; i < moons.length; i++) {
        moons[i].attract(mover);
      }
    }

    p.noStroke();

    p.push();
    p.translate(width / 2, height / 2);

    p.fill(0);
    p.ellipse(sun.pos.x, sun.pos.y, 20);

    for (let i = 0; i < movers.length; i++) {
      let colorLerp = p.lerpColor(color1, color2, i / movers.length);

      let d = p.dist(movers[i].pos.x, movers[i].pos.y, sun.pos.x, sun.pos.y);
      let dmapped = p.map(d, 0, width * 0.15, 0, 255);

      let distlerp = p.map(d, 0, width * 0.2, 0, 1);
      let dlerp = p.lerpColor(color1, color2, distlerp);
      p.fill(dlerp);

      let gravity = p.createVector(0, 0.2);
      let weight = p5.Vector.mult(gravity, movers[i].mass);
      // movers[i].applyForce(weight);
      // movers[i].friction();

      if (movers[i].intersect(paint)) {
        p.fill(dmapped);
      } else if (movers[i].intersect(paint1)) {
        p.fill(p.map(d, 0, width * 0.4, 255, 0));
      } else {
        p.fill(dlerp);
      }

      movers[i].update();
      movers[i].show();
    }

    p.stroke(255);
    p.noFill();
    // sun.show();
    paint.show();
    paint1.show();
    // qtree.show();
    p.pop();

    // if (moons.length > 1) {
    // console.log(moons[0].intersect(sun));
    // }
  }

  function mousePressed() {
    let moon = new Mover(mouseX, mouseY, 0, 0, 100);
    moons.push(moon);

    // console.log(moon.intersect(sun));

    if (moon.intersect(sun)) {
      // moons.splice(0, moons.length)
      // console.log('test');
    }
  }

  function attractQuad(m, qtree) {
    let d = p.dist(m.pos.x, m.pos.y, qtree.boundary.x, qtree.boundary.y);
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
});
