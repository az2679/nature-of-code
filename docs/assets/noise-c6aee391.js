new p5(e=>{let n=0,t=.01,i;e.setup=()=>{e.createCanvas(400,400),i=e.createSlider(0,10),i.position(20,e.height),i.size(100),e.noLoop()},e.draw=()=>{e.background(50),e.stroke(255),e.noFill(),t=i.value()*.002;var l=n;e.beginShape();for(let a=0;a<e.width;a++){let o=e.map(e.noise(l),0,1,0,e.height-10),s=e.map(e.sin(l),-1,1,-100,100),r=o+s;e.vertex(a,r),l+=t}e.endShape(),n+=t}},"noise1D");new p5(e=>{let n=.01,t;e.setup=()=>{e.createCanvas(400,400),e.pixelDensity(1),t=e.createSlider(0,10),t.position(420,e.height),t.size(100)},e.draw=()=>{e.noiseDetail(t.value()),e.loadPixels();let i=0;for(let l=0;l<e.height;l++){let a=0;for(let o=0;o<e.width;o++){let s=(o+l*e.width)*4,r=e.noise(a,i)*255;e.pixels[s+0]=r,e.pixels[s+1]=r,e.pixels[s+2]=r,e.pixels[s+3]=255,a+=n}i+=n}e.updatePixels()}},"noise2D");new p5(e=>{e.setup=()=>{e.createCanvas(400,400),e.background(100)},e.draw=()=>{}},"test");