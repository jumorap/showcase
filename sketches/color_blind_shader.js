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
