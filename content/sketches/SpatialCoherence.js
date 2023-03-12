let videoFile;
let pixelateByColor = true;
let tileCount = 10;

function setup() {
  createCanvas(400, 400);

  // create a checkbox element and position it on the canvas
  const checkbox = createCheckbox('Pixelate by color', pixelateByColor);
  checkbox.position(10, 50);
  checkbox.changed(() => {
    pixelateByColor = !pixelateByColor;
  });

  // create a file input element and position it on the canvas
  const fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);

  // create a slider element and position it on the canvas
  const slider = createSlider(5, 30, tileCount);
  slider.position(10, 90);
  slider.input(() => {
    tileCount = slider.value();
  });

  // create a button element and position it on the canvas
  const button = createButton('Benchmark');
  button.position(10, 130);
  button.mousePressed(runBenchmark);
}

function draw() {
  // draw the pixelated video file on the canvas
  if (videoFile) {
    if (pixelateByColor) {
      pixelateByColorAverage(videoFile, tileCount);
    } else {
      pixelateBySpatialCoherence(videoFile, tileCount);
    }
  }
}

function handleFile(file) {
  // load the uploaded video file and store it in the 'videoFile' variable
  videoFile = createVideo(file.data);
  videoFile.hide();
  videoFile.loop();
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
if (!videoFile) {
return;
}

const iterations = 10;
const tileSize = width/tileCount;

let totalTime = 0;
for (let i = 0; i < iterations; i++) {
const start = millis();
if (!pixelateByColor) {
pixelateBySpatialCoherence(videoFile, tileCount);
} else {
pixelateByColorAverage(videoFile, tileCount);
}
const end = millis();
totalTime += (end - start);
}

const averageTime = totalTime/iterations;

  if(!pixelateByColor){
    console.log("Spatial Coherence time: ", averageTime);    
  }else{
    console.log("Color Coherence time: ", averageTime);
  }

}
