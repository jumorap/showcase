# Mach Bands

{{< hint info >}}
**Exercise**

Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.

{{< /hint >}}

## Solution

Implementation of a terrain visualization application in P5 that uses Perlin noise to generate a 3D terrain:

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
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

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/machBands.js" width="623" height="623" >}}

The Mach bands effect occurs when the human visual system exaggerates the contrast between adjacent areas of a gradient, creating the perception of a band of increased brightness or darkness along the boundary between the two areas. In this case, the blocks appear darker than expected because the human visual system is enhancing the contrast between adjacent blocks due to the sharp boundaries between them.

One possible application of the Mach bands effect is in image processing and digital displays. By simulating the Mach bands effect, it is possible to enhance the perceived contrast in images and displays, making them appear sharper and more vivid. This can be useful in fields such as medical imaging, where it is important to distinguish between subtle variations in shades of gray, or in design and advertising, where it is important to create visually appealing displays that grab the viewer's attention.

Another possible application of the Mach bands effect is in visual illusions and art. By manipulating the contrast between adjacent areas of a gradient, it is possible to create optical illusions and visual effects that play with the viewer's perception and challenge their understanding of the image. This can be seen in various forms of art, such as Op Art and Kinetic Art, where the visual effects are created through careful manipulation of color, shape, and contrast.

Overall, the Mach bands effect is a fascinating phenomenon that demonstrates the complex interplay between the human visual system and the physical properties of light and color. By understanding the principles behind this effect, we can design better displays, create more engaging art, and gain a deeper appreciation for the richness and complexity of the visual world around us.