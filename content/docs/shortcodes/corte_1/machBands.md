# Mach Bands

{{< hint info >}}
**Exercise**

Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.

{{< /hint >}}

## Solution

Implementation of a terrain visualization application in P5 that uses Perlin noise to generate a 3D terrain:

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let cols, rows; // Variables para el número de columnas y filas del terreno
const scl = 20; // Escala del terreno
const w = 1400; // Ancho del terreno
const h = 1000; // Alto del terreno
let flying = 0; // Variable para controlar la animación del terreno
let terrain = []; // Arreglo para almacenar los valores de altura del terreno

function setup() {
createCanvas(600, 600, WEBGL); // Crear un canvas 3D
cols = w / scl; // Calcular el número de columnas
rows = h / scl; // Calcular el número de filas

    // Inicializar el terreno con valores predeterminados
    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = 0;
        }
    }
}

function draw() {
// Actualizar el terreno
updateTerrain();

    // Dibujar el terreno
    drawTerrain();
}

function updateTerrain() {
/**
* Actualizar el terreno utilizando ruido Perlin para generar valores de altura
* @type {number} flying - Variable para controlar la animación del terreno
*/
flying -= 0.1; // Cambiar la animación del terreno
let yoff = flying;

    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            // Generar valores de altura para cada punto del terreno utilizando ruido Perlin
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
            xoff += 0.2; // Incrementar el valor de x para generar diferentes patrones de ruido
        }
        yoff += 0.2; // Incrementar el valor de y para generar diferentes patrones de ruido
    }
}

function drawTerrain() {
/**
* Dibujar el terreno utilizando triángulos conectados en forma de zigzag
*/
background(0); // Establecer el fondo negro
translate(0, 50); // Mover el terreno hacia arriba para que no se corte en el borde inferior
rotateX(PI / 3); // Rotar el terreno para tener una vista 3D
fill(200, 200, 200, 50); // Establecer el color y la opacidad de las caras del terreno
translate(-w / 2, -h / 2); // Centrar el terreno en el canvas

    for (let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP); // Comenzar un nuevo zigzag
        for (let x = 0; x < cols; x++) {
            // Agregar dos vértices a la vez para conectar el zigzag
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape(); // Finalizar el zigzag
    }
}

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/machBands.js" width="623" height="623" >}}

The Mach bands effect occurs when the human visual system exaggerates the contrast between adjacent areas of a gradient, creating the perception of a band of increased brightness or darkness along the boundary between the two areas. In this case, the blocks appear darker than expected because the human visual system is enhancing the contrast between adjacent blocks due to the sharp boundaries between them.

One possible application of the Mach bands effect is in image processing and digital displays. By simulating the Mach bands effect, it is possible to enhance the perceived contrast in images and displays, making them appear sharper and more vivid. This can be useful in fields such as medical imaging, where it is important to distinguish between subtle variations in shades of gray, or in design and advertising, where it is important to create visually appealing displays that grab the viewer's attention.

Another possible application of the Mach bands effect is in visual illusions and art. By manipulating the contrast between adjacent areas of a gradient, it is possible to create optical illusions and visual effects that play with the viewer's perception and challenge their understanding of the image. This can be seen in various forms of art, such as Op Art and Kinetic Art, where the visual effects are created through careful manipulation of color, shape, and contrast.

Overall, the Mach bands effect is a fascinating phenomenon that demonstrates the complex interplay between the human visual system and the physical properties of light and color. By understanding the principles behind this effect, we can design better displays, create more engaging art, and gain a deeper appreciation for the richness and complexity of the visual world around us.