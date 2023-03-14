const kernels = {
    identity: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ],

    edge0: [
        [1, 0, -1],
        [0, 0, 0],
        [-1, 0, 1]
    ],

    edge1: [
        [0, 1, 0],
        [1, -4, 1],
        [0, 1, 0]
    ],

    edge2: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
    ],

    sharpen: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ],

    boxBlur: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ].map(row => row.map(val => val * 0.1111)),

    gaussianBlur: [
        [1, 2, 1],
        [2, 4, 2],
        [1, 2, 1]
    ].map(row => row.map(val => val * 0.0625)),

    emboss: [
        [-2, -1, 0],
        [-1, 1, 1],
        [0, 1, 2]
    ]
};


let img, input, typeSelect;
let canvasValues = {
    width: 650,
    height: 550,
    saul: "/showcase/sketches/goodman.jpg"
};

function preload() {
    img = loadImage(canvasValues.saul);
    input = createInput();
    typeSelect = createRadio();
}

function setup() {
    // Create a canvas to display the image and color mapping
    createCanvas(canvasValues.width, canvasValues.height);
    imageMode(CENTER);

    // Create a text input and button
    input.position(5, 5);
    button = createButton('imge URL or reset');
    button.position(input.x + input.width, 5);

    for (i in kernels) {
        typeSelect.option(i);
    }
    typeSelect.option('Histograma');
    typeSelect.style('font-size', '10px');
    typeSelect.position(0, 40); 
    typeSelect.changed(updateImage);
    button.mousePressed(updateImage);
    img.resize(0, (canvasValues.height * 2) / 3);
    createRGBHistogram();
}

function updateImage() {
    let imgURL = input.value() || canvasValues.saul;
    if (typeSelect.value() == "Histograma") {
        createRGBHistogram();
        return;
    }

    loadImage(imgURL, myimg => {
        background(255);
        img = myimg;
        applyConvolution(img);
        img.resize(0, (canvasValues.height * 2) / 3);
        image(img, canvasValues.width / 2, canvasValues.height / 2);
    });
}

function applyConvolution() {
    img.loadPixels();
    let pix = img.pixels;
    let sup = 255;
    let inf = 0;
    let kernelname = typeSelect.value() || "identity";
    let kernelselect = kernels[kernelname];

    for (let x = 1; x < img.width - 1; x++) {
        for (let y = 1; y < img.height - 1; y++) {
            let index = imageIndex(img, x, y);
            let r = 0, g = 0, b = 0;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let neighborIndex = imageIndex(img, x + i - 1, y + j - 1);
                    r += kernelselect[i][j] * pix[neighborIndex];
                    g += kernelselect[i][j] * pix[neighborIndex + 1];
                    b += kernelselect[i][j] * pix[neighborIndex + 2];
                }
            }

            pix[index] = constrain(r, inf, sup);
            pix[index + 1] = constrain(g, inf, sup);
            pix[index + 2] = constrain(b, inf, sup);
        }
    }

    img.updatePixels();
}


function imageIndex(img, x, y) {
    return 4 * (x + y * img.width);
}

// Función para crear un histograma de colores RGB
function createRGBHistogram() {
    // Crear arrays vacíos para almacenar los valores de cada canal de color
    let redValues = [];
    let greenValues = [];
    let blueValues = [];

    // Loop a través de todos los píxeles en la imagen
    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            // Obtener el valor de color del píxel actual
            let pixelColor = img.get(x, y);

            // Añadir los valores de los canales de color a los arrays correspondientes
            redValues.push(red(pixelColor));
            greenValues.push(green(pixelColor));
            blueValues.push(blue(pixelColor));
        }
    }

    // Establecer el color de fondo
    background(255);

    // Dibujar el histograma para cada canal de color
    drawHistogram(redValues, color(255, 0, 0));
    drawHistogram(greenValues, color(0, 255, 0));
    drawHistogram(blueValues, color(0, 0, 255));

}

// Función para dibujar un histograma para un canal de color
function drawHistogram(values, col) {
    // Crear un array vacío para almacenar el número de píxeles con cada valor de canal de color
    let counts = new Array(256).fill(0);
    max = 0;

    // Loop a través de todos los valores de canal de color y contar el número de píxeles para cada valor
    for (let i = 0; i < values.length; i++) {
        counts[values[i]]++;

        if (counts[values[i]] > max) {
            max = counts[values[i]];
        }
    }


    textSize(25);
    text("Histograma ↓", 100, 150);
    let offsetx = Math.floor((canvasValues.width) / 255);
    // Loop a través de todos los posibles valores de canal de color
    for (let i = 0; i < counts.length - 1; i++) {
        // Dibujar una línea vertical para el valor del canal de color y la altura correspondiente
        let mappedHeight = map(counts[i], 0, max, 0, canvasValues.height/2);
        let mappedHeight2 = map(counts[i + 1], 0, max, 0, canvasValues.height/2);
        strokeWeight(1);
        stroke(col);
        line(i * offsetx, canvasValues.height - round(mappedHeight) - 40, i * offsetx + offsetx, canvasValues.height - round(mappedHeight2)-40);

        if (i % 50 == 0) {
            stroke(0);
            textSize(15);
            text(i, i * offsetx, canvasValues.height - 20);
        }

    }
}

