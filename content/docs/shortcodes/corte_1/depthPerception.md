# Depth Perception

{{< hint info >}}
**Exercise**
Take advantage of monocular cues to implement a 2D sketch to trick the eye into perceiving a 3D scene.
{{< /hint >}}

## Solution
Implementation of Ebbinghaus illusion to use monocular cues to trick the eye into perceiving a 3D scene:

{{< details title="Code Implementation" open=false >}}
{{< highlight JavaScript >}}
let x1, y1, flag, radio, button, a, x6, y6, x7, y7, y5, x5, y4, x4, y3, x3, y2, x2, z1, z2, z3, z4, z5, z6, z7, lineW, canvasWidth, canvasHeight, delta;

canvasWidth = canvasHeight = 700;
x1 = y1 = 150;
z1 = z2 = z3 = z4 = z5 = z6 = z7 = 70;
flag = 1;
radio = 80
lineW = 20;
delta = 0.15;

function setup() {
createCanvas(canvasWidth, canvasHeight);

    button = createButton('Draw line');
    button.position(10, 10);
    button.mousePressed(drawLine);
}

function draw() {
background(0);

    stroke(50);
    fill(100);
    ellipse(x1, y1, 30);

    if (flag === 1){
        x1--;
        y1--;
        radio += delta;
    } else {
        x1++;
        y1++;
        radio -= delta;
    }

    x2 = radio + x1 - 1;
    y2 = y1 - 1;
    [x2, y2, z2] = circlesGen(x2, y2, z2, 1, 0)

    x3 = -radio + x1 - 1;
    y3 = y1 - 1;
    [x3, y3, z3] = circlesGen(x3, y3, z3, -1, 0)

    x4 = 0.5 * radio + x1 - 1;
    y4 = 0.86 * radio + y1 - 1;
    [x4, y4, z4] = circlesGen(x4, y4, z4, 0.5, 0.86)

    x5 = -0.5 * radio + x1 - 1;
    y5 = 0.86 * radio + y1 - 1;
    [x5, y5, z5] = circlesGen(x5, y5, z5, -0.5, 0.86)

    x6 = 0.5 * radio + x1 - 1;
    y6 = -0.86 * radio + y1 - 1;
    [x6, y6, z6] = circlesGen(x6, y6, z6, 0.5, -0.86)

    x7 = -0.5 * radio + x1 - 1;
    y7 = -0.86 * radio + y1 - 1;
    [x7, y7, z7] = circlesGen(x7, y7, z7, -0.5, -0.86)

    if (a === 1) {
        lineGen(lineW, 0, canvasWidth + lineW, canvasHeight);
        lineGen(0, lineW, canvasWidth, canvasHeight + lineW);
    }

    if (y1 < 150) flag = 0;
    if (x1 > 500) flag = 1;
}

/**
* Draw the line on the canvas when the button is pressed
* @param lw1 position of the line on the x axis
* @param lw2 position of the line on the y axis
* @param cw width of the canvas
* @param ch height of the canvas
  */
const lineGen = (lw1, lw2, cw, ch) => {
stroke(255, 255, 255);
line(lw1, lw2, cw, ch);
}

/**
* Generate the circles to be drawn on the canvas in each frame of the animation
* @param x value of the x coordinate of the circle
* @param y value of the y coordinate of the circle
* @param z value of the z coordinate of the circle
* @param rx Represents the x coordinate of the point on the circle
* @param ry Represents the y coordinate of the point on the circle
* @returns {[number,number,undefined]} Returns the x and y coordinates of the circle
  */
const circlesGen = (x, y ,z , rx, ry) => {
stroke(50);
fill(255, 255, 255);
ellipse(x, y, z);

    if (flag === 1) {
        x = (rx * radio) + x1 - 1;
        y = (ry * radio) + y1 - 1;
        z += delta;
    } else {
        x = (rx * radio) + x1 + 1;
        y = (ry * radio) + y1 + 1;
        z -= delta;
    }

    return ([x, y, z]);
}

/**
* Draw a line on the canvas when the button is pressed
* @returns {number} 0 or 1
  */
const drawLine = () => a = a === 1 ? 0 : 1;
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/depthPerception.js" width="724" height="724" >}}

## Description

The code is using the Ebbinghaus illusion to create the appearance of the monocular cue of size constancy. The Ebbinghaus illusion is a visual illusion in which the perceived size of a central object is affected by the size of surrounding objects. In this case, the central object is a circle, and the surrounding objects are other circles of different sizes.

The illusion works because our brains use size constancy to interpret the size of objects in the world around us. Size constancy is the ability to perceive the true size of an object even when it appears smaller or larger due to its distance from us. The brain uses various visual cues, including the size of surrounding objects, to determine the true size of an object.

## Usages

Applications of this illusion include optical illusions, art, and design. Optical illusions use visual tricks to create the impression of movement, depth, or other effects that do not actually exist. In art and design, the use of monocular cues such as size constancy can help create a sense of depth and realism in two-dimensional images.
