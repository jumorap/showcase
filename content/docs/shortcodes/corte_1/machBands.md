# Mach Bands

{{< hint info >}}
**Exercise**

Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.

{{< /hint >}}

## Solution

Implementation of a terrain visualization application in P5 that uses Perlin noise to generate a 3D terrain:

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
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

const wMap = 800;
const hMap = 800;

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

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/machBands.js" width="724" height="724" >}}

## Description

Involves the use of various programming concepts and techniques to create a visual representation of a 3D terrain. It involves the use of noise functions to generate random values for the height of each point on the terrain. The colors of each point are determined based on their height, and various shades of blue, green, brown, and white are used to create a realistic representation of the terrain.

Involves the use of programming concepts and techniques such as noise functions, color mapping, and event handling to create an interactive 3D terrain using WebGL.

### Previous work

Terrain visualization has been a popular area of research in computer graphics and game development for many years. Perlin noise, which is used in the code provided, was first introduced in 1983 by Ken Perlin and has since become a widely used technique for generating random values in computer graphics.

### Future work

Future work on terrain visualization could involve the development of more advanced techniques for generating 3D terrains. This could include the use of machine learning algorithms to create more realistic and detailed terrain models.

Additionally, the application of terrain visualization could be expanded to fields such as urban planning and environmental science. For example, this code could be used to create 3D models of cities and their surrounding natural environments, which could be used to simulate the effects of urbanization on the environment.

Overall, terrain visualization is an exciting area of research with many potential applications, and there is much room for future development and innovation in this field.

## Usages

The code provided can be used in various applications, including video games, simulation software, and educational tools. Here are some potential use cases:

1. Video games: The 3D terrain generated by this code could be used as a part of a video game environment. By integrating this code into a game engine, developers can create realistic and immersive terrains for their games.
2. Simulation software: This code could be used to create realistic simulations of real-world environments, such as landscapes and terrains. For example, this could be used to simulate the effects of natural disasters like floods, landslides, or earthquakes.
3. Educational tools: This code could be used as a tool for learning about terrain generation, programming concepts, and 3D graphics. It could be integrated into educational software or used as a standalone application to teach students about computer graphics and simulation.
4. Architectural visualization: This code could be used to create 3D models of landscapes and terrains for architectural visualization. This could be useful for architects and designers to create realistic representations of their designs in a natural environment.

Overall, the usage of this code is not limited to the examples mentioned above, and it can be used in various other applications that require the creation of 3D terrains.
