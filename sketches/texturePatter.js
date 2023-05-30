let gradientCheck;
let tilesCheck;
let bricksCheck;
let TruchetChecked;

let pg;
let truchetShader;

let u_time = 0; // Variable to store the time

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/showcase/sketches/shaders/effect.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
  
  gradientCheck = createCheckbox('Gradient Effect', false);
  gradientCheck.position(10, 10);
  gradientCheck.style('color', 'white');
  gradientCheck.changed(() => truchetShader.setUniform('gradientEffectBool',     gradientCheck.checked()));
  
  tilesCheck = createCheckbox('tiles Effect', false);
  tilesCheck.position(10, 25);
  tilesCheck.style('color', 'white');
  tilesCheck.changed(() => truchetShader.setUniform('tileEffectBool',     tilesCheck.checked()));
  
  bricksCheck = createCheckbox('bricks Effect', false);
  bricksCheck.position(10, 40);
  bricksCheck.style('color', 'white');
  bricksCheck.changed(() => truchetShader.setUniform('bricksEffectBool',     bricksCheck.checked()));
  
  
  TruchetChecked = createCheckbox('truchet Effect', false);
  TruchetChecked.position(10, 55);
  TruchetChecked.style('color', 'white');
  TruchetChecked.changed(() => truchetShader.setUniform('truchetEffectBool',     TruchetChecked.checked()));
  
}

function draw() {
  background(33);
  orbitControl();
  cylinder(100, 200);
  
  // Update the u_time uniform value
  truchetShader.setUniform('u_time', u_time);
  u_time += 0.01; // Increase the time value
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}