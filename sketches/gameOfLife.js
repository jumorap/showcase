// Define the grid
const CELL_SIZE = 14;
const ROWS = 50;
const COLS = 50;
let grid = [];
let newGrid = [];

// Define the generation counter
let generation = 0;

function setup() {
    createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE);

    // Initialize the grid randomly
    for (let i = 0; i < ROWS; i++) {
        grid[i] = [];
        for (let j = 0; j < COLS; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(255);
    drawCells();
    updateGrid();

    grid = newGrid;

    // Increment the generation counter
    generation++;
    fill(0);
    text(`Generation: ${generation}`, 10, height - 10);
}

/**
 * Draw the cells of the grid to the screen
 */
const drawCells = () => {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (grid[i][j] === 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

/**
 * Update the grid to the next generation of cells
 */
const updateGrid = () => {
    newGrid = [];
    for (let i = 0; i < ROWS; i++) {
        newGrid[i] = [];
        for (let j = 0; j < COLS; j++) {
            let state = grid[i][j];
            let neighbors = countNeighbors(grid, i, j);
            if (state === 0 && neighbors === 3) {
                newGrid[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = 0;
            } else {
                newGrid[i][j] = state;
            }
        }
    }
}

/**
 * Count the number of neighbors at a given grid position that are alive
 * @param grid The grid to count neighbors in
 * @param x The x position of the cell to count neighbors of
 * @param y The y position of the cell to count neighbors of
 * @returns {number} The number of neighbors that are alive
 */
const countNeighbors = (grid, x, y) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let row = (x + i + ROWS) % ROWS;
            let col = (y + j + COLS) % COLS;
            count += grid[row][col];
        }
    }
    count -= grid[x][y];
    return count;
}

/**
 * Handle mouse clicks to toggle cells
 */
function mouseClicked() {
    let i = floor(mouseY / CELL_SIZE);
    let j = floor(mouseX / CELL_SIZE);
    grid[i][j] = (grid[i][j] === 0) ? 1 : 0;
}
