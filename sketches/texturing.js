let lumaShader, src, img_src, video_src, video_on, lightness, uv, hsv, hsl, cAvrg,
    textureTintingCheckbox, textureTintingText, texturingT, textureTintingPicker;

function preload() {
    lumaShader = readShader('/showcase/sketches/shaders/texturing.frag',
        { varyings: Tree.texcoords2 });
    // video source: https://t.ly/LWUs2
    video_src = createVideo(['/showcase/sketches/sketches/wagon.webm']);
    video_src.hide(); // by default video shows up in separate dom
    // image source: https://t.ly/Dz8W
    img_src = loadImage('/showcase/sketches/sketches/fire_breathing.jpg');
    src = img_src;
}

function setup() {
    createCanvas(700, 500, WEBGL);
    noStroke();
    textureMode(NORMAL);

    // Add option to add a new image
    let fileInput = createFileInput(handleFile);
    fileInput.position(width - 100, 10);

    video_on = createCheckbox('video', false);
    video_on.style('color', 'white');
    video_on.changed(() => {
        src = video_on.checked() ? video_src : img_src;
        video_on.checked() ? video_src.loop() : video_src.pause();
    });
    video_on.position(10, 10);
    lightness = createCheckbox('luma', false);
    lightness.position(10, 30);
    lightness.style('color', 'white');
    lightness.input(() => lumaShader.setUniform('lightness', lightness.checked()));

    uv = createCheckbox('uv visualization', false);
    uv.style('color', 'white');
    uv.changed(() => lumaShader.setUniform('uv', uv.checked()));
    uv.position(10, 50);

    hsv = createCheckbox('hsv value v', false);
    hsv.position(10, 70);
    hsv.style('color', 'white');
    hsv.changed(() => lumaShader.setUniform('hsv', hsv.checked()));

    hsl = createCheckbox('hsl lightness l', false);
    hsl.position(10, 90);
    hsl.style('color', 'white');
    hsl.changed(() => lumaShader.setUniform('hsl', hsl.checked()));

    cAvrg = createCheckbox('component average', false);
    cAvrg.position(10, 110);
    cAvrg.style('color', 'white');
    cAvrg.changed(() => lumaShader.setUniform('cAvrg', cAvrg.checked()));

    textureTintingCheckbox = createCheckbox('texture tinting', false);
    textureTintingCheckbox.position(10, 130);
    textureTintingCheckbox.style('color', 'white');
    textureTintingCheckbox.changed(() => lumaShader.setUniform('textureTintingCheckbox', textureTintingCheckbox.checked()));

    textureTintingPicker = createColorPicker('#670177');
    textureTintingPicker.position(30, 155);
    textureTintingPicker.style('width', '80px');

    texturingT = createSlider(0.0, 0.025, 0.0125, 0.000001);
    texturingT.position(30, 185);
    texturingT.style('width', '80px');

    textureTintingText = createP(`Intensity: ${texturingT.value() * 4000}`);
    textureTintingText.position(30, 185);
    textureTintingText.style('color', 'white');

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

function draw() {
    let color1Color = textureTintingPicker.color();

    lumaShader.setUniform('texturingT', texturingT.value());
    textureTintingText.html(`Intensity: ${texturingT.value() * 4000}`);
    lumaShader.setUniform('tintColorPicker', [red(color1Color), green(color1Color), blue(color1Color), 1.0]);
    lumaShader.setUniform('texture', src);
    beginShape();
    // format is: vertex(x, y, z, u, v)
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}
