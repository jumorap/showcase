let myShader;
let noise;
const images = [
  "/showcase/sketches/shaders/vertex/noise-1.png",
  "/showcase/sketches/shaders/vertex/noise-2.png",
  "/showcase/sketches/shaders/vertex/noise-3.png",
  "/showcase/sketches/shaders/vertex/noise-4.png",
  "/showcase/sketches/shaders/vertex/noise-5.png",
];
let currentImageIndex = 0;

function preload() {
  myShader = loadShader("/showcase/sketches/shaders/vertex/shader.vert", "/showcase/sketches/shaders/vertex/shader.frag");
  noise = loadImage(images[0]);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  background(0);
  shader(myShader);

  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", noise);

  orbitControl();

  sphere(width / 10, 200, 200);
}

function keyPressed() {
  if (key === "r" || key === "R") {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    noise = loadImage(images[currentImageIndex]);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
