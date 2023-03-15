# Mach Bands

{{< hint info >}}
**Exercise**

Temporal coherence is the visual phenomenon present all across nature whereby the perceived color of a given point within a region of interest tend to vary more according to the elapsed time passed between two given moments.

Implement an animation with keyframes using the nub library for Processing (Java).

{{< /hint >}}

## Solution

Implementation of an animation with keyframes using the nub library for Processing (Java):

{{< details title="Code Implementation" open=false >}}
{{< highlight Java >}}

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

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/SpatialCoherence.js" width="800" height="400" >}}

## Useful information

Pixelation and spatial coherence are two different methods used for image or video processing, and can have different applications based on the desired outcome.

Pixelation refers to the process of reducing the resolution of an image or video by dividing it into smaller regions or tiles and replacing each tile with a solid color. This can be useful in situations where a lower resolution or a more abstracted representation of the image or video is desired, such as in some forms of digital art or design. Pixelation can also be used for privacy protection, where a part of an image or video containing sensitive information is replaced with a lower resolution version.

Spatial coherence refers to the property of an image or video where neighboring pixels are highly correlated in terms of their color or intensity values. This property can be used to create visually pleasing effects, such as smooth transitions between regions of similar color, or to highlight specific features of an image or video. Spatial coherence can be used in various image processing applications, such as noise reduction, edge detection, or object recognition.

## Description

The code defines a canvas with a size of 400x400 and creates three user interface elements using p5.js library: a checkbox to toggle between color and spatial coherence pixelation, a file input to upload a video file, and a slider to adjust the tile count of the pixelation.

The handleFile() function loads the uploaded video file and stores it in a variable called videoFile. The draw() function checks if videoFile is not null and then calls the pixelateByColorAverage() or pixelateBySpatialCoherence() function based on the value of pixelateByColor variable.

The pixelateByColorAverage() function divides the video into tiles and calculates the average color of each tile, then fills the tile with the calculated color. The pixelateBySpatialCoherence() function fills each tile with the color of the pixel at the top left corner of the tile. Both functions use the loadPixels() method to access the pixel data of the video.

Overall, this code allows for easy manipulation and pixelation of uploaded video files, with the user able to choose between different pixelation methods and adjust the tile count to achieve different levels of detail.

## Benchmarks

Spatial Coherence algorithm is faster than the Color Coherence algorithm. The average time per iteration for the Spatial Coherence algorithm is 4.96ms, while the average time per iteration for the Color Coherence algorithm is 10.85ms. This means that the Spatial Coherence algorithm can pixelate the video more quickly than the Color Coherence algorithm.

However, the accuracy of the spatial coherence algorithm is lower than the color coherence algorithm. The Spatial Coherence algorithm has a better-looking result in images that look more similar to the original one.
