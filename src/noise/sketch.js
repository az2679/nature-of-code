function loopCanvas(p) {
  p.loop();
}

new p5((p) => {
  let start = 0;
  let inc = 0.01;
  let slider;
  // let toggle_loop = false;
  p.setup = () => {
    p.createCanvas(400, 400);
    slider = p.createSlider(0, 10);
    slider.position(20, p.height);
    slider.size(100);
    p.noLoop();
  };
  p.draw = () => {
    p.background(50);
    p.stroke(255);
    p.noFill();
    inc = slider.value() * 0.002;
    var xoff = start;
    p.beginShape();
    for (let x = 0; x < p.width; x++) {
      //regular perlin noise
      // let y = p.noise(xoff) * p.height;
      //mainly perlin with a bit of sin wave
      let n = p.map(p.noise(xoff), 0, 1, 0, p.height - 10);
      let s = p.map(p.sin(xoff), -1, 1, -100, 100);
      let y = n + s;
      //
      p.vertex(x, y);
      xoff += inc;
    }
    p.endShape();
    start += inc;
  };
  // p.mousePressed = () => {
  //   if (toggle_loop) {
  //     p.noLoop();
  //     toggle_loop = false;
  //   } else {
  //     p.loop();
  //     toggle_loop = true;
  //   }
  // };
}, 'noise1D');

new p5((p) => {
  let inc = 0.01;
  let slider;
  p.setup = () => {
    p.createCanvas(400, 400);
    p.pixelDensity(1);
    slider = p.createSlider(0, 10);
    slider.position(420, p.height);
    slider.size(100);
  };
  p.draw = () => {
    p.noiseDetail(slider.value());
    p.loadPixels();
    let yoff = 0;
    for (let y = 0; y < p.height; y++) {
      let xoff = 0;
      for (let x = 0; x < p.width; x++) {
        let index = (x + y * p.width) * 4;
        let r = p.noise(xoff, yoff) * 255;
        p.pixels[index + 0] = r;
        p.pixels[index + 1] = r;
        p.pixels[index + 2] = r;
        p.pixels[index + 3] = 255;
        xoff += inc;
      }
      yoff += inc;
    }
    p.updatePixels();
  };
}, 'noise2D');

new p5((sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
    sketch.background(100);
  };
  sketch.draw = () => {};
}, 'test');
