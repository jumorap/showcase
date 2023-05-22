let lumaShader, src, img_src,
    glitchCheck, textureTintingText, glitchSlider, glitchEffectBool,
    lightLeaksCheck, lightLeaksSlider, lightLeaksText, lightLeaksBool,
    multiplyCheck, multiplySlider, multiplyText, multiplyEffectBool,
    threeDCheck, threeDSlider, threeDText, threeDEffectBool,
    blurCheck, blurSlider, blurText, blurEffectBool,
    pixelCheck, pixelSlider, pixelText, pixelEffectBool;


function preload() {
    lumaShader = readShader('/showcase/sketches/shaders/postEffect.frag',
        { varyings: Tree.texcoords2 });
    img_src = loadImage('/showcase/sketches/sketches/cat.png');
    src = img_src;
}

function setup() {
    createCanvas(700, 500, WEBGL);
    noStroke();
    textureMode(NORMAL);

    // Add option to add a new image
    let fileInput = createFileInput(handleFile);
    fileInput.position(10, 10);

    glitchCheck = createCheckbox('Glitch Effect', false);
    glitchCheck.position(10, 30);
    glitchCheck.style('color', 'white');
    glitchCheck.changed(() => lumaShader.setUniform('glitchEffectBool', glitchCheck.checked()));

    glitchSlider = createSlider(0.0, 1.0, 0.5, 0.01);
    glitchSlider.position(15, 50);
    glitchSlider.style('width', '80px');

    textureTintingText = createP(`Angle: ${glitchSlider.value() * 360}`);
    textureTintingText.position(110, 32);
    textureTintingText.style('color', 'white');

    // ----------------------------------

    lightLeaksCheck = createCheckbox('Light Leaks Effect', false);
    lightLeaksCheck.position(10, 70);
    lightLeaksCheck.style('color', 'white');
    lightLeaksCheck.changed(() => lumaShader.setUniform('lightLeaksBool', lightLeaksCheck.checked()));

    lightLeaksSlider = createSlider(0.0, 1.0, 0.5, 0.1);
    lightLeaksSlider.position(15, 90);
    lightLeaksSlider.style('width', '80px');

    lightLeaksText = createP(`Intensity + Location: ${lightLeaksSlider.value() * 100}`);
    lightLeaksText.position(110, 72);
    lightLeaksText.style('color', 'white');

    // ----------------------------------

    multiplyCheck = createCheckbox('Multiply Effect', false);
    multiplyCheck.position(10, 110);
    multiplyCheck.style('color', 'white');
    multiplyCheck.changed(() => lumaShader.setUniform('multiplyEffectBool', multiplyCheck.checked()));

    multiplySlider = createSlider(0.0, 1.0, 0.5, 0.1);
    multiplySlider.position(15, 130);
    multiplySlider.style('width', '80px');

    multiplyText = createP(`Angle: ${multiplySlider.value() * 10}`);
    multiplyText.position(110, 112);
    multiplyText.style('color', 'white');

    // ----------------------------------

    threeDCheck = createCheckbox('3D Effect', false);
    threeDCheck.position(10, 150);
    threeDCheck.style('color', 'white');
    threeDCheck.changed(() => lumaShader.setUniform('threeDEffectBool', threeDCheck.checked()));

    threeDSlider = createSlider(0.0, 1.0, 0.5, 0.01);
    threeDSlider.position(15, 170);
    threeDSlider.style('width', '80px');

    threeDText = createP(`Angle: ${threeDSlider.value() * 360}`);
    threeDText.position(110, 152);
    threeDText.style('color', 'white');

    // ----------------------------------

    blurCheck = createCheckbox('Blur Effect', false);
    blurCheck.position(10, 190);
    blurCheck.style('color', 'white');
    blurCheck.changed(() => lumaShader.setUniform('blurEffectBool', blurCheck.checked()));

    blurSlider = createSlider(0.0, 1.0, 0.5, 0.1);
    blurSlider.position(15, 210);
    blurSlider.style('width', '80px');

    blurText = createP(`Intensity: ${blurSlider.value() * 10}`);
    blurText.position(110, 192);
    blurText.style('color', 'white');

    // ----------------------------------

    pixelCheck = createCheckbox('Pixel Effect', false);
    pixelCheck.position(10, 230);
    pixelCheck.style('color', 'white');
    pixelCheck.changed(() => lumaShader.setUniform('pixelEffectBool', pixelCheck.checked()));

    pixelSlider = createSlider(0.0, 1.0, 0.5, 0.01);
    pixelSlider.position(15, 250);
    pixelSlider.style('width', '80px');

    pixelText = createP(`Intensity: ${pixelSlider.value() * 100}`);
    pixelText.position(110, 232);
    pixelText.style('color', 'white');

    shader(lumaShader);
}

function handleFile(file) {
    if (file.type === 'image') {
        src = loadImage(file.data, () => {
            lumaShader.setUniform('texture', src);
        });
    } else {
        src = img_src;
    }
}

function randomVals() {
    // Get the current time in seconds
    let seconds = millis() / 1000.0;
    // Generate random value with seconds as the seed
    let randomVal = random(seconds);
    // Set the uniform active secondsVal
    let secondsVal = ((randomVal) * 360.0) % 3.0
    lumaShader.setUniform('seconds', secondsVal);
}

function draw() {
    if (glitchCheck.checked()) {
        lumaShader.setUniform('glitchSlider', glitchSlider.value());
    }

    if (lightLeaksCheck.checked()) {
        lumaShader.setUniform('lightLeaksSlider', lightLeaksSlider.value());
    }

    if (multiplyCheck.checked()) {
        lumaShader.setUniform('multiplySlider', multiplySlider.value());
    }

    if (threeDCheck.checked()) {
        lumaShader.setUniform('threeDSlider', threeDSlider.value());
    }

    if (blurCheck.checked()) {
        lumaShader.setUniform('blurSlider', blurSlider.value());
    }

    if (pixelCheck.checked()) {
        lumaShader.setUniform('pixelSlider', pixelSlider.value());
    }

    randomVals();

    textureTintingText.html(`Angle: ${glitchSlider.value() * 360}`);
    lightLeaksText.html(`Intensity + Location: ${lightLeaksSlider.value() * 100}`);
    multiplyText.html(`Multiplication: ${multiplySlider.value() * 10}`);
    threeDText.html(`Angle: ${threeDSlider.value() * 360}`);
    blurText.html(`Intensity: ${blurSlider.value() * 10}`);
    pixelText.html(`Intensity: ${pixelSlider.value() * 100}`);

    lumaShader.setUniform("textureSize", [texture.width, texture.height]);
    lumaShader.setUniform('texture', src);
    beginShape();
    // format is: vertex(x, y, z, u, v)
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}
