import './modulepreload-polyfill-3cfb730f.js';
let s = [],
  a,
  l,
  p,
  d,
  i = [],
  c,
  f;
window.onload = function () {
  m(), h();
};
function m() {
  createCanvas(windowWidth, windowHeight),
    background(246, 238, 227),
    noStroke(),
    (c = color(248, 148, 143)),
    (f = color(203, 190, 250));
  for (let o = 0; o < 50; o++) {
    let t = p5.Vector.random2D(),
      e = t.copy();
    e.setMag(random(5, 10)), t.setMag(random(150, 200)), e.rotate(PI / 2);
    let n = random(10, 15);
    s[o] = new Mover(t.x, t.y, e.x, e.y, n);
  }
  (l = new Mover(0, 0, 0, 0, 500)), (p = new Mover(-150, -150, 0, 0, 5e3)), (d = new Mover(150, 150, 0, 0, 5e3));
}
function h() {
  clear(), background(160);
  let o = new Rectangle(0, 0, width, height);
  a = Quadtree.create(o, 8);
  for (let t of s) {
    let e = new Point(t.pos.x, t.pos.y, t);
    a.insert(e);
  }
  strokeWeight(20), stroke(255);
  for (let t = 0; t < i.length; t++) point(i[t].pos.x, i[t].pos.y);
  strokeWeight(1);
  for (let t of s) {
    r(t, a), l.attract(t);
    for (let e = 0; e < i.length; e++) i[e].attract(t);
  }
  noStroke(), push(), translate(width / 2, height / 2), fill(0), ellipse(l.pos.x, l.pos.y, 20);
  for (let t = 0; t < s.length; t++) {
    lerpColor(c, f, t / s.length);
    let e = dist(s[t].pos.x, s[t].pos.y, l.pos.x, l.pos.y),
      n = map(e, 0, width * 0.15, 0, 255),
      w = map(e, 0, width * 0.2, 0, 1),
      u = lerpColor(c, f, w);
    fill(u);
    let y = createVector(0, 0.2);
    p5.Vector.mult(y, s[t].mass),
      s[t].intersect(p) ? fill(n) : s[t].intersect(d) ? fill(map(e, 0, width * 0.4, 255, 0)) : fill(u),
      s[t].update(),
      s[t].show();
  }
  stroke(255), noFill(), p.show(), d.show(), pop(), mouseIsPressed && g(), requestAnimationFrame(h);
}
function g() {
  let o = new Mover(mouseX, mouseY, 0, 0, 100);
  i.push(o), o.intersect(l);
}
function r(o, t) {
  if (dist(o.pos.x, o.pos.y, t.boundary.x, t.boundary.y) < 25) {
    if (t.points) for (let n of t.points) o != n.userData && n.userData.attract(o);
  } else t.points && new Mover(t.boundary.x, t.boundary.y, 0, 0, o.mass * t.points.length).attract(o);
  t.divided && (r(o, t.northeast), r(o, t.northwest), r(o, t.southeast), r(o, t.southwest));
}
