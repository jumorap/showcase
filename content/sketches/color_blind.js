
// Define a color map for color blindness correction
let colorMapArr = [
  [[0, 0, 0], "black"],
  [[255, 255, 255], "white"],
  [[128, 128, 128], "gray"],
  [[230, 25, 75], "red"],
  [[60, 180, 75], "green"],
  [[0, 0, 255], "blue"],
  [[255, 225, 25], "yellow"],
  [[145, 30, 180], "purple"],
  [[255, 165, 0], "orange"],
  [[255, 192, 203], "pink"],
  [[165, 42, 42], "brown"],
  [[0, 128, 128], "teal"],
  [[230, 190, 255], "lavender"],
  [[128, 0, 0], "maroon"],
  [[170, 255, 195], "mint"],
  [[128, 128, 0], "olive"],
  [[255, 215, 180], "peach"],
  [[0, 0, 128], "navy"],
  [[0, 255, 255], "cyan"],
  [[255, 0, 255], "magenta"],
  [[255, 250, 200], "beige"],
  [[64, 224, 208], "turquoise"],
  [[255, 215, 0], "gold"],
  [[192, 192, 192], "silver"],
  [[205, 127, 50], "bronze"],
  [[181, 166, 66], "brass"],
  [[184, 115, 51], "copper"],
  [[170, 69, 69], "pewter"],
  [[224, 17, 95], "ruby"],
  [[8, 37, 103], "sapphire"],
  [[80, 200, 120], "emerald"],
  [[153, 50, 204], "amethyst"],
  [[194, 184, 9], "citrine"],
  [[204, 198, 0], "topaz"],
  [[57, 204, 204], "peridot"],
  [[135, 67, 34], "aquamarine"],
  [[162, 54, 54], "garnet"],
  [[255, 188, 215], "opal"],
  [[53, 56, 57], "onyx"],
  [[240, 248, 255], "pearl"],
  [[255, 127, 80], "coral"],
  [[255, 191, 0], "amber"]
];


//See: https://gist.github.com/Lokno/df7c3bfdc9ad32558bb7
let colorMats = {
  'Normal vision':
    [[1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]],
  // Red-Blind
  'Protanopia':
    [[0.567, 0.433, 0.000],
    [0.558, 0.442, 0.000],
    [0.000, 0.242, 0.758]],
  // Red-Weak
  'Protanomaly':
    [[0.817, 0.183, 0.000],
    [0.333, 0.667, 0.000],
    [0.000, 0.125, 0.875]],
  // Green-Blind
  'Deuteranopia':
    [[0.625, 0.375, 0.000],
    [0.700, 0.300, 0.000],
    [0.000, 0.300, 0.700]],
  // Green-Weak
  'Deuteranomaly': [[0.800, 0.200, 0.000],
  [0.258, 0.742, 0.000],
  [0.000, 0.142, 0.858]],
  // Blue-Blind
  'Tritanopia': [[0.950, 0.050, 0.000],
  [0.000, 0.433, 0.567],
  [0.000, 0.475, 0.525]],
  // Blue-Weak
  'Tritanomaly': [[0.967, 0.033, 0.00],
  [0.00, 0.733, 0.267],
  [0.00, 0.183, 0.817]],
  // Monochromacy
  'Achromatopsia': [[0.299, 0.587, 0.114],
  [0.299, 0.587, 0.114],
  [0.299, 0.587, 0.114]],
  // Blue Cone Monochromacy
  'Achromatomaly': [[0.618, 0.320, 0.062],
  [0.163, 0.775, 0.062],
  [0.163, 0.320, 0.516]]
};


let input, button, img, originalimg;
let imgURL = 'https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg';
let canvassize = [680, 650];
let usedColors = {};
let typeSelect;

function preload() {
  img = loadImage(imgURL);
  originalimg = loadImage(imgURL);
  input = createInput();
  typeSelect = createRadio();
}

function setup() {
  // Create a canvas to display the image and color mapping
  createCanvas(canvassize[0], canvassize[1]);

  // Create a text input and button
  input.position(5, 5);
  button = createButton('imge URL or reset');
  button.position(input.x + input.width, 5);

  // Display the original image
  program();

  // Create a radio button to select the color blindness type
  for (i in colorMats) {
    typeSelect.option(i);
  }
  typeSelect.style('font-size', '10px');
  typeSelect.position(0, 40);
  typeSelect.value('Normal vision');

  // When the button is pressed, call the program function
  button.mousePressed(program);
  typeSelect.changed(program);
}

