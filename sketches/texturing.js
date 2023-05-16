let lumaShader, src, img_src, video_src, video_on, lightness, uv, hsv, hsl, cAvrg, textureTintingText, texturingT;

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

    texturingT = createSlider(0.0, 1.0, 0.5, 0.05);
    texturingT.position(20, 160);
    texturingT.style('width', '80px');

    textureTintingText = createP(`texture tinting value: ${texturingT.value()}`);
    textureTintingText.position(20, 125);
    textureTintingText.style('color', 'white');

    shader(lumaShader);
}

function draw() {
    lumaShader.setUniform('texturingT', texturingT.value());
    textureTintingText.html(`texture tinting value: ${texturingT.value()}`);
    lumaShader.setUniform('texture', src);
    beginShape();
    // format is: vertex(x, y, z, u, v)
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}
