# Masking

{{< hint info >}}
**Exercise**

Implement a kinegram and some moiré patterns which are close related visual phenomena to masking.
{{< /hint >}}


## Little Background:

Kinegrams are two-dimensional images that appear to move or animate when viewed from different angles or under different lighting conditions. They are typically created by printing or engraving a pattern onto a flat surface and then placing a transparent overlay on top of the pattern that contains a second, complementary pattern. When the two patterns are viewed together, they create the illusion of motion or animation.

Kinegrams were first developed in the early 1970s by Swiss artist and inventor Jean Tinguely, who used them to create kinetic sculptures that appeared to move and change shape when viewed from different angles. Since then, kinegrams have been used for a variety of purposes, including security features on banknotes and passports, as well as for artistic and entertainment purposes.

Moiré patterns, on the other hand, are interference patterns that are created when two similar patterns are overlaid or superimposed on each other. These patterns can be either static or dynamic, and can create a wide range of visual effects, including the illusion of movement, depth, and texture.

Moiré patterns have been studied extensively in the field of computer graphics, where they are used to create a variety of visual effects, such as texture mapping and bump mapping. They are also used in printing and graphic design, where they can create interesting visual effects when printed on different types of paper or other materials.

In the field of visual perception, moiré patterns are often used as a tool for studying how the human brain processes visual information. For example, researchers have used moiré patterns to study how the brain perceives motion and depth, as well as to investigate the neural mechanisms underlying visual illusions and hallucinations.

# Solution:

