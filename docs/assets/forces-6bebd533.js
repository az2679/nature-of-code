import './modulepreload-polyfill-3cfb730f.js';
var p = Object.defineProperty;
var g = (y, t, s) => (t in y ? p(y, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (y[t] = s));
var E = (y, t) => () => (t || y((t = { exports: {} }).exports, t), t.exports);
var m = (y, t, s) => (g(y, typeof t != 'symbol' ? t + '' : t, s), s);
import './modulepreload-polyfill-3cfb730f.js';
var D = E((F, b) => {
  class v {
    constructor(t, s, h) {
      (this.x = t), (this.y = s), (this.userData = h);
    }
    sqDistanceFrom(t) {
      const s = t.x - this.x,
        h = t.y - this.y;
      return s * s + h * h;
    }
    distanceFrom(t) {
      return Math.sqrt(this.sqDistanceFrom(t));
    }
  }
  class d {
    constructor(t, s, h, r) {
      (this.x = t),
        (this.y = s),
        (this.w = h),
        (this.h = r),
        (this.left = t - h / 2),
        (this.right = t + h / 2),
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
        h = this.yDistanceFrom(t);
      return s * s + h * h;
    }
    distanceFrom(t) {
      return Math.sqrt(this.sqDistanceFrom(t));
    }
  }
  class x {
    constructor(t, s, h) {
      (this.x = t), (this.y = s), (this.r = h), (this.rSquared = this.r * this.r);
    }
    contains(t) {
      return Math.pow(t.x - this.x, 2) + Math.pow(t.y - this.y, 2) <= this.rSquared;
    }
    intersects(t) {
      let s = Math.abs(t.x - this.x),
        h = Math.abs(t.y - this.y),
        r = this.r,
        u = t.w / 2,
        n = t.h / 2,
        e = Math.pow(s - u, 2) + Math.pow(h - n, 2);
      return s > r + u || h > r + n ? !1 : s <= u || h <= n ? !0 : e <= this.rSquared;
    }
  }
  class o {
    constructor(t, s = this.DEFAULT_CAPACITY, h = 0) {
      m(this, 'DEFAULT_CAPACITY', 8);
      m(this, 'MAX_DEPTH', 8);
      if (!t) throw TypeError('boundary is null or undefined');
      if (!(t instanceof d)) throw TypeError('boundary should be a Rectangle');
      if (typeof s != 'number') throw TypeError(`capacity should be a number but is a ${typeof s}`);
      if (s < 1) throw RangeError('capacity must be greater than 0');
      (this.boundary = t), (this.capacity = s), (this.points = []), (this.divided = !1), (this.depth = h);
    }
    get children() {
      return this.divided ? [this.northeast, this.northwest, this.southeast, this.southwest] : [];
    }
    static create() {
      if (arguments.length === 0) {
        if (typeof width > 'u') throw new TypeError('No global width defined');
        if (typeof height > 'u') throw new TypeError('No global height defined');
        let t = new d(width / 2, height / 2, width, height);
        return new o(t, this.DEFAULT_CAPACITY);
      }
      if (arguments[0] instanceof d) {
        let t = arguments[1] || this.DEFAULT_CAPACITY;
        return new o(arguments[0], t);
      }
      if (
        typeof arguments[0] == 'number' &&
        typeof arguments[1] == 'number' &&
        typeof arguments[2] == 'number' &&
        typeof arguments[3] == 'number'
      ) {
        let t = arguments[4] || this.DEFAULT_CAPACITY;
        return new o(new d(arguments[0], arguments[1], arguments[2], arguments[3]), t);
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
    static fromJSON(t, s, h, r, u, n, e) {
      if (typeof s > 'u')
        if ('x' in t) (s = t.x), (h = t.y), (r = t.w), (u = t.h), (n = t.capacity), (e = 0);
        else throw TypeError('JSON missing boundary information');
      let i = new o(new d(s, h, r, u), n, e);
      if (
        ((i.points = t.points ?? null),
        (i.divided = i.points === null),
        'ne' in t || 'nw' in t || 'se' in t || 'sw' in t)
      ) {
        const l = i.boundary.x,
          f = i.boundary.y,
          w = i.boundary.w / 2,
          a = i.boundary.h / 2;
        'ne' in t
          ? (i.northeast = o.fromJSON(t.ne, l + w / 2, f - a / 2, w, a, n, e + 1))
          : (i.northeast = new o(i.boundary.subdivide('ne'), n, e + 1)),
          'nw' in t
            ? (i.northwest = o.fromJSON(t.nw, l - w / 2, f - a / 2, w, a, n, e + 1))
            : (i.northwest = new o(i.boundary.subdivide('nw'), n, e + 1)),
          'se' in t
            ? (i.southeast = o.fromJSON(t.se, l + w / 2, f + a / 2, w, a, n, e + 1))
            : (i.southeast = new o(i.boundary.subdivide('se'), n, e + 1)),
          'sw' in t
            ? (i.southwest = o.fromJSON(t.sw, l - w / 2, f + a / 2, w, a, n, e + 1))
            : (i.southwest = new o(i.boundary.subdivide('sw'), n, e + 1));
      }
      return i;
    }
    subdivide() {
      (this.northeast = new o(this.boundary.subdivide('ne'), this.capacity, this.depth + 1)),
        (this.northwest = new o(this.boundary.subdivide('nw'), this.capacity, this.depth + 1)),
        (this.southeast = new o(this.boundary.subdivide('se'), this.capacity, this.depth + 1)),
        (this.southwest = new o(this.boundary.subdivide('sw'), this.capacity, this.depth + 1)),
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
      for (const h of this.points) t.contains(h) && s.push(h);
      return s;
    }
    closest(t, s = 1, h = 1 / 0) {
      if (typeof t > 'u') throw TypeError("Method 'closest' needs a point");
      const r = h ** 2;
      return this.kNearest(t, s, r, 0, 0).found;
    }
    kNearest(t, s, h, r, u) {
      let n = [];
      return (
        this.divided
          ? this.children
              .sort((e, i) => e.boundary.sqDistanceFrom(t) - i.boundary.sqDistanceFrom(t))
              .forEach((e) => {
                const i = e.boundary.sqDistanceFrom(t);
                if (!(i > h) && (u < s || i < r)) {
                  const l = e.kNearest(t, s, h, r, u),
                    f = l.found;
                  (n = n.concat(f)), (u += f.length), (r = l.furthestSqDistance);
                }
              })
          : this.points
              .sort((e, i) => e.sqDistanceFrom(t) - i.sqDistanceFrom(t))
              .forEach((e) => {
                const i = e.sqDistanceFrom(t);
                i > h || ((u < s || i < r) && (n.push(e), (r = Math.max(i, r)), u++));
              }),
        {
          found: n.sort((e, i) => e.sqDistanceFrom(t) - i.sqDistanceFrom(t)).slice(0, s),
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
      let h = Math.min(this.boundary.left, t.boundary.left),
        r = Math.max(this.boundary.right, t.boundary.right),
        u = Math.min(this.boundary.top, t.boundary.top),
        e = Math.max(this.boundary.bottom, t.boundary.bottom) - u,
        i = r - h,
        l = h + i / 2,
        f = u + e / 2,
        w = new d(l, f, i, e),
        a = new o(w, s);
      return this.forEach((c) => a.insert(c)), t.forEach((c) => a.insert(c)), a;
    }
    get length() {
      return this.divided
        ? this.northwest.length + this.northeast.length + this.southwest.length + this.southeast.length
        : this.points.length;
    }
    show() {
      rectMode(CENTER),
        rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h),
        this.divided && (this.northeast.show(), this.northwest.show(), this.southeast.show(), this.southwest.show());
    }
  }
  typeof b < 'u' && (b.exports = { Point: v, Rectangle: d, QuadTree: o, Circle: x });
});
export default D();
