var k = Object.defineProperty;
var C = (h, t, s) => (t in h ? k(h, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (h[t] = s));
var J = (h, t) => () => (t || h((t = { exports: {} }).exports, t), t.exports);
var v = (h, t, s) => (C(h, typeof t != 'symbol' ? t + '' : t, s), s);
import './modulepreload-polyfill-3cfb730f.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.8.0/p5.js';
var Y = J((X, A) => {
  class N {
    constructor(t, s, i) {
      (this.x = t), (this.y = s), (this.userData = i);
    }
    sqDistanceFrom(t) {
      const s = t.x - this.x,
        i = t.y - this.y;
      return s * s + i * i;
    }
    distanceFrom(t) {
      return Math.sqrt(this.sqDistanceFrom(t));
    }
  }
  class d {
    constructor(t, s, i, r) {
      (this.x = t),
        (this.y = s),
        (this.w = i),
        (this.h = r),
        (this.left = t - i / 2),
        (this.right = t + i / 2),
        (this.top = s - r / 2),
        (this.bottom = s + r / 2);
    }
    contains(t) {
      return this.left <= t.x && t.x <= this.right && this.top <= t.y && t.y <= this.bottom;
    }
    intersects(t) {
      return !(this.right < t.left || t.right < this.left || this.bottom < t.top || t.bottom < this.top);
    }
    subdivide(t) {
      switch (t) {
        case 'ne':
          return new d(this.x + this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
        case 'nw':
          return new d(this.x - this.w / 4, this.y - this.h / 4, this.w / 2, this.h / 2);
        case 'se':
          return new d(this.x + this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
        case 'sw':
          return new d(this.x - this.w / 4, this.y + this.h / 4, this.w / 2, this.h / 2);
      }
    }
    xDistanceFrom(t) {
      return this.left <= t.x && t.x <= this.right
        ? 0
        : Math.min(Math.abs(t.x - this.left), Math.abs(t.x - this.right));
    }
    yDistanceFrom(t) {
      return this.top <= t.y && t.y <= this.bottom
        ? 0
        : Math.min(Math.abs(t.y - this.top), Math.abs(t.y - this.bottom));
    }
    sqDistanceFrom(t) {
      const s = this.xDistanceFrom(t),
        i = this.yDistanceFrom(t);
      return s * s + i * i;
    }
    distanceFrom(t) {
      return Math.sqrt(this.sqDistanceFrom(t));
    }
  }
  class O {
    constructor(t, s, i) {
      (this.x = t), (this.y = s), (this.r = i), (this.rSquared = this.r * this.r);
    }
    contains(t) {
      return Math.pow(t.x - this.x, 2) + Math.pow(t.y - this.y, 2) <= this.rSquared;
    }
    intersects(t) {
      let s = Math.abs(t.x - this.x),
        i = Math.abs(t.y - this.y),
        r = this.r,
        n = t.w / 2,
        a = t.h / 2,
        o = Math.pow(s - n, 2) + Math.pow(i - a, 2);
      return s > r + n || i > r + a ? !1 : s <= n || i <= a ? !0 : o <= this.rSquared;
    }
  }
  class l {
    constructor(t, s = this.DEFAULT_CAPACITY, i = 0) {
      v(this, 'DEFAULT_CAPACITY', 8);
      v(this, 'MAX_DEPTH', 8);
      if (!t) throw TypeError('boundary is null or undefined');
      if (!(t instanceof d)) throw TypeError('boundary should be a Rectangle');
      if (typeof s != 'number') throw TypeError(`capacity should be a number but is a ${typeof s}`);
      if (s < 1) throw RangeError('capacity must be greater than 0');
      (this.boundary = t), (this.capacity = s), (this.points = []), (this.divided = !1), (this.depth = i);
    }
    get children() {
      return this.divided ? [this.northeast, this.northwest, this.southeast, this.southwest] : [];
    }
    static create() {
      if (arguments.length === 0) {
        if (typeof width > 'u') throw new TypeError('No global width defined');
        if (typeof height > 'u') throw new TypeError('No global height defined');
        let t = new d(width / 2, height / 2, width, height);
        return new l(t, this.DEFAULT_CAPACITY);
      }
      if (arguments[0] instanceof d) {
        let t = arguments[1] || this.DEFAULT_CAPACITY;
        return new l(arguments[0], t);
      }
      if (
        typeof arguments[0] == 'number' &&
        typeof arguments[1] == 'number' &&
        typeof arguments[2] == 'number' &&
        typeof arguments[3] == 'number'
      ) {
        let t = arguments[4] || this.DEFAULT_CAPACITY;
        return new l(new d(arguments[0], arguments[1], arguments[2], arguments[3]), t);
      }
      throw new TypeError('Invalid parameters');
    }
    toJSON() {
      let t = {};
      return (
        this.divided
          ? ((this.northeast.divided || this.northeast.points.length > 0) && (t.ne = this.northeast.toJSON()),
            (this.northwest.divided || this.northwest.points.length > 0) && (t.nw = this.northwest.toJSON()),
            (this.southeast.divided || this.southeast.points.length > 0) && (t.se = this.southeast.toJSON()),
            (this.southwest.divided || this.southwest.points.length > 0) && (t.sw = this.southwest.toJSON()))
          : (t.points = this.points),
        this.depth === 0 &&
          ((t.capacity = this.capacity),
          (t.x = this.boundary.x),
          (t.y = this.boundary.y),
          (t.w = this.boundary.w),
          (t.h = this.boundary.h)),
        t
      );
    }
    static fromJSON(t, s, i, r, n, a, o) {
      if (typeof s > 'u')
        if ('x' in t) (s = t.x), (i = t.y), (r = t.w), (n = t.h), (a = t.capacity), (o = 0);
        else throw TypeError('JSON missing boundary information');
      let e = new l(new d(s, i, r, n), a, o);
      if (
        ((e.points = t.points ?? null),
        (e.divided = e.points === null),
        'ne' in t || 'nw' in t || 'se' in t || 'sw' in t)
      ) {
        const w = e.boundary.x,
          f = e.boundary.y,
          p = e.boundary.w / 2,
          u = e.boundary.h / 2;
        'ne' in t
          ? (e.northeast = l.fromJSON(t.ne, w + p / 2, f - u / 2, p, u, a, o + 1))
          : (e.northeast = new l(e.boundary.subdivide('ne'), a, o + 1)),
          'nw' in t
            ? (e.northwest = l.fromJSON(t.nw, w - p / 2, f - u / 2, p, u, a, o + 1))
            : (e.northwest = new l(e.boundary.subdivide('nw'), a, o + 1)),
          'se' in t
            ? (e.southeast = l.fromJSON(t.se, w + p / 2, f + u / 2, p, u, a, o + 1))
            : (e.southeast = new l(e.boundary.subdivide('se'), a, o + 1)),
          'sw' in t
            ? (e.southwest = l.fromJSON(t.sw, w - p / 2, f + u / 2, p, u, a, o + 1))
            : (e.southwest = new l(e.boundary.subdivide('sw'), a, o + 1));
      }
      return e;
    }
    subdivide() {
      (this.northeast = new l(this.boundary.subdivide('ne'), this.capacity, this.depth + 1)),
        (this.northwest = new l(this.boundary.subdivide('nw'), this.capacity, this.depth + 1)),
        (this.southeast = new l(this.boundary.subdivide('se'), this.capacity, this.depth + 1)),
        (this.southwest = new l(this.boundary.subdivide('sw'), this.capacity, this.depth + 1)),
        (this.divided = !0);
      for (const t of this.points)
        if (
          !(
            this.northeast.insert(t) ||
            this.northwest.insert(t) ||
            this.southeast.insert(t) ||
            this.southwest.insert(t)
          )
        )
          throw RangeError('capacity must be greater than 0');
      this.points = null;
    }
    insert(t) {
      if (!this.boundary.contains(t)) return !1;
      if (!this.divided) {
        if (this.points.length < this.capacity || this.depth === this.MAX_DEPTH) return this.points.push(t), !0;
        this.subdivide();
      }
      return (
        this.northeast.insert(t) || this.northwest.insert(t) || this.southeast.insert(t) || this.southwest.insert(t)
      );
    }
    query(t, s) {
      if ((s || (s = []), !t.intersects(this.boundary))) return s;
      if (this.divided)
        return (
          this.northwest.query(t, s),
          this.northeast.query(t, s),
          this.southwest.query(t, s),
          this.southeast.query(t, s),
          s
        );
      for (const i of this.points) t.contains(i) && s.push(i);
      return s;
    }
    closest(t, s = 1, i = 1 / 0) {
      if (typeof t > 'u') throw TypeError("Method 'closest' needs a point");
      const r = i ** 2;
      return this.kNearest(t, s, r, 0, 0).found;
    }
    kNearest(t, s, i, r, n) {
      let a = [];
      return (
        this.divided
          ? this.children
              .sort((o, e) => o.boundary.sqDistanceFrom(t) - e.boundary.sqDistanceFrom(t))
              .forEach((o) => {
                const e = o.boundary.sqDistanceFrom(t);
                if (!(e > i) && (n < s || e < r)) {
                  const w = o.kNearest(t, s, i, r, n),
                    f = w.found;
                  (a = a.concat(f)), (n += f.length), (r = w.furthestSqDistance);
                }
              })
          : this.points
              .sort((o, e) => o.sqDistanceFrom(t) - e.sqDistanceFrom(t))
              .forEach((o) => {
                const e = o.sqDistanceFrom(t);
                e > i || ((n < s || e < r) && (a.push(o), (r = Math.max(e, r)), n++));
              }),
        {
          found: a.sort((o, e) => o.sqDistanceFrom(t) - e.sqDistanceFrom(t)).slice(0, s),
          furthestSqDistance: Math.sqrt(r),
        }
      );
    }
    forEach(t) {
      this.divided
        ? (this.northeast.forEach(t), this.northwest.forEach(t), this.southeast.forEach(t), this.southwest.forEach(t))
        : this.points.forEach(t);
    }
    merge(t, s) {
      let i = Math.min(this.boundary.left, t.boundary.left),
        r = Math.max(this.boundary.right, t.boundary.right),
        n = Math.min(this.boundary.top, t.boundary.top),
        o = Math.max(this.boundary.bottom, t.boundary.bottom) - n,
        e = r - i,
        w = i + e / 2,
        f = n + o / 2,
        p = new d(w, f, e, o),
        u = new l(p, s);
      return this.forEach((x) => u.insert(x)), t.forEach((x) => u.insert(x)), u;
    }
    get length() {
      return this.divided
        ? this.northwest.length + this.northeast.length + this.southwest.length + this.southeast.length
        : this.points.length;
    }
    show() {}
  }
  typeof A < 'u' && (A.exports = { Point: N, Rectangle: d, QuadTree: l, Circle: O });
  class g {
    constructor(t, s, i, r, n) {
      (this.pos = createVector(t, s)),
        (this.vel = createVector(i, r)),
        (this.acc = createVector(0, 0)),
        (this.mass = n),
        (this.r = sqrt(this.mass) * 2);
    }
    intersect(t) {
      return dist(this.pos.x, this.pos.y, t.pos.x, t.pos.y) < this.r + t.r;
    }
    repulse(t) {
      let s = p5.Vector.sub(this.pos, t.pos),
        i = constrain(s.magSq(), 100, 1e3),
        n = (1 * (this.mass * t.mass)) / i;
      s.setMag(n), s.mult(-1), t.applyForce(s);
    }
    attract(t) {
      let s = p5.Vector.sub(this.pos, t.pos),
        i = constrain(s.magSq(), 100, 1e3),
        r = (G * (this.mass * t.mass)) / i;
      s.setMag(r), t.applyForce(s);
    }
    drag(t) {
      let s = this.vel.copy();
      s.normalize(), s.mult(-1);
      let i = this.vel.magSq();
      s.setMag(t * i), this.applyForce(s);
    }
    friction() {
      if (height - (this.pos.y + this.r) < 1) {
        let s = this.vel.copy();
        s.normalize(), s.mult(-1);
        let i = this.mass;
        s.setMag(mu * i), this.applyForce(s);
      }
    }
    applyForce(t) {
      let s = p5.Vector.div(t, this.mass);
      this.acc.add(s);
    }
    edges() {
      this.pos.y >= height - this.r && ((this.pos.y = height - this.r), (this.vel.y *= -1)),
        this.pos.x >= width - this.r
          ? ((this.pos.x = width - this.r), (this.vel.x *= -1))
          : this.pos.x <= this.r && ((this.pos.x = this.r), (this.vel.x *= -1));
    }
    update() {
      this.vel.add(this.acc), this.pos.add(this.vel), this.acc.set(0, 0);
    }
    show() {
      ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
  }
  let c = [],
    M,
    y,
    E,
    D,
    m = [],
    F,
    q;
  window.onload = function () {
    I(), S();
  };
  function I() {
    createCanvas(windowWidth, windowHeight),
      background(246, 238, 227),
      noStroke(),
      (F = color(248, 148, 143)),
      (q = color(203, 190, 250));
    for (let h = 0; h < 50; h++) {
      let t = p5.Vector.random2D(),
        s = t.copy();
      s.setMag(random(5, 10)), t.setMag(random(150, 200)), s.rotate(PI / 2);
      let i = random(10, 15);
      c[h] = new g(t.x, t.y, s.x, s.y, i);
    }
    (y = new g(0, 0, 0, 0, 500)), (E = new g(-150, -150, 0, 0, 5e3)), (D = new g(150, 150, 0, 0, 5e3));
  }
  function S() {
    clear(), background(160);
    let h = new d(0, 0, width, height);
    M = Quadtree.create(h, 8);
    for (let t of c) {
      let s = new N(t.pos.x, t.pos.y, t);
      M.insert(s);
    }
    strokeWeight(20), stroke(255);
    for (let t = 0; t < m.length; t++) point(m[t].pos.x, m[t].pos.y);
    strokeWeight(1);
    for (let t of c) {
      b(t, M), y.attract(t);
      for (let s = 0; s < m.length; s++) m[s].attract(t);
    }
    noStroke(), push(), translate(width / 2, height / 2), fill(0), ellipse(y.pos.x, y.pos.y, 20);
    for (let t = 0; t < c.length; t++) {
      lerpColor(F, q, t / c.length);
      let s = dist(c[t].pos.x, c[t].pos.y, y.pos.x, y.pos.y),
        i = map(s, 0, width * 0.15, 0, 255),
        r = map(s, 0, width * 0.2, 0, 1),
        n = lerpColor(F, q, r);
      fill(n);
      let a = createVector(0, 0.2);
      p5.Vector.mult(a, c[t].mass),
        c[t].intersect(E) ? fill(i) : c[t].intersect(D) ? fill(map(s, 0, width * 0.4, 255, 0)) : fill(n),
        c[t].update(),
        c[t].show();
    }
    stroke(255), noFill(), E.show(), D.show(), pop(), mouseIsPressed && V(), requestAnimationFrame(S);
  }
  function V() {
    let h = new g(mouseX, mouseY, 0, 0, 100);
    m.push(h), h.intersect(y);
  }
  function b(h, t) {
    if (dist(h.pos.x, h.pos.y, t.boundary.x, t.boundary.y) < 25) {
      if (t.points) for (let i of t.points) h != i.userData && i.userData.attract(h);
    } else t.points && new g(t.boundary.x, t.boundary.y, 0, 0, h.mass * t.points.length).attract(h);
    t.divided && (b(h, t.northeast), b(h, t.northwest), b(h, t.southeast), b(h, t.southwest));
  }
});
export default Y();
