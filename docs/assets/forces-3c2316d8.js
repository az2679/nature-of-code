var N = Object.defineProperty;
var S = (e, t, s) => (t in e ? N(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (e[t] = s));
var k = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var x = (e, t, s) => (S(e, typeof t != 'symbol' ? t + '' : t, s), s);
import './modulepreload-polyfill-3cfb730f.js';
var J = k((I, q) => {
  class A {
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
    constructor(t, s, i, h) {
      (this.x = t),
        (this.y = s),
        (this.w = i),
        (this.h = h),
        (this.left = t - i / 2),
        (this.right = t + i / 2),
        (this.top = s - h / 2),
        (this.bottom = s + h / 2);
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
  class C {
    constructor(t, s, i) {
      (this.x = t), (this.y = s), (this.r = i), (this.rSquared = this.r * this.r);
    }
    contains(t) {
      return Math.pow(t.x - this.x, 2) + Math.pow(t.y - this.y, 2) <= this.rSquared;
    }
    intersects(t) {
      let s = Math.abs(t.x - this.x),
        i = Math.abs(t.y - this.y),
        h = this.r,
        n = t.w / 2,
        a = t.h / 2,
        o = Math.pow(s - n, 2) + Math.pow(i - a, 2);
      return s > h + n || i > h + a ? !1 : s <= n || i <= a ? !0 : o <= this.rSquared;
    }
  }
  class l {
    constructor(t, s = this.DEFAULT_CAPACITY, i = 0) {
      x(this, 'DEFAULT_CAPACITY', 8);
      x(this, 'MAX_DEPTH', 8);
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
    static fromJSON(t, s, i, h, n, a, o) {
      if (typeof s > 'u')
        if ('x' in t) (s = t.x), (i = t.y), (h = t.w), (n = t.h), (a = t.capacity), (o = 0);
        else throw TypeError('JSON missing boundary information');
      let r = new l(new d(s, i, h, n), a, o);
      if (
        ((r.points = t.points ?? null),
        (r.divided = r.points === null),
        'ne' in t || 'nw' in t || 'se' in t || 'sw' in t)
      ) {
        const f = r.boundary.x,
          y = r.boundary.y,
          w = r.boundary.w / 2,
          u = r.boundary.h / 2;
        'ne' in t
          ? (r.northeast = l.fromJSON(t.ne, f + w / 2, y - u / 2, w, u, a, o + 1))
          : (r.northeast = new l(r.boundary.subdivide('ne'), a, o + 1)),
          'nw' in t
            ? (r.northwest = l.fromJSON(t.nw, f - w / 2, y - u / 2, w, u, a, o + 1))
            : (r.northwest = new l(r.boundary.subdivide('nw'), a, o + 1)),
          'se' in t
            ? (r.southeast = l.fromJSON(t.se, f + w / 2, y + u / 2, w, u, a, o + 1))
            : (r.southeast = new l(r.boundary.subdivide('se'), a, o + 1)),
          'sw' in t
            ? (r.southwest = l.fromJSON(t.sw, f - w / 2, y + u / 2, w, u, a, o + 1))
            : (r.southwest = new l(r.boundary.subdivide('sw'), a, o + 1));
      }
      return r;
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
      const h = i ** 2;
      return this.kNearest(t, s, h, 0, 0).found;
    }
    kNearest(t, s, i, h, n) {
      let a = [];
      return (
        this.divided
          ? this.children
              .sort((o, r) => o.boundary.sqDistanceFrom(t) - r.boundary.sqDistanceFrom(t))
              .forEach((o) => {
                const r = o.boundary.sqDistanceFrom(t);
                if (!(r > i) && (n < s || r < h)) {
                  const f = o.kNearest(t, s, i, h, n),
                    y = f.found;
                  (a = a.concat(y)), (n += y.length), (h = f.furthestSqDistance);
                }
              })
          : this.points
              .sort((o, r) => o.sqDistanceFrom(t) - r.sqDistanceFrom(t))
              .forEach((o) => {
                const r = o.sqDistanceFrom(t);
                r > i || ((n < s || r < h) && (a.push(o), (h = Math.max(r, h)), n++));
              }),
        {
          found: a.sort((o, r) => o.sqDistanceFrom(t) - r.sqDistanceFrom(t)).slice(0, s),
          furthestSqDistance: Math.sqrt(h),
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
        h = Math.max(this.boundary.right, t.boundary.right),
        n = Math.min(this.boundary.top, t.boundary.top),
        o = Math.max(this.boundary.bottom, t.boundary.bottom) - n,
        r = h - i,
        f = i + r / 2,
        y = n + o / 2,
        w = new d(f, y, r, o),
        u = new l(w, s);
      return this.forEach((b) => u.insert(b)), t.forEach((b) => u.insert(b)), u;
    }
    get length() {
      return this.divided
        ? this.northwest.length + this.northeast.length + this.southwest.length + this.southeast.length
        : this.points.length;
    }
    show() {}
  }
  typeof q < 'u' && (q.exports = { Point: A, Rectangle: d, QuadTree: l, Circle: C });
  class p {
    constructor(t, s, i, h, n) {
      (this.pos = createVector(t, s)),
        (this.vel = createVector(i, h)),
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
        h = (G * (this.mass * t.mass)) / i;
      s.setMag(h), t.applyForce(s);
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
    v,
    m,
    M,
    E,
    g = [],
    D,
    F;
  new p5((e) => {
    (e.setup = () => {
      e.createCanvas(e.windowWidth, e.windowHeight),
        e.background(246, 238, 227),
        e.noStroke(),
        (D = e.color(248, 148, 143)),
        (F = e.color(203, 190, 250));
      for (let s = 0; s < 50; s++) {
        let i = p5.Vector.random2D(),
          h = i.copy();
        h.setMag(e.random(5, 10)), i.setMag(e.random(150, 200)), h.rotate(PI / 2);
        let n = e.random(10, 15);
        c[s] = new p(i.x, i.y, h.x, h.y, n);
      }
      (m = new p(0, 0, 0, 0, 500)), (M = new p(-150, -150, 0, 0, 5e3)), (E = new p(150, 150, 0, 0, 5e3));
    }),
      (e.draw = () => {
        e.clear(), e.background(160);
        let s = new d(0, 0, width, height);
        v = Quadtree.create(s, 8);
        for (let i of c) {
          let h = new A(i.pos.x, i.pos.y, i);
          v.insert(h);
        }
        e.strokeWeight(20), e.stroke(255);
        for (let i = 0; i < g.length; i++) e.point(g[i].pos.x, g[i].pos.y);
        e.strokeWeight(1);
        for (let i of c) {
          t(i, v), m.attract(i);
          for (let h = 0; h < g.length; h++) g[h].attract(i);
        }
        e.noStroke(), e.push(), e.translate(width / 2, height / 2), e.fill(0), e.ellipse(m.pos.x, m.pos.y, 20);
        for (let i = 0; i < c.length; i++) {
          e.lerpColor(D, F, i / c.length);
          let h = e.dist(c[i].pos.x, c[i].pos.y, m.pos.x, m.pos.y),
            n = e.map(h, 0, width * 0.15, 0, 255),
            a = e.map(h, 0, width * 0.2, 0, 1),
            o = e.lerpColor(D, F, a);
          e.fill(o);
          let r = createVector(0, 0.2);
          p5.Vector.mult(r, c[i].mass),
            c[i].intersect(M) ? e.fill(n) : c[i].intersect(E) ? e.fill(e.map(h, 0, width * 0.4, 255, 0)) : e.fill(o),
            c[i].update(),
            c[i].show();
        }
        e.stroke(255), e.noFill(), M.show(), E.show(), e.pop();
      }),
      (e.mousePressed = () => {
        let s = new p(e.mouseX, e.mouseY, 0, 0, 100);
        g.push(s), s.intersect(m);
      });
    function t(s, i) {
      if (e.dist(s.pos.x, s.pos.y, i.boundary.x, i.boundary.y) < 25) {
        if (i.points) for (let n of i.points) s != n.userData && n.userData.attract(s);
      } else i.points && new p(i.boundary.x, i.boundary.y, 0, 0, s.mass * i.points.length).attract(s);
      i.divided && (t(s, i.northeast), t(s, i.northwest), t(s, i.southeast), t(s, i.southwest));
    }
  });
});
export default J();
