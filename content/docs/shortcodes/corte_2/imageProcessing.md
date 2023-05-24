# Image Processing

{{< hint info >}}
Exercise
Implement an image / video processing app supporting different masks, including other kernel sizes different than 3x3, and:

* A region-of-interest base tool to selectively apply a given mask.Hint: circular regions around the mouse pointer are handy and quite simple to implement by means of glsl distance.
* A magnifier tool. Requires a bit of research. For instance, look for it in shadertoy.
* Integrate luma and other coloring brightness tools.
What other shader tools would you implement?
{{< /hint >}}

## Little background

See [masking](/showcase/docs/shortcodes/corte_1/masking/) for more info about masking and kernels. The following canvas allows you to apply convolutions to a given image and to images you upload.

{{< p5-iframe sketch="/showcase/sketches/kernelShader.js" width="600" height="600" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

{{< details title="kernelConvolution.frag" open=false >}}
{{< highlight glsl >}}

precision mediump float;

uniform sampler2D uTexture;  // Textura de entrada
uniform mat3 uMatrix;        // Matriz de convolución
uniform vec2 uTextureSize;   // Tamaño de la textura
uniform vec2 uCanvasSize;    // Tamaño del canvas
uniform vec2 uMouse;         // Posición del ratón
uniform bool uCircle;        // Si se usa un círculo o no
varying vec2 texcoords2;  // Coordenadas de textura interpoladas

vec2 truncate(vec2 value) {
  return clamp(value, 0.0, 1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy / uCanvasSize;
    float pct = step(distance(st, uMouse),0.3);

    // Realizar la convolución
    vec3 convolvedColor = vec3(0.0);
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 texcoords = truncate(texcoords2 + vec2(i, j) / uTextureSize);
            vec3 color = texture2D(uTexture, texcoords).rgb;
            convolvedColor += color * uMatrix[i+1][j+1];
        }
    }

    // Salida del fragmento
    pct = uCircle ? pct : 1.0;
    vec3 originalColor = texture2D(uTexture, texcoords2).rgb;

    gl_FragColor = vec4(mix(originalColor, convolvedColor, pct), 1.0);

}

{{< /highlight >}}
{{< /details >}}

{{< details title="kernelShader.frag" open=false >}}
{{< highlight JavaScript >}}
let dropdown;
let dropdownShader;
let myshader;
let shadercolortool;
let f;
let value = 0.5;
let img;
let checkbox;
let checkbox2;
let screeShader;

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


function preload() {
    img = loadImage("/showcase/sketches/goodman.jpg");
    shadercolortool = readShader('/showcase/sketches/shaders/texturing.frag', { varyings: Tree.texcoords2 });
    myshader = readShader('/showcase/sketches/shaders/kernelConvolution.frag', { varyings: Tree.texcoords2 });
    f = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
}

function setup() {
    createCanvas(575, 575, WEBGL);
    textFont(f, 20);

    // Add option to add a new image
    let fileInput = createFileInput(handleFile);
    fileInput.position(10, 10);

    // Crea el dropdown
    dropdown = createSelect();
    dropdownShader = createSelect();

    // Agrega opciones al dropdown
    dropdown.option('identity');
    dropdown.option('edge0');
    dropdown.option('edge1');
    dropdown.option('edge2');
    dropdown.option('sharpen');
    dropdown.option('boxBlur');
    dropdown.option('gaussianBlur');
    dropdown.option('emboss');

    // Aplica estilos CSS personalizados al dropdown
    dropdown.style('border-radius', '5px');
    dropdown.style('background-color', '#fff');
    dropdown.style('padding', '5px');

    // Posiciona el dropdown
    dropdown.position(100, 10);
    dropdown.changed(setKernel);

    // Agrega opciones al dropdownShader
    dropdownShader.option('none');
    dropdownShader.option('lightness');
    dropdownShader.option('hsv');
    dropdownShader.option('hsl');
    dropdownShader.option('cAvrg');

    // Posiciona el dropdownShader
    dropdownShader.position(380, 10);
    dropdownShader.changed(setColorbridness);
    dropdownShader.style('border-radius', '5px');
    dropdownShader.style('background-color', '#fff');
    dropdownShader.style('padding', '5px');

    checkbox = createCheckbox('Region of interest', false);
    checkbox.position(220, 10);
    checkbox.changed(setCircle);
    checkbox.style('background-color', '#000');
    checkbox.style('color', '#fff');

    checkbox2 = createCheckbox('keep changes', false);
    checkbox2.position(220, 40);
    checkbox2.style('background-color', '#000');
    checkbox2.style('color', '#fff');


    shader(myshader);
    shadercolortool.setUniform('texture', img);

    imageMode(CENTER);
    textureMode(NORMAL);

    screeShader = createGraphics(575, 575, WEBGL);
    screeShader.shader(shadercolortool);
    screeShader.imageMode(CENTER);
    screeShader.textureMode(NORMAL);

    myshader.setUniform('uTexture', screeShader);
    myshader.setUniform('uMatrix', kernels[dropdown.value()].flat());
    myshader.setUniform('uCanvasSize', [width, height]);
    myshader.setUniform('uTextureSize', [img.width, img.height]);
    myshader.setUniform('uCircle', checkbox.value());

    setColorbridness();
}

function draw() {
    background(255);
    let mouseXAdjusted = mouseX / width;
    let mouseYAdjusted = 1.0 - mouseY / height;
    myshader.setUniform('uMouse', [mouseXAdjusted, mouseYAdjusted]);

    screeShader.beginShape();
    screeShader.vertex(-1, -1, 0, 0, 1);
    screeShader.vertex(1, -1, 0, 1, 1);
    screeShader.vertex(1, 1, 0, 1, 0);
    screeShader.vertex(-1, 1, 0, 0, 0);
    screeShader.endShape();

    beginShape();
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}

function handleFile(file) {
    if (file.type === 'image') {
        img = loadImage(file.data, () => {
            shadercolortool.setUniform('texture', img);
            myshader.setUniform('uTexture', screeShader);
        });
    }
}

function setKernel() {
    myshader.setUniform('uMatrix', kernels[dropdown.value()].flat());
}

function setCircle() {
    myshader.setUniform('uCircle', checkbox.checked());
}

function setColorbridness() {
    let uv = false;
    let hsv = dropdownShader.value() == 'hsv' ? true : false;
    let hsl = dropdownShader.value() == 'hsl' ? true : false;
    let cAvrg = dropdownShader.value() == 'cAvrg' ? true : false;
    let lightness = dropdownShader.value() == 'lightness' ? true : false;

    shadercolortool.setUniform('hsv', hsv);
    shadercolortool.setUniform('hsl', hsl);
    shadercolortool.setUniform('cAvrg', cAvrg);
    shadercolortool.setUniform('lightness', lightness);
    shadercolortool.setUniform('uv', uv);
    shadercolortool.setUniform('textureTinting', value);
    shadercolortool.setUniform('texture', img);
}


{{< /highlight >}}
{{< /details >}}

## How to use

You can use the selector to choose the type of kernel convolution. Similarly, if you click on the checkbox, you can have the convolution centered around the area near the mouse cursor. Additionally, you can apply various brightness filters to the image. Likewise, you can load many other images of your own and test different results with them.

## Little explanation of the code

Let's go through the code **kernelConvolution.frag** step by step:

1. The line precision mediump float; specifies the precision for floating-point calculations in the shader. In this case, it uses medium precision.

2. The uniform keyword is used to declare variables that are constant across all invocations of the shader. In this code, the following uniforms are declared:

* uTexture is a 2D texture sampler representing the input texture.
* uMatrix is a 3x3 matrix used for convolution.
* uTextureSize is a 2D vector representing the size of the input texture.
* uCanvasSize is a 2D vector representing the size of the canvas.
* uMouse is a 2D vector representing the position of the mouse.
* uCircle is a boolean indicating whether a circle is used or not.

3. The varying keyword is used to declare variables that are interpolated across the primitive being rendered. In this code, texcoords2 is a 2D vector representing the interpolated texture coordinates.

4. The truncate function clamps a vector's components between 0.0 and 1.0. It is used to ensure that texture coordinates stay within the valid range.

5. The main function is the entry point of the fragment shader. It is executed for each fragment (pixel) of the rendered primitive.

6. The first two lines inside the main function calculate the normalized texture coordinates (st) of the current fragment by dividing the fragment coordinates (gl_FragCoord.xy) by the canvas size (uCanvasSize).

7. The step function is used to create a step function (pct) based on the distance between the current texture coordinate and the mouse position (uMouse). It sets pct to 1.0 if the distance is less than 0.3, and 0.0 otherwise.

8. The nested for loops iterate over a 3x3 neighborhood centered around the current fragment. It calculates the texture coordinates (texcoords) for each neighbor and retrieves the color value from the input texture using texture2D. The color is multiplied by the corresponding value in the convolution matrix (uMatrix) and accumulated in the convolvedColor variable.

9. The pct value is updated based on the uCircle flag. If uCircle is true, pct remains unchanged; otherwise, it is set to 1.0.

10. The original color of the current fragment is retrieved from the input texture using the original texture coordinates (texcoords2).

11. The final color of the fragment is calculated by linearly interpolating between the original color and the convolved color based on the pct value. The resulting color is assigned to gl_FragColor, which represents the output color of the fragment. The alpha value is set to 1.0 (fully opaque).