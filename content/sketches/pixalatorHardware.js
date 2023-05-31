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
  mosaic = readShader('/showcase/sketches/shaders/effect.frag', { varyings: Tree.texcoords2 });
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