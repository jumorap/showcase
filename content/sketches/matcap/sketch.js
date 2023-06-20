// A matcap shader is a shader that is used to approximate how a material might reflect light.
// Instead of creating a rendering pipeline with lights, you just give your shader a "matcap" texture
// All matcap textures are, are a material rendered on a sphere. This gives us a guess of how light might fall
// on any gived surface of a mesh.

let myShader;
let matcap;

const images = [
  "/showcase/sketches/matcap/matcap-1.png",
  "/showcase/sketches/matcap/matcap-2.png",
  "/showcase/sketches/matcap/matcap-3.png",
  "/showcase/sketches/matcap/matcap-4.png",
]
let currentImageIndex = 0;

function preload() {
  myShader = loadShader("/showcase/sketches/matcap/shader.vert", "/showcase/sketches/matcap/shader.frag");

  matcap = loadImage(images[0]);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  shader(myShader);

  myShader.setUniform("uMatcapTexture", matcap);
  orbitControl();
  cylinder(width / 10, width / 5, 24, 24, true, true);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "r" || key === "R") {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    matcap = loadImage(images[currentImageIndex]);
  }
}

