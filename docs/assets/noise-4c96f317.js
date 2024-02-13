import './modulepreload-polyfill-3cfb730f.js';
new p5((e) => {
  let n = 0,
    t = 0.01,
    i;
  (e.setup = () => {
    e.createCanvas(400, 400), (i = e.createSlider(0, 10)), i.position(20, e.height), i.size(100), e.noLoop();
  }),
    (e.draw = () => {
      e.background(50), e.stroke(255), e.noFill(), (t = i.value() * 0.002);
      var l = n;
      e.beginShape();
      for (let s = 0; s < e.width; s++) {
        let o = e.map(e.noise(l), 0, 1, 0, e.height - 10),
          a = e.map(e.sin(l), -1, 1, -100, 100),
          r = o + a;
        e.vertex(s, r), (l += t);
      }
      e.endShape(), (n += t);
    });
}, 'noise1D');
new p5((e) => {
  let n = 0.01,
    t;
  (e.setup = () => {
    e.createCanvas(400, 400), e.pixelDensity(1), (t = e.createSlider(0, 10)), t.position(420, e.height), t.size(100);
  }),
    (e.draw = () => {
      e.noiseDetail(t.value()), e.loadPixels();
      let i = 0;
      for (let l = 0; l < e.height; l++) {
        let s = 0;
        for (let o = 0; o < e.width; o++) {
          let a = (o + l * e.width) * 4,
            r = e.noise(s, i) * 255;
          (e.pixels[a + 0] = r), (e.pixels[a + 1] = r), (e.pixels[a + 2] = r), (e.pixels[a + 3] = 255), (s += n);
        }
        i += n;
      }
      e.updatePixels();
    });
}, 'noise2D');
new p5((e) => {
  (e.setup = () => {
    e.createCanvas(400, 400), e.background(100);
  }),
    (e.draw = () => {});
}, 'test');
