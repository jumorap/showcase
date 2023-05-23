# Coloring

{{< hint info >}}
**Exercises**

1. Figure it out the js code for color blending sketches.
2. Implement other blending modes. Take this [reference](https://p5js.org/reference/#/p5/blendMode) as starting point.
{{< /hint >}}

## Little background

Color blending refers to the process of combining two or more colors together to create new colors or achieve a desired visual effect. It is commonly used in various art forms, design applications, and digital image editing. By blending colors, you can create smooth transitions, gradients, or harmonious color schemes.

Here are the types of color blending:

* Normal: In the Normal blending mode, the color of the top layer is simply placed over the color of the underlying layer without any modification. Each pixel in the top layer replaces the corresponding pixel in the underlying layer, resulting in a straightforward stacking of colors.

* Multiply: In the Multiply blending mode, the color values of the corresponding pixels in the top and underlying layers are multiplied together. This multiplication operation darkens the resulting color. The resulting pixel color is calculated by multiplying the color values (RGB or CMYK) of each channel in the top layer with the corresponding color values in the underlying layer.

* Screen: The Screen blending mode is the opposite of Multiply. In this mode, the color values of the corresponding pixels in the top and underlying layers are inverted, multiplied, and inverted back. This multiplication operation produces a lighter color. The resulting pixel color is calculated by inverting the color values, multiplying them, and then inverting them back to their original range.

* Overlay: The Overlay blending mode combines the effects of Multiply and Screen blending modes. It determines the resulting pixel color by checking the brightness of the corresponding pixel in the underlying layer. If the underlying pixel is darker than 50% gray, the Multiply operation is applied. If the underlying pixel is lighter than 50% gray, the Screen operation is applied. This blending mode enhances contrast and adds depth to the image.

* Soft Light: In the Soft Light blending mode, the resulting pixel color is calculated by darkening or lightening the underlying color based on the brightness of the corresponding pixel in the top layer. If the top pixel is brighter than 50% gray, the underlying color is lightened. If the top pixel is darker than 50% gray, the underlying color is darkened. The amount of darkening or lightening is determined by the difference in brightness between the top and underlying pixels.

* Hard Light: Similar to Soft Light, the Hard Light blending mode also adjusts the underlying color based on the brightness of the corresponding pixel in the top layer. However, in this mode, the adjustment is more pronounced, resulting in a stronger contrast and dramatic effect.

* Difference: The Difference blending mode calculates the absolute difference between the color values of the corresponding pixels in the top and underlying layers. The resulting color is the absolute value of the difference, effectively creating an inverted or negative-like effect. It subtracts the color values of the underlying layer from the top * layer.

* Hue: In the Hue blending mode, the resulting pixel color adopts the hue (color) of the top layer while preserving the luminosity and saturation of the underlying layer. The resulting pixel's hue is determined solely by the top layer, while the underlying layer contributes to the brightness and saturation.

* Saturation: The Saturation blending mode retains the luminosity and hue of the underlying layer while adopting the saturation (intensity) of the top layer. The resulting pixel's saturation is determined solely by the top layer, while the underlying layer contributes to the brightness and hue.

* Color: The Color blending mode keeps the brightness and saturation of the underlying layer and adopts the hue of the top layer. The resulting pixel's hue is determined solely by the top layer, while the underlying layer contributes to the brightness and saturation.

In each blending mode, the color values of the corresponding pixels in the top and underlying layers are combined using specific mathematical operations or comparisons to determine the resulting pixel color. These operations or comparisons can be simple arithmetic calculations or complex algorithms depending on the blending mode and the specific color space being used (RGB, CMYK, etc.).

## Solution

The following p5 script allow you to visualize several types of color blending techniques and let you select colors for the blending.

{{< p5-iframe sketch="/showcase/sketches/blendcolor.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

Also, you can select the type of blending from the select at the top of the canvas.

# Something else

Here's an implementation of filters that allow you to se the an image like people with color blind, the implementation allow you to chose the type of color blind desease.


{{< p5-iframe sketch="/showcase/sketches/color_blind_shader.js" width="550" height="400" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

{{< details title="color_blind.frag" open=false >}}
{{< highlight glsl >}}
// welcome to your first ever shader :)
// in glsl it is mandatory to define a precision!
precision mediump float;
precision mediump int;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
uniform sampler2D u_texture;
uniform mediump int index;
varying vec2 texcoords2;


void main() {
  mat3 colorMats[9];
  colorMats[0] = mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
  colorMats[1] = mat3(0.567, 0.433, 0.000, 0.558, 0.442, 0.000, 0.000, 0.242, 0.758);
  colorMats[2] = mat3(0.817, 0.183, 0.000, 0.333, 0.667, 0.000, 0.000, 0.125, 0.875);
  colorMats[3] = mat3(0.625, 0.375, 0.000, 0.700, 0.300, 0.000, 0.000, 0.300, 0.700);
  colorMats[4] = mat3(0.800, 0.200, 0.000, 0.258, 0.742, 0.000, 0.000, 0.142, 0.858);
  colorMats[5] = mat3(0.950, 0.050, 0.000, 0.000, 0.433, 0.567, 0.000, 0.475, 0.525);
  colorMats[6] = mat3(0.967, 0.033, 0.00, 0.00, 0.733, 0.267, 0.00, 0.183, 0.817);
  colorMats[7] = mat3(0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114);
  colorMats[8] = mat3(0.618, 0.320, 0.062, 0.163, 0.775, 0.062, 0.163, 0.320, 0.516);

  vec4 texel = texture2D(u_texture, texcoords2);
  vec3 colortransform;

  if (index == 0) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[0];
  }else if (index == 1) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[1];
  }else if (index == 2) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[2];
  }else if (index == 3) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[3];
  }else if (index == 4) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[4];
  }else if (index == 5) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[5];
  }else if (index == 6) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[6];
  }else if (index == 7) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[7];
  }else if (index == 8) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[8];
  }else {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[0];
  }


  gl_FragColor = vec4(colortransform, 1.0);

}
{{< /highlight >}}
{{< /details >}}

