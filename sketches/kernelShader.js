let dropdown;
let dropdownShader;
let myshader;
let shadercolortool;
let magnifiershader;
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
    magnifiershader = readShader('/showcase/sketches/shaders/magnifier.frag', { varyings: Tree.texcoords2 });
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

    checkbox2 = createCheckbox('Magnifier', false);
    checkbox2.position(220, 40);
    checkbox2.changed(setMagnifier);
    checkbox2.style('background-color', '#000');
    checkbox2.style('color', '#fff');

    
    shadercolortool.setUniform('texture', img);
    magnifiershader.setUniform('uTexture', img);

    imageMode(CENTER);
    textureMode(NORMAL);

    screeShader = createGraphics(575, 575, WEBGL);
    screeShader.shader(shadercolortool);
    screeShader.imageMode(CENTER);
    screeShader.textureMode(NORMAL);

    shader(myshader);
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
    magnifiershader.setUniform('uMouse', [mouseXAdjusted, mouseY / height]);
    magnifiershader.setUniform('umagnifierPos', [mouseXAdjusted, mouseY / height]);

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

function setMagnifier(){
    if(checkbox2.checked()){
        screeShader.shader(magnifiershader);
    }else{
        screeShader.shader(shadercolortool);
    }
    magnifiershader.setUniform('umagnifierSize', 0.3);
    magnifiershader.setUniform('uTexture', img);
    
}
