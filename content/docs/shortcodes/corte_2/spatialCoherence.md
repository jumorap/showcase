# Spatial Coherence

{{< hint info >}}
**Exercise**

1. Implement your own source dataset and a mechanism to select different images from it.

2. Implement a pixelator in software that doesn’t use spatial coherence and compare the results with those obtained here.
{{< /hint >}}

## Solution

The data source is composed by 3 images, it is possible to iterate between them using the arrows (left, right)

Bellow is the code used for that purpure:

{{< p5-iframe sketch="/showcase/sketches/pixalatorHardware.js" width="500" height="400" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

{{< details title="Effect.frag" open=false >}}
{{< highlight Java >}}
    precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D source;
// displays original
uniform bool original;
// uv visualization
uniform bool uv;
// target horizontal & vertical resolution
uniform float resolution;

// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)

void main() {
  if (original) {
    gl_FragColor = uv ? vec4(texcoords2.st, 0.0, 1.0) :
                        texture2D(source, texcoords2);
  }
  else {
    // define stepCoord to sample the texture source as a 3-step process:
    // i. define stepCoord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 stepCoord = texcoords2 * resolution;
    // ii. remap stepCoord to [0.0, resolution] ∈ Z
    // see: https://thebookofshaders.com/glossary/?search=floor
    stepCoord = floor(stepCoord);
    // iii. remap stepCoord to [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution);
    // source texel
    gl_FragColor = uv ? vec4(stepCoord.st, 0.0, 1.0) :
                        texture2D(source, stepCoord);
    // ✨ source texels may be used to compute image palette lookup keys,
    // such as in video & photographic mosaics or ascii art visualizations.
  }
}
{{< /highlight >}}
{{< /details >}}

{{< details title="sketch.js" open=false >}}
{{< highlight Java >}}
    let imageIndex = 1;
let image_src;
let video_src;
let mosaic;
let currentSource;
// ui
let video_on;
let mode;

let mouseXResolution;
let mouseMovedTimer;

function preload() {
  loadImageSrc();
  mosaic = readShader('./effect.frag', { varyings: Tree.texcoords2 });
}

function loadImageSrc() {
  image_src = loadImage(`/paintings/p${imageIndex}.jpg`);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  loadImageSrc()
  mosaic.setUniform('source', image_src);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        imageIndex--;
    } else if (keyCode === RIGHT_ARROW) {
        imageIndex++;
    }

    if (imageIndex > 3) {
        imageIndex = 1;
    } 

    if (imageIndex == 0) {
        imageIndex = 3;
    } 

     // Load the new image source
     loadImageSrc();
     // Update the shader uniform
     mosaic.setUniform('source', image_src);
  }


function draw() {
  /*
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) 
  */
  beginShape();
  vertex(-1, -1, 0, 0, 1);
  vertex(1, -1, 0, 1, 1);
  vertex(1, 1, 0, 1, 0);
  vertex(-1, 1, 0, 0, 0);
  endShape();
}

function mouseMoved() {
  // Update mouseXResolution based on mouse x-coordinate
  mouseXResolution = map(mouseX, 0, width, 7, 40);
  console.log(mouseXResolution)
  // Load the new image source
  loadImageSrc();
  mosaic.setUniform('resolution', float(mouseXResolution));
  mosaic.setUniform('source', image_src);
}

function updateMouseMoved(){
    // Update mouseXResolution based on mouse x-coordinate
    mouseXResolution = map(mouseX, 0, width, 7, 40);
    console.log(mouseXResolution)
    // Load the new image source
    loadImageSrc();
    mosaic.setUniform('resolution', float(mouseXResolution));
    mosaic.setUniform('source', image_src);
}
{{< /highlight >}}
{{< /details >}}



## How to use
Use The arrows to change the image and move the mouse to change the resolution of the image.

## Little explanation of the code
The code uses the x coordinate of the mouse to give the resolution to the shader. The shader will paint the image color based on spatial coherence.

The fragment shader uses:

- It remaps the normalized interpolated texture coordinates (texcoords2) to a range of [0.0, resolution] using stepCoord.
- It then remaps stepCoord to a range of [0.0, resolution] as integer values.
- Finally, it remaps stepCoord back to the range [0.0, 1.0] as normalized interpolated texture coordinates.
- The shader samples the texture (source) using the remapped stepCoord and assigns the resulting color to gl_FragColor.

## Comparative with a software created pixelation    

Bellow you can find an example adapted from the video tutorial of andrew Sink:

{{< p5-iframe sketch="/showcase/sketches/PixalatorSoftware.js" width="500" height="400" >}}

{{< details title="Sketch.js" open=false >}}
{{< highlight Java >}}
let img; // creates image variable

let size = 7 // element size

let startx = 0 // starting x coordinate
let starty = 0 // starting y coordinate

function preload() {
  img = loadImage('virgie.jpg'); // preloads Virginia picture!
}

function setup() {
  createCanvas(windowWidth, windowHeight); // creates canvas

  img.loadPixels(); // loads image
  img.resize(windowWidth, 0); // resizes image to window size
  img.updatePixels(); // updates image

}

function draw() {
  clear();
  background(0);

  let size = floor(map(mouseX, 0, width, 7, 40)); // maps mouseX value to element size

  for (var starty = 0; starty < img.height; starty++) { // creates pixel index
    for (var startx = 0; startx < img.width; startx++) {
      var index = (startx + starty * img.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var bright = (r + g + b) / 3; // calculate the average brightness

      fill(r, g, b); // maintain the original color

      rect(startx, starty, size, size);

      startx = startx + size - 1; // set new startx value
    }
    starty = starty + size - 1; // set new starty value
  }
}
{{< /highlight >}}
{{< /details >}}

Comparing both versions, we can see that the one that realizes the pixelation in software runs faster that the one that uses shaders.