{{< details title="color_blind_shader.js" open=false >}}
{{< highlight JavaScript >}}
let colorMats = [
    'Normal vision',
    // Red-Blind
    'Protanopia',
    // Red-Weak
    'Protanomaly',
    // Green-Blind
    'Deuteranopia',
    // Green-Weak
    'Deuteranomaly',
    // Blue-Blind
    'Tritanopia',
    // Blue-Weak
    'Tritanomaly',
    // Monochromacy
    'Achromatopsia',
    // Blue Cone Monochromacy
    'Achromatomaly'
];


let input, button, img, video;
let imgURL = 'https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg';
let canvassize = [600, 400];
let usedColors = {};
let checkboxes = [];
let typeSelect;
let myshader;
let f;
let indexColor = 0;
let train = false;

function preload() {
    myshader = readShader('/showcase/sketches/shaders/color_blind.frag', { varyings: Tree.texcoords2 });
    f = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
    img = loadImage(imgURL);
}

function setup() {
    // Create a canvas to display the image and color mapping
    createCanvas(img.width, img.height, WEBGL);
    canvassize = [img.width, img.height];
    textFont(f, 20);

    video = createVideo('/showcase/sketches/mandrill.webm', () => {});
    video.hide();


    for (let index = 0; index < colorMats.length; index++) {
        let checkbox = createCheckbox(colorMats[index], false);
        // Aplica estilos CSS personalizados al checkbox
        checkbox.style('background-color', '#333');
        checkbox.style('color', 'white');
        checkbox.style('padding', '10px');
        checkbox.style('border-radius', '10%');
        checkbox.position(10, 30 * index);
        checkboxes.push(checkbox);
    }

    checkboxes.forEach(function (checkbox) {
        checkbox.changed(updateCheckboxes);
    });

    let checkbox = createCheckbox('video', false);
    checkbox.style('background-color', '#9587ed');
    checkbox.style('color', 'white');
    checkbox.style('padding', '10px');
    checkbox.changed(switchTrain);

    shader(myshader);
    textAlign(CENTER);
    textureMode(NORMAL);

}

function draw() {
    background(255);
    myshader.setUniform('u_texture', train ? video : img);
    beginShape();
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}


function switchTrain() {
    if (train) {
        video.pause();
        train = false;
    } else {
        video.play(); // Reanuda la reproducción del video
        train = true;
    }
}

function updateCheckboxes() {
    // Desmarca todos los checkboxes excepto el que se seleccionó
    checkboxes.forEach(function (checkbox) {
        if (checkbox !== this) {
            checkbox.checked(false);
        } else {
            indexColor = checkboxes.indexOf(checkbox);
            myshader.setUniform('index', indexColor);
        }
    }, this);
}

{{< /highlight >}}
{{< /details >}}