{{< p5-iframe sketch="/showcase/sketches/kinegram.js" width="700" height="600" >}}
{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let pic
let pic2
let x = 0
let canvassizex = 680;
let canvassizey = 575;
let imagesize = canvassizex / 2;
let tileCount = 0;
let mycolor = [0, 0, 0];
let speed = 1;
let input;
let button;

function preload() {
  pic = loadImage('/showcase/sketches/kinegram.jpg');
  input = createInput();
}

function setup() {
  createCanvas(canvassizex, canvassizey);
  typeSelect = createRadio();
  typeSelect.option('kinegram');
  typeSelect.option('kinegram2');
  typeSelect.option('kinegram3');
  typeSelect.style('font-size', '10px');
  typeSelect.style('text-align', 'center');
  typeSelect.style('align', 'center');
  typeSelect.position(0, 0);
  typeSelect.value('Normal vision');
  typeSelect.changed(program);
  
  // create a slider element and position it on the canvas
  const slider = createSlider(-300, 300, tileCount);
  slider.position(200, 0);
  slider.input(() => {
    tileCount = slider.value();
  });

  const speedslider = createSlider(1, 10, speed);
  speedslider.position(200, 30);
  speedslider.input(() => {
    speed = speedslider.value();
  });

  const r = createSlider(0, 255, red);
  r.position(canvassizex-200, 20);
  r.input(() => {
    mycolor[0] = r.value();
  });

  const g = createSlider(0, 255, green);
  g.position(canvassizex-200, 40);
  g.input(() => {
    mycolor[1] = g.value();
  });

  const b = createSlider(0, 255, blue);
  b.position(canvassizex-200, 60);
  b.input(() => {
    mycolor[2] = b.value();
  });
  
  
  // Create a text input and button
  input.position(0, canvassizey - 20);
  button = createButton('imge URL or reset');
  button.position(input.x + input.width, canvassizey - 20);
  button.mousePressed(buttonpressed);
}

function buttonpressed() {
  url = input.value() || '/showcase/sketches/kinegram.jpg';
  pic = loadImage(url);
  imagesize = canvassizex / 2;
}

function program() {
  pic = loadImage('/showcase/sketches/' + typeSelect.value() + '.jpg');
  switch (typeSelect.value()) {
    case 'kinegram':
      imagesize = canvassizex / 2;
      break;
    case 'kinegram2':
      imagesize = canvassizex;
      break;
    case 'kinegram3':
      imagesize = canvassizex - 50;
      break;
  }
}

function draw() {
  background(255);
  imageMode(CENTER);
  pic.resize(imagesize, 0)
  image(pic, canvassizex / 2, canvassizey / 2);

  for (let j = 0; j < 2000; j += 8) {
    stroke(color(mycolor))
    strokeWeight(4)
    line(x + j + tileCount, 30, x + j, height)
    strokeWeight(4)
    line(x - j + tileCount, 30, x - j, height)
  }

  rect(canvassizex-240, 10, 230, 60);
  strokeWeight(1);
  text("R", canvassizex-230, 25);
  text("G", canvassizex-230, 45);
  text("B", canvassizex-230, 65);

  if (x > canvassizex) {
    x = 0
  } else {
    x = x + speed *0.2
  }

}
{{< /highlight >}}
{{< /details >}}

## Description

This program displays a selected image and creates a dynamic pattern of lines over it. The user can select the image from three options available in a radio button. The user can also adjust the number of lines and their colors using sliders. The user can input a URL to display a different image.

## Instructions

* Select an image from the radio button labeled "Image type".
* Adjust the number of lines using the "Line Count" slider.
* Adjust the speed of the pattern using the "Speed" slider.
* Adjust the color of the lines using the "R", "G", and "B" sliders.
* Optionally, input a URL for a different image in the input box at the bottom left corner of the canvas.
* Click the "Image URL or reset" button to load the selected image or reset the canvas to the default image.

## Posible future work

One possible future work related to this code could be to explore different moiré patterns and their properties.This code already creates a basic moiré pattern by overlaying two sets of diagonal lines at different frequencies, but there are many other types of moiré patterns that could be explored.

Some possible directions for future work could include:

1. Investigating the underlying mathematical principles that govern the creation of moiré patterns and using this knowledge to create more complex and intricate patterns.

2. Applying moiré patterns to other visual media, such as images or video, to explore the potential of these patterns in different contexts.


{{< hint info >}}
**Exercise**

Research & implement some dither visual apps.
{{< /hint >}}

# Solution:

First of all, we shall see how to reduce the number of colors of an image without applying a dithering algorithm, naturally we will apply some color reduction function that map each color from each pixel to the closest in the reduced mapping, the below p5 implementation show the naivest way of reducing color on an image without using a dithering algorithm.

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let venus;
let canvassizex = 680;
let canvassizey = 575;
let tileCount = 1;
let globalimg;

function preload() {
    venusOriginal = loadImage("/showcase/sketches/venus.jpg");
}

function setup() {
    createCanvas(canvassizex, canvassizey);
    resizeCanvas(canvassizex, venusOriginal.height * 2 + 10);
    const slider = createSlider(1, 10, tileCount);
    slider.position(0, venusOriginal.height * 2 + 5);
    slider.input(() => {
        tileCount = slider.value();
        drawImages();
    });
    drawImages();
}

function drawImages() {
    image(venusOriginal, 0, 0);
    loadImage("/showcase/sketches/venus.jpg", img => {
        globalimg = img;
        makeDithered(tileCount);
        fill(255);
        rect(5, venusOriginal.height * 2 - 30, 200, 20);
        fill(0);
        text("Using:" + pow(tileCount+1,3)+" colors!", 15, venusOriginal.height * 2 - 18);
    });
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(steps, value) {
    return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(tileCount) {
    
    globalimg.loadPixels();

    let pixs = globalimg.pixels;

    for (let y = 0; y < globalimg.height; y++) {
        for (let x = 0; x < globalimg.width; x++) {
            let index = (x + y * globalimg.width) * 4;
            let oldR = pixs[index];
            let oldG = pixs[index + 1];
            let oldB = pixs[index + 2];

            let newR = closestStep(tileCount, oldR);
            let newG = closestStep(tileCount, oldG);
            let newB = closestStep(tileCount, oldB);

            pixs[index] = newR;
            pixs[index + 1] = newG;
            pixs[index + 2] = newB;
        }
    }

    globalimg.updatePixels();
    globalimg.resize(canvassizex, 0);
    image(globalimg, 0, venusOriginal.height);
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/naivedither.js" width="700" height="600" >}}


## Floyd-Steinberg Dithering

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let venus;
let canvassizex = 680;
let canvassizey = 575;
let tileCount = 1;
let globalimg;

function preload() {
    venusOriginal = loadImage("/showcase/sketches/venus.jpg");
}

function setup() {
    createCanvas(canvassizex, canvassizey);
    resizeCanvas(canvassizex, venusOriginal.height * 2 + 10);
    const slider = createSlider(1, 10, tileCount);
    slider.position(0, venusOriginal.height * 2 + 5);
    slider.input(() => {
        tileCount = slider.value();
        drawImages();
    });
    drawImages();
}

function drawImages() {
    image(venusOriginal, 0, 0);
    loadImage("/showcase/sketches/venus.jpg", img => {
        globalimg = img;
        makeDithered(tileCount);
        fill(255);
        rect(5, venusOriginal.height * 2 - 30, 200, 20);
        fill(0);
        text("Using:" + pow(tileCount+1,3)+" colors!", 15, venusOriginal.height * 2 - 18);
    });
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(steps, value) {
    return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(tileCount) {
    
    globalimg.loadPixels();

    let pixs = globalimg.pixels;

    for (let y = 0; y < globalimg.height; y++) {
        for (let x = 0; x < globalimg.width; x++) {
            let index = (x + y * globalimg.width) * 4;
            let oldR = pixs[index];
            let oldG = pixs[index + 1];
            let oldB = pixs[index + 2];

            let newR = closestStep(tileCount, oldR);
            let newG = closestStep(tileCount, oldG);
            let newB = closestStep(tileCount, oldB);

            pixs[index] = newR;
            pixs[index + 1] = newG;
            pixs[index + 2] = newB;

            let quant_error_R = oldR - newR;
            let quant_error_G = oldG - newG;
            let quant_error_B = oldB - newB;

            if (x < globalimg.width - 1) {
                pixs[index + 4] += quant_error_R * 7 / 16;
                pixs[index + 5] += quant_error_G * 7 / 16;
                pixs[index + 6] += quant_error_B * 7 / 16;
            }

            if (x > 0 && y < globalimg.height - 1) {
                pixs[index - 4 + width * 4] += quant_error_R * 3 / 16;
                pixs[index - 3 + width * 4] += quant_error_G * 3 / 16;
                pixs[index - 2 + width * 4] += quant_error_B * 3 / 16;
            }

            if (y < globalimg.height - 1) {
                pixs[index + width * 4] += quant_error_R * 5 / 16;
                pixs[index + width * 4 + 1] += quant_error_G * 5 / 16;
                pixs[index + width * 4 + 2] += quant_error_B * 5 / 16;
            }

            if (x < globalimg.width - 1 && y < globalimg.height - 1) {
                pixs[index + 4 + width * 4] += quant_error_R * 1 / 16;
                pixs[index + 5 + width * 4] += quant_error_G * 1 / 16;
                pixs[index + 6 + width * 4] += quant_error_B * 1 / 16;
            }
        }
    }

    globalimg.updatePixels();
    globalimg.resize(canvassizex, 0);
    image(globalimg, 0, venusOriginal.height);
}

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/dither.js" width="700" height="600" >}}

`Use p5 slader to increase color space! ↑`

Floyd-Steinberg dithering is a way of converting a color image into a simpler, lower-quality image with fewer colors. It does this by spreading out the "error" between the original colors and the new, simplified colors to the surrounding pixels.

The algorithm works by scanning the image one pixel at a time, from left to right and top to bottom. For each pixel, it finds the closest available color in the new, simplified color palette. It then sets that pixel to the new color, and calculates the difference between the original color and the new color - this difference is called the "quantization error".

The algorithm then spreads this quantization error to the surrounding pixels, in a specific pattern, using a set of coefficients. These coefficients determine how much of the quantization error is spread to each surrounding pixel. By spreading out the error in this way, the algorithm is able to reduce the visible "banding" effect that can occur when converting images with many colors to a smaller number of colors.

Floyd-Steinberg dithering is often used when converting images to GIF format, which is limited to a maximum of 256 colors.

The code uses the pseudocode of the general algorith:

```Pseudocode
for each y from top to bottom do
    for each x from left to right do
        oldpixel := pixels[x][y]
        newpixel := find_closest_palette_color(oldpixel)
        pixels[x][y] := newpixel
        quant_error := oldpixel - newpixel
        pixels[x + 1][y    ] := pixels[x + 1][y    ] + quant_error × 7 / 16
        pixels[x - 1][y + 1] := pixels[x - 1][y + 1] + quant_error × 3 / 16
        pixels[x    ][y + 1] := pixels[x    ][y + 1] + quant_error × 5 / 16
        pixels[x + 1][y + 1] := pixels[x + 1][y + 1] + quant_error × 1 / 16
```
## Random Dithering

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let controlFactor = 0.1;
let canvassizex = 680;
let canvassizey = 400;
let venus;

function preload() {
    venus = loadImage("/showcase/sketches/venus.jpg");
}

function setup() {
    createCanvas(canvassizex, canvassizey);
    image(venus, 0, 0);
    onleftpressed();
}

function mouseClicked() {
    loadImage("/showcase/sketches/venus.jpg", function (img) {
        venus = img;
        onleftpressed();
    });
}


function myx(u, value) {
    let steps = 5;
    return round(steps * round(u * value) / 255) * floor(255 / steps);
}

function onleftpressed() {
    venus.loadPixels();

    let pix = venus.pixels;

    for (var i = 0; i < pix.length; i += 4) {
      
        pix[i] = myx(Math.random(0, 1), pix[i]);
        pix[i + 1] = myx(Math.random(0, 1), pix[i + 1]);
        pix[i + 2] = myx(Math.random(0, 1), pix[i + 2]);
    }
    venus.updatePixels();

    image(venus, 0, 0);

}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/dither2.js" width="700" height="450" >}}

Random dithering is a simple algorithm used for converting images from a higher number of colors to a lower number of colors. For example, if an image has 256 colors but we want to display it on a device that can only show 16 colors, we need to convert the image to use only those 16 colors.

The algorithm works by dividing the color space into a grid of pixels, where each pixel represents a color from the available palette. Then, for each pixel in the original image, the algorithm randomly chooses one of the pixels in the grid that best approximates the original color. The result is a new image that uses only the available colors in the palette.

The advantage of random dithering is that it is fast and simple to implement. However, the resulting image may have visible artifacts, such as color banding or noise, especially if the available palette has a small number of colors or if the original image has subtle color gradients.

Overall, random dithering can be a useful technique for reducing the number of colors in an image and generate kind of noise on it, but it may not be the best choice for high-quality or precise color reproduction.

## Possible Future work

One possible work related to this code could be to create a web application that allows users to upload an image and apply the Floyd-Steinberg dithering algorithm to it. The application could provide a slider for users to adjust the number of colors used in the dithering process, similar to the existing code. Additionally, the application could allow users to download the processed image or share it on social media.

To implement this, the code could be adapted to work with user-uploaded images instead of the hardcoded "venus.jpg" file. The "makeDithered" function could be modified to take an image as input, and the "drawImages" function could be updated to load the user-uploaded image and call the "makeDithered" function with it. The application could use a web framework such as Flask or Express to handle the image uploading and serve the processed image back to the user. Additionally, the application could use a front-end framework such as React or Vue.js to create a user-friendly interface for uploading images and adjusting the dithering settings.


{{< hint info >}}
**Exercise**

Implement in software an image processing web app supporting different image kernels and supporting:

* Image histogram visualization. 
* Different lightness (coloring brightness) tools.
{{< /hint >}}

# Solution:

## Kernel Convolution


{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
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

{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/kernels.js" width="700" height="600" >}}

Kernel convolution is a mathematical operation that is used in digital image processing to apply various image processing operations, such as edge detection, blur, sharpening, and more. It involves sliding a small matrix, called a kernel or filter, over an image and computing the dot product between the kernel and a corresponding small section of the image, usually a 3x3 or 5x5 pixel area.

For each pixel in the image, the kernel is centered over the pixel and the dot product is computed between the kernel and the surrounding pixels in the image. The result of this computation is a new value for the central pixel, which is usually a weighted sum of the values of the surrounding pixels.

The values in the kernel determine the specific operation that is being performed. For example, a kernel that is used for edge detection may have positive values on one side and negative values on the other, which helps to highlight the edges in an image. A kernel that is used for blur may have all positive values that are divided by the sum of the values, which helps to smooth out the image.

Convolution can be applied to color images by treating each color channel (red, green, and blue) separately, or by using a single kernel that takes into account all three color channels at once.

In summary, kernel convolution is a process of sliding a small matrix over an image and computing the dot product between the kernel and the surrounding pixels. The result is a new value for each pixel that is a weighted sum of the surrounding pixels, and the values in the kernel determine the specific operation being performed.

### Description

The provided code is a basic image processing program that allows you to apply different convolution filters to an image. Below are the instructions for using the program:

1. When you first load the program, an image will be displayed in the canvas. You can use the default image or provide your own image by entering its URL in the text input box located at the top of the page.

2. To apply a filter to the image, select the filter from the radio buttons located just below the text input box.

3. Once you have selected a filter, click the "imge URL or reset" button to apply the filter to the image.

4. The program supports several different filters, including identity, edge detection, box blur, and Gaussian blur, among others. You can see a list of available filters in the "kernels" object located near the top of the code.

5. In addition to filters, the program also includes a "Histograma" option in the radio button list. Selecting this option will generate an RGB histogram of the current image.

6. The program will automatically update the image whenever you change the input image or select a new filter. If you want to reset the image to its original state, you can simply reload the page.

## Possible future work

The current code provides some basic image filters such as identity, edge detection, blur, and sharpen filters. However, there are many other filters and effects that can be implemented such as sepia, grayscale, thresholding, hue/saturation, and many others.

Additionally, the current code only works with RGB images, and a future work could be to add support for other image formats such as grayscale, CMYK, or HSL. This would require modifying the code to handle the different color spaces and implementing the corresponding color conversion algorithms.

Another possible improvement could be to add support for user interaction, allowing users to adjust the parameters of the filters and effects. For example, users could adjust the strength of a filter or the threshold value of a thresholding effect. This would make the code more interactive and user-friendly.
## Lightness tools

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let img;
let hueSlider;
let saturationSlider;
let brightnessSlider;
let input;
let button;


function preload() {
  img = loadImage('https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg');
  input = createInput();
}

function setup() {
  createCanvas(400, 400);

  // Crea el slider de Hue
  hueSlider = createSlider(-360, 360, 0);
  hueSlider.position(20, height + 20);
  // Agrega una etiqueta para el slider de Hue
  let hueLabel = createElement('label', 'Hue');
  hueLabel.position(150, height);
  hueLabel.style('marginTop', '20px');

  // Crea el slider de Saturation
  saturationSlider = createSlider(0, 255, 127);
  saturationSlider.position(20, height + 50);
  // Agrega una etiqueta para el slider de Saturation
  let saturationLabel = createElement('label', 'Saturation');
  saturationLabel.position(150, height + 30);
  saturationLabel.style('marginTop', '20px');

  // Crea el slider de Brightness
  brightnessSlider = createSlider(-255, 255, 0);
  brightnessSlider.position(20, height + 80);
  // Agrega una etiqueta para el slider de Brightness
  let brightnessLabel = createElement('label', 'Brightness');
  brightnessLabel.position(150, height + 60);
  brightnessLabel.style('marginTop', '20px');

  // Actualiza la imagen cuando se mueve alguno de los sliders
  hueSlider.input(drawupdate);
  saturationSlider.input(drawupdate);
  brightnessSlider.input(drawupdate);

  
  // Create a text input and button
  input.position(0, 0);
  button = createButton('imge URL or reset');
  button.position(input.x + input.width, 0);

  image(img, 0, 0, width, height);
}


function drawupdate() {
  background(0);
  image(img, 0, 0, width, height);
  angle = radians(hueSlider.value());
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const matrix = [
    cos + (1 - cos) / 3, 1 / 3 * (1 - cos) - Math.sqrt(1 / 3) * sin, 1 / 3 * (1 - cos) + Math.sqrt(1 / 3) * sin,
    1 / 3 * (1 - cos) + Math.sqrt(1 / 3) * sin, cos + 1 / 3 * (1 - cos), 1 / 3 * (1 - cos) - Math.sqrt(1 / 3) * sin,
    1 / 3 * (1 - cos) - Math.sqrt(1 / 3) * sin, 1 / 3 * (1 - cos) + Math.sqrt(1 / 3) * sin, cos + 1 / 3 * (1 - cos)
  ];

  loadPixels();


  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let r = pixels[index] || 0;
      let g = pixels[index + 1] || 0;
      let b = pixels[index + 2] || 0;
      let average = (r + g + b) / 3;
      const newR = r * matrix[0] + g * matrix[1] + b * matrix[2];
      const newG = r * matrix[3] + g * matrix[4] + b * matrix[5];
      const newB = r * matrix[6] + g * matrix[7] + b * matrix[8];

      pixels[index] = average + (newR - average) * (saturationSlider.value() / 127) + brightnessSlider.value();
      pixels[index + 1] = average + (newG - average) * (saturationSlider.value() / 127) + brightnessSlider.value();
      pixels[index + 2] = average + (newB - average) * (saturationSlider.value() / 127) + brightnessSlider.value();
    }
  }
  updatePixels();
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/brightness.js" width="450" height="510" >}}

The above code is a Lightness tool that allows the user to adjust the hue, saturation, and brightness of an image using sliders. It applies a color matrix to the image to rotate the hue, which is controlled by the hueSlider slider. The saturation and brightness of the image are also adjusted by the saturationSlider and brightnessSlider, respectively.

The color matrix used to rotate the hue is based on the HSL (hue, saturation, lightness) color model, where the hue is rotated around the color wheel. The matrix is calculated using the angle of rotation provided by the hueSlider and is used to transform the RGB color values of each pixel in the image. The resulting colors are then adjusted based on the saturation and brightness sliders.

The drawupdate() function is called every time the user interacts with any of the three sliders, updating the image with the new settings. The function first clears the canvas with a black background, then loads the original image and applies the color matrix and the saturation and brightness adjustments to each pixel. Finally, the updated pixels are displayed on the canvas using the updatePixels() function.

Overall, the code provides a simple and interactive way to adjust the color and brightness of an image, making it a useful tool for image editing and manipulation.

## Possible future work

One possible future work related to this code could be the development of a photo editing application that allows users to modify the hue, saturation, and brightness of images. The code provided could serve as the basis for the image processing functions of the application.

The application could have a user-friendly interface with sliders similar to those in the code to adjust the hue, saturation, and brightness values. Additionally, the application could allow users to upload their own images or select from a gallery of pre-existing images.

Other potential features that could be added to the application could include image cropping, resizing, and adding text or stickers to the images. The application could also have the ability to save edited images and share them on social media platforms.

The application could be useful for a variety of purposes, including personal use, social media marketing, and graphic design.