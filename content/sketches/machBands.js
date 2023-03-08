let canvasWidth, canvasHeight;
let cols, rows;
const scl = 20;
const w = 1400;
const h = 1000;
let flying = 0;
let terrain = [];

const noiseScale = 0.1;
const noiseStrength = 100;
let lightDirection;
let gradient = [];

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight, WEBGL);

    gradient = [color(0, 0, 0), color(0, 0, 255)];

    cols = w / scl;
    rows = h / scl;

    lightDirection = createVector(1, -1, 0);

    for (let y = 0; y < rows; y++) {
        terrain[y] = [];
        for (let x = 0; x < cols; x++) {
            terrain[y][x] = 0;
        }
    }
}

function draw() {
    background(100, 150, 100);

    camera(0, -canvasHeight/2, canvasHeight/2 / tan(PI/6), 0, 0, 0, 0, 1, 0);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            terrain[y][x] = map(noise(x * noiseScale, y * noiseScale, flying), 0, 1, 0, 1);
            terrain[y][x] = pow(terrain[y][x], 2) * noiseStrength;

            let colorVal = lerpColor(gradient[0], gradient[1], terrain[y][x]);
            fill(colorVal);

            push();
            translate(x * scl - w/2, y * scl - h/2, terrain[y][x]);
            box(scl, scl, terrain[y][x]);
            pop();
        }
    }


    flying -= 0.1;
}
