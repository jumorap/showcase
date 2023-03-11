let terrain;
let scl = 8;
let cols, rows;

let startX, startY;
let rotX = -0.8;
let rotY = 0;
let canRotate = false;

const DARK_BLUE = [0, 85, 255];
const MEDIUM_BLUE = [0, 110, 255];
const LIGHT_BLUE = [0, 100, 255];
const WHITE = [255, 255, 255];
const GREEN = [100, 180, 30];
const DARK_GREEN = [61, 150, 30];
const SUPER_DARK_GREEN = [61, 130, 61];
const BROWN = [79, 60, 46];

const MIN_HEIGHT_BLUE = -30;
const MAX_HEIGHT_WHITE = 40;
const MEDIUM_HEIGHT_BROWN = 30;
const MAX_HEIGHT_GREEN = 25;

const wMap = 700;
const hMap = 700;

function setup() {
    createCanvas(wMap, hMap, WEBGL);
    cols = floor(width / scl);
    rows = floor(height / scl);
    terrain = generateTerrain(cols, rows);
}

function draw() {
    background(0);

    if (canRotate) {
        // Calculate the rotation based on the mouse movement
        let deltaX = mouseX - startX;
        let deltaY = mouseY - startY;
        rotY += deltaX * 0.01;
        rotX += deltaY * 0.01;

        // Saves the current mouse position
        startX = mouseX;
        startY = mouseY;
    }

    // Apply the rotation
    rotateX(-rotX);
    rotateY(rotY);

    translate(-width / 2, -height / 2, 0);
    drawTerrain(terrain);
}

/**
 * Generate the terrain using the noise function and the given cols and rows
 * @param cols Number of cols
 * @param rows Number of rows
 * @returns {*[]} Matrix with the height of each point
 */
function generateTerrain(cols, rows) {
    let terrain = [];
    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = map(noise(x * 0.1, y * 0.1), 0, 1, -100, 100);
        }
    }
    return terrain;
}

/**
 * Draw the terrain using the given matrix
 * @param terrain Matrix with the height of each point
 */
const drawTerrain = (terrain) => {
    for (let x = 0; x < cols - 1; x++) {
        beginShape(QUAD_STRIP);
        for (let y = 0; y < rows; y++) {
            const h = terrain[x][y];
            let color = checkColor(h);
            let strokeColor = [100];
            let strokeWeightValue = 0.4;

            fill(...color);
            stroke(...strokeColor);
            strokeWeight(strokeWeightValue);

            vertex(x * scl, y * scl, h);
            vertex((x + 1) * scl, y * scl, terrain[x + 1][y]);
        }
        endShape();
    }
}

/**
 * Check the height of the point and return the color
 * @param h Height of the point
 * @returns {number[]} Color of the point
 */
const checkColor = (h) => {
    let color;

    if (h < MIN_HEIGHT_BLUE) {
        // Set color to a random shade of blue
        const rColor = random(1);
        if (rColor < 0.2) {
            color = LIGHT_BLUE;
        } else if (rColor < 0.4) {
            color = MEDIUM_BLUE;
        } else {
            color = DARK_BLUE;
        }
    } else if (h > MAX_HEIGHT_WHITE) {
        color = WHITE;
    } else if (h > MEDIUM_HEIGHT_BROWN) {
        color = BROWN;
    } else if (h > MAX_HEIGHT_GREEN) {
        color = DARK_GREEN;
    } else if (h > MIN_HEIGHT_BLUE && h < MIN_HEIGHT_BLUE + 7) {
        color = SUPER_DARK_GREEN;
    }
    else {
        color = GREEN;
    }

    return color;
}

/**
 * When the mouse is pressed, the terrain can be rotated
 */
function mousePressed() {
    canRotate = true;
    startX = mouseX;
    startY = mouseY;
}

/**
 * When the mouse is released, the terrain stops rotating
 */
function mouseReleased() {
    canRotate = false;
}
