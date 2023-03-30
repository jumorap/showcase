

# Color

{{< hint info >}}
**Exercise**

Implement a color mapping application that helps people who are color blind see the colors around them.
{{< /hint >}}

## Solution

Here's an implementation of a color mapping application in P5 that can help people who are color blind see the colors around them:

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}

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
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/color_blind.js" width="700" height="600" >}}

## Overview

This p5.js code defines a color map for color blindness correction and color matrices for different types of color blindness, This p5.js code allows users to correct for different types of color blindness in an image.

# Some Technical aspects
## Functions
- `colorMapArr`: This is an array that maps specific RGB colors to a color name. The RGB values are specified in the format [R,G,B] and the color name is a string.
- `colorMats`: This is an object that maps a specific type of color blindness to a color matrix. The color matrix is specified in the format [[r1,g1,b1],[r2,g2,b2],[r3,g3,b3]]. Each row represents a different primary color, with each column representing the contribution of that primary color to the final color.

## Variables
- `input`: This variable is used to store the user input from a text input field.
- `button`: This variable is used to store a reference to a button element.
- `greeting`: This variable is used to store a reference to a greeting element.
- `img`: This variable is used to store an image object.
- `originalimg`: This variable is used to store a reference to the original image.
- `imgURL`: This variable is used to store the URL of an image.

# For User
## How to Use
1. Open the web page with the code.
2. Upload an image by clicking the "Choose File" button and selecting an image file.
3. Select the type of color blindness to correct for using the dropdown menu.
4. Click the "Correct Colors" button to apply the color correction.
5. The corrected image will be displayed on the page.

## Additional Information
The dropdown menu includes the following options for color blindness correction:
- Normal vision
- Protanopia
- Protanomaly
- Deuteranopia
- Deuteranomaly
- Tritanopia
- Tritanomaly
- Achromatopsia
- Achromatomaly

The color map can be used to convert color names to RGB values.



{{< hint info >}}
**Exercise**

Research other color models such as HSL, HSB, XYZ.
{{< /hint >}}

## Solution

1. HSL (Hue, Saturation, Lightness):

HSL is a color model that describes colors in terms of three attributes: hue, saturation, and lightness. Hue is the actual color of the light, while saturation represents the intensity or purity of the hue. Lightness refers to the amount of white or black added to the color. The HSL color model is often used in computer graphics, web design, and image editing software.

2. HSB (Hue, Saturation, Brightness):

HSB is another color model that uses hue and saturation to define colors, but it replaces lightness with brightness. Brightness refers to the overall intensity of the color, regardless of its hue or saturation. This color model is commonly used in design software, such as Adobe Photoshop and Illustrator.

3. XYZ (CIE 1931 color space):

The XYZ color model is based on the CIE 1931 color space, which was developed by the International Commission on Illumination (CIE). It defines colors in terms of three dimensions: X, Y, and Z. These dimensions correspond to the perception of color in the human eye, with X representing the response to red, Y representing the response to green, and Z representing the response to blue. The XYZ color model is often used in color management, color correction, and color conversion applications.

Each of these color models has its own strengths and weaknesses, and is suited to different applications.

Here's an interactive p5.js example that lets the user adjust the hue, saturation, and lightness of a color using sliders:


{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let hueSlider, satSlider, lightSlider;

function setup() {
  createCanvas(400, 400);
  
  // Create sliders for hue, saturation, and lightness
  hueSlider = createSlider(0, 360, 0);
  hueSlider.position(20, 20);
  satSlider = createSlider(0, 100, 50);
  satSlider.position(20, 50);
  lightSlider = createSlider(0, 100, 50);
  lightSlider.position(20, 80);
}

function draw() {
  // Get the current values of the sliders
  let hue = hueSlider.value();
  let sat = satSlider.value();
  let light = lightSlider.value();
  
  // Set the background color based on the current values of the sliders
  colorMode(HSL);
  background(hue, sat, light);
  
  // Draw a rectangle with the current color values
  noStroke();
  fill(hue, sat, light);
  rect(150, 150, 100, 100);
  
  // Display the current values of the sliders
  textAlign(LEFT, CENTER);
  textSize(16);
  fill(0);
  text("Hue: " + hue, hueSlider.x + hueSlider.width + 10, hueSlider.y + hueSlider.height / 2);
  text("Saturation: " + sat + "%", satSlider.x + satSlider.width + 10, satSlider.y + satSlider.height / 2);
  text("Lightness: " + light + "%", lightSlider.x + lightSlider.width + 10, lightSlider.y + lightSlider.height / 2);
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/HSL.js" width="430" height="430" >}}


The HSL model can be represented in the next bicone:

![HSL bicone](/showcase/sketches/doblecone.png)
[From Wikipedia](https://es.wikipedia.org/wiki/Modelo_de_color_HSL#/media/Archivo:Doble_cono_de_la_coloraci%C3%B3n_HSL.png).