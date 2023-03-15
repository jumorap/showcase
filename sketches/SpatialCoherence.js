let videoFile;
let pixelateType = null;
let tileCount = 10;

function setup() {
  createCanvas(800, 400);

  // create a file input element and position it on the canvas
  const fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);

  // create a button element and position it on the canvas
  const button = createButton("A");
  button.position(10, 50);
  button.mousePressed(() => {
    pixelateType = "color";
  });

  // create a button element and position it on the canvas
  const button2 = createButton("C");
  button2.position(30, 50);
  button2.mousePressed(() => {
    pixelateType = "coherence";
  });
  
  const button3 = createButton("Benchmark");
  button3.position(50, 50);
  button3.mousePressed(runBenchmark);


  // create a button element and position it on the canvas
  const button4 = createButton("+");
  button4.position(10, 80);
  button4.mousePressed(() => {
    tileCount = min(tileCount + 5, 50);
  });

  // create a button element and position it on the canvas
  const button5 = createButton("-");
  button5.position(30, 80);
  button5.mousePressed(() => {
    tileCount = max(tileCount - 5, 5);
  });
}

function draw() {
  // draw the original video file on the left side of the canvas
  if (videoFile) {
    image(videoFile, 0, 0, width / 2, height);
    
    if (key === 'c' || key === 'C') {
      pixelateType = "coherence";
    } else if (key === 'a' || key === 'A') {
      pixelateType = "color";
    } else if (key === '+') {
       tileCount = min(tileCount + 5, 40);
    } else if (key === "-"){
      tileCount = max(tileCount - 5, 5);
    }

    // draw the pixelated video file on the right side of the canvas
    push();
    translate(width / 2, 0);
    if (pixelateType === "color") {
      pixelateByColorAverage(videoFile, tileCount);
    } else if (pixelateType === "coherence") {
      pixelateBySpatialCoherence(videoFile, tileCount);
    }
    pop();
  }
}

function handleFile(file) {
  // load the uploaded video file and store it in the 'videoFile' variable
  videoFile = createVideo(file.data);
  videoFile.loop();
  videoFile.hide();
}

function pixelateByColorAverage(video, tileCount) {
  const tileSize = width/tileCount;
  
  video.loadPixels();
  
  for (let x = 0; x < video.width; x += tileSize) {
    for (let y = 0; y < video.height; y += tileSize) {
      const i = (y * video.width + x) * 4;
      let r = 0, g = 0, b = 0;
      let count = 0;
      for (let tx = 0; tx < tileSize; tx++) {
        for (let ty = 0; ty < tileSize; ty++) {
          const ii = ((y+ty) * video.width + (x+tx)) * 4;
          r += video.pixels[ii];
          g += video.pixels[ii+1];
          b += video.pixels[ii+2];
          count++;
        }
      }
      r /= count;
      g /= count;
      b /= count;
      noStroke();
      fill(r, g, b);
      rect(x, y, tileSize, tileSize);
    }
  }
}

function pixelateBySpatialCoherence(video, tileCount) {
  const tileSize = width/tileCount;
  
  video.loadPixels();
  
  for (let x = 0; x < video.width; x += tileSize) {
    for (let y = 0; y < video.height; y += tileSize) {
      const i = (y * video.width + x) * 4;
      const r = video.pixels[i];
      const g = video.pixels[i+1];
      const b = video.pixels[i+2];
      noStroke();
      fill(r, g, b);
      rect(x, y, tileSize, tileSize);
    }
  }
}

function runBenchmark() {
  const startTime = performance.now();
  
  // run pixelateByColorAverage 100 times
  for (let i = 0; i < 100; i++) {
    pixelateByColorAverage(videoFile, tileCount);
  }
  
  const elapsedTimeColor = performance.now() - startTime;
  
  // reset start time
  const startTime2 = performance.now();
  
  // run pixelateBySpatialCoherence 100 times
  for (let i = 0; i < 100; i++) {
    pixelateBySpatialCoherence(videoFile, tileCount);
  }
  
  const elapsedTimeCoherence = performance.now() - startTime2;
  alert(`
    Elapsed time (coherence): ${elapsedTimeCoherence} ms
    Elapsed time (color): ${elapsedTimeColor} ms
  `);
}