function mouseClicked() {
  let color = img.get(mouseX, mouseY - 60);
  let color2 = originalimg.get(mouseX, mouseY - 60);

  if (color[3] != 0 && color2[3] !== 0) {
    fill(0);
    textAlign(CENTER, CENTER);
    text('You clicked!!', canvassize[0] / 2, originalimg.height + 100);
    fill(color);
    rect(canvassize[0] / 2 - 80, originalimg.height + 125, 30, 20);
    fill(color2);
    rect(canvassize[0] / 2 + 50, originalimg.height + 125, 30, 20);
    fill(0);
    textAlign(CENTER, CENTER);
    text('Closest color: ', canvassize[0] / 2, originalimg.height + 200);
    let closestcolor = findClosestColor(color2[0], color2[1], color2[2]);
    fill(closestcolor[0]);
    rect(canvassize[0] / 2 + 50, originalimg.height + 225, 30, 20);
    
    fill(255);
    rect(canvassize[0] / 2 - 150, originalimg.height + 225, 200, 20);
    
    fill(0);
    textAlign(RIGHT, RIGHT);
    text(colorMapArr[closestcolor[1]], canvassize[0] / 2, originalimg.height + 235);
  }

}

function program() {
  background(255);
  fill(0);
  textAlign(CENTER, CENTER);
  text('Loading...', canvassize[0] / 4, 100);
  imgURL = input.value() || 'https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg';

  loadImage(imgURL, myimg => {
    img = myimg;
    imageandtext();
    fill(0);
    textAlign(CENTER, CENTER);
    text('Color blindness type', canvassize[0] / 4, img.height + 100);

    loadImage(imgURL, newimg => {
      originalimg = newimg;
      newimg.resize(canvassize[0] / 2, 0);
      image(newimg, canvassize[0] / 2, 60);
      fill(0);
      textAlign(CENTER, CENTER);
      text('Original image', canvassize[0] - canvassize[0] / 4, originalimg.height + 100);
    });

    typeSelect.position(0, 40);
  });
}

function imageandtext() {
  background(255);
  colorMap(img);
  img.resize(canvassize[0] / 2, 0);
  resizeCanvas(canvassize[0], img.height + 250);
  image(img, 0, 60);
}


function colorMap(img) {
  usedColors = [];
  img.loadPixels();

  // Get the pixel array of the image
  let pixels = img.pixels;

  // Loop through each pixel in the image
  for (let i = 0; i < pixels.length; i += 4) {
    // Get the RGB values of the pixel
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    let newRGB = transform(r, g, b);

    // Set the modified RGB values back in the pixel array
    pixels[i] = newRGB[0];
    pixels[i + 1] = newRGB[1];
    pixels[i + 2] = newRGB[2];
  }

  img.updatePixels();

}

function transform(r, g, b) {
  // Convert RGB values to LMS values
  let typevalue = typeSelect.value() || "Normal vision";
  return multiplyMatrices(colorMats[typevalue], [[r], [g], [b]]);
}

function multiplyMatrices(matrixA, matrixB) {
  let result = [];
  for (let i = 0; i < matrixA.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrixB[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA[0].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function findClosestColor(r, g, b) {
  // Initialize variables to keep track of the closest color and its distance
  let closestColor = colorMapArr[0];
  let lastindex = 0;
  let closestDist = distance(r, g, b, colorMapArr[0][0][0], colorMapArr[0][0][1], colorMapArr[0][0][2]);

  // Loop through each color in the color map
  for (let i = 1; i < colorMapArr.length; i++) {
    // Calculate the distance between the pixel's color and the color in the color map
    let dist = distance(r, g, b, colorMapArr[i][0][0], colorMapArr[i][0][1], colorMapArr[i][0][2]);

    // If the distance is smaller than the previous closest distance, update the closest color and distance
    if (dist <= closestDist) {
      lastindex = i;
      closestColor = colorMapArr[i][0];
      closestDist = dist;
    }
  }

  // Return the closest color in the color map
  return [closestColor, lastindex];
}

function distance(x1, y1, z1, x2, y2, z2) {
  // Calculate the distance between two colors using the Euclidean distance formula
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}