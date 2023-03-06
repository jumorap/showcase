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


let input, button, greeting, img, originalimg;
let usedColors = {};

function preload() {
  img = loadImage('https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg');
  originalimg = loadImage('https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg');
}

function setup() {
  // Create a canvas to display the image and color mapping
  createCanvas(img.width, img.height * 2);
  input = createInput();
  input.position(5, 5);
  button = createButton('imge URL or reset');
  button.position(input.x + input.width, 5);
  button.mousePressed(program);
  imageandtext();
  image(originalimg, originalimg.width, 0);
}

function program() {
  imgURL = input.value() || 'https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg';

  loadImage(imgURL, myimg => {
    img = myimg;
    imageandtext();

    loadImage(imgURL, newimg => {
      image(newimg, newimg.width, 0);
    });

  });


}

function imageandtext() {
  resizeCanvas(Math.max(img.width * 2, 500), img.height + 210);
  background(255);
  colorMap(img);
  image(img, 0, 0);

  for (let i in usedColors) {
    let y = img.height + 5 + 20 * (i % 10);
    let x = 100 * floor(i / 10);
    fill(colorMapArr[i][0]);
    rect(x, y, 30, 20);
    fill(0);
    textAlign(LEFT, CENTER);
    text(colorMapArr[i][1], x + 40, y + 10);
  }
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

    // Find the closest color in the color map to the pixel's color
    let closestColor = findClosestColor(r, g, b, colorMapArr);
    usedColors[closestColor[1]] = closestColor[0];

    // Update the pixel's color to the closest color in the color map
    pixels[i] = closestColor[0][0];
    pixels[i + 1] = closestColor[0][1];
    pixels[i + 2] = closestColor[0][2];
  }

  img.updatePixels();

}

function findClosestColor(r, g, b, colorMap) {
  // Initialize variables to keep track of the closest color and its distance
  let closestColor = colorMap[0];
  let lastindex = 0;
  let closestDist = distance(r, g, b, colorMap[0][0][0], colorMap[0][0][1], colorMap[0][0][2]);

  // Loop through each color in the color map
  for (let i = 1; i < colorMap.length; i++) {
    // Calculate the distance between the pixel's color and the color in the color map
    let dist = distance(r, g, b, colorMap[i][0][0], colorMap[i][0][1], colorMap[i][0][2]);

    // If the distance is smaller than the previous closest distance, update the closest color and distance
    if (dist <= closestDist) {
      lastindex = i;
      closestColor = colorMap[i][0];
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


