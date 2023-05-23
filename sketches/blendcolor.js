let colorPicker;
let colorPicker2;
let dropdown;
let myshader;
let screen;
let f;
let value = 0.5;

let optionIndices = {
    "Multiply": 0,
    "Screen": 1,
    "Overlay": 2,
    "Soft Light": 3,
    "Hard Light": 4,
    "Difference": 5
};


function preload() {
    myshader = [
        readShader('/showcase/sketches/shaders/blend2.frag', { varyings: Tree.texcoords2 }),
        readShader('/showcase/sketches/shaders/blend3.frag', { varyings: Tree.texcoords2 }),
        readShader('/showcase/sketches/shaders/blend4.frag', { varyings: Tree.texcoords2 }),
        readShader('/showcase/sketches/shaders/blend5.frag', { varyings: Tree.texcoords2 }),
        readShader('/showcase/sketches/shaders/blend6.frag', { varyings: Tree.texcoords2 }),
        readShader('/showcase/sketches/shaders/blend7.frag', { varyings: Tree.texcoords2 })
    ];
    f = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
}

function setup() {
    createCanvas(575, 575, WEBGL);
    textFont(f, 20);
    screen = createGraphics(width, height, WEBGL);
    screen.shader(myshader[0]);

    // Crea el elemento input de tipo range
    let slider = createSlider(0, 100, value * 100);
    slider.position(height / 2 - 75, width / 2 - 25);
    slider.style('width', '150px');
    // Asigna una función de devolución de llamada al deslizar la barra
    slider.input(updateValue);

    // Crea el input de color
    colorPicker = createInput('');
    colorPicker.attribute('type', 'color');
    colorPicker2 = createInput('');
    colorPicker2.attribute('type', 'color');

    // Crea el dropdown
    dropdown = createSelect();

    // Agrega opciones al dropdown
    dropdown.option('Multiply');
    dropdown.option('Screen');
    dropdown.option('Overlay');
    dropdown.option('Soft Light');
    dropdown.option('Hard Light');
    dropdown.option('Difference');

    // Aplica estilos CSS personalizados al dropdown
    dropdown.style('border-radius', '5px');
    dropdown.style('background-color', '#ADF3EC');
    dropdown.style('padding', '5px');

    // Posiciona el dropdown
    dropdown.position(250, 20);

    // Posiciona el input de color
    colorPicker.position(100, 100);
    colorPicker2.position(400, 100);
    rectMode(CENTER);
}

function draw() {
    background(255);
    screen.shader(myshader[optionIndices[dropdown.value()]]);
    myshader[optionIndices[dropdown.value()]].setUniform('uMaterial1', hexToRGBA(colorPicker.value()));
    myshader[optionIndices[dropdown.value()]].setUniform('uMaterial2', hexToRGBA(colorPicker2.value()));
    myshader[optionIndices[dropdown.value()]].setUniform('brightness', value);

    // Obtiene el valor seleccionado en el input de color
    let selectedColor = colorPicker.value();
    let selectedColor2 = colorPicker2.value();

    // Muestra el valor seleccionado en el lienzo
    fill(selectedColor);
    rect(-150, -100, 200, 100);

    fill(selectedColor2);
    rect(150, -100, 200, 100);

    // Dibuja el contenido del "screen" en el lienzo principal
    imageMode(CENTER);
    image(screen, 0, 100, width / 2, height / 4);
    screen.push();
    screen.rectMode(CENTER);
    screen.textureMode(NORMAL);
    screen.beginShape();
    screen.vertex(-1, -1, 0, 0, 1);
    screen.vertex(1, -1, 0, 1, 1);
    screen.vertex(1, 1, 0, 1, 0);
    screen.vertex(-1, 1, 0, 0, 0);
    screen.endShape();
    screen.pop();
}


function hexToRGBA(hex) {
    // Elimina el símbolo '#' del valor hexadecimal
    hex = hex.replace('#', '');

    // Divide el valor hexadecimal en componentes RGB y A
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    let a = 255; // Valor de opacidad, puedes ajustarlo según sea necesario

    // Devuelve el color en formato RGBA
    return [r / 255, g / 255, b / 255, a / 255];
}

function updateValue() {
    // Actualiza el valor de la barra en base al deslizador
    value = this.value() / 100;
}


