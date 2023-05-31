# Texturing

{{< hint info >}}
**Exercises**

1. Implement other coloring brightness tools such as HSV value V, HSL lightness L or Component average.
2. Implement texture tinting by mixing color and texel interpolated data.

{{< /hint >}}

## Solution

The solution implemented additional coloring brightness tools including HSV value V, HSL lightness L, and Component average. It also added texture tinting by mixing color and texel interpolated data.

{{< details title="texturing.js" open=false >}}
{{< highlight JavaScript >}}
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

{{< /highlight >}}
{{< /details >}}




{{< details title="texturing.frag" open=false >}}
{{< highlight glsl >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform vec3 tintColor; // new uniform for tint color
uniform vec3 tintColorPicker;
uniform float texturingT;
uniform bool lightness; // lightness visualization
uniform bool uv; // uv visualization
uniform bool hsv; // hsv visualization
uniform bool hsl; // hsl visualization
uniform bool cAvrg; // component average visualization
uniform bool textureTinting; // texture tinting visualization
uniform bool textureTintingCheckbox;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec4 texel) {
// alpha channel (texel.a) is just discarded
return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

vec3 RGB2HSV(vec4 texel) {
// Is used max(R, G, B) to determine the value (V) of the HSV color
float maxVal = max(max(texel.r, texel.g), texel.b);
vec3 hsv;

    hsv.x = maxVal;
    hsv.y = maxVal;
    hsv.z = maxVal;

    return hsv;
}

vec3 RGB2HSL(vec4 texel) {
// Is used mid(R, G, B) = (1 / 2) (max(R, G, B) + min(R, G, B)) to determine the lightness (L) of the HSL color
float maxVal = max(max(texel.r, texel.g), texel.b);
float minVal = min(min(texel.r, texel.g), texel.b);
float midVal = 0.5 * (maxVal + minVal);
vec3 hsl;

    hsl.x = midVal;
    hsl.y = midVal;
    hsl.z = midVal;

    return hsl;
}

vec3 componentAverage(vec4 texel) {
// Is used (R + G + B) / 3 to determine the average of the RGB components
float avg = (texel.r + texel.g + texel.b) / 3.0;
vec3 avgVec;

    avgVec.x = avg;
    avgVec.y = avg;
    avgVec.z = avg;

    return avgVec;
}

void main() {
// texture2D(texture, texcoords2) samples texture at texcoords2
// and returns the normalized texel color
vec4 texel = texture2D(texture, texcoords2);

    // tint the texel color with the tint color
    vec3 tintedColor = texel.rgb * tintColorPicker;

    // mix the tinted color and the original texel color
    vec3 mixedColor = mix(texel.rgb, tintedColor, texturingT);

    gl_FragColor =
        uv ? vec4(texcoords2.xy, 0.0, 1.0) :
        lightness ? vec4(vec3(luma(texel)), 1.0) :
        hsv ? vec4(vec3(RGB2HSV(texel)), 1.0) :
        hsl ? vec4(vec3(RGB2HSL(texel)), 1.0) :
        cAvrg ? vec4(vec3(componentAverage(texel)), 1.0) :
        textureTintingCheckbox ? vec4(mixedColor, texel.a) :
        texel; // set output color to mixed color
}

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/texturing.js" width="724" height="524" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

## Description
The solution implemented in this exercise involves the use of texturing with GLSL shaders to create visual effects in 2D and 3D graphics. Texturing is a technique used to apply a pattern or image onto a surface, creating a realistic or artistic effect.

The code implements various coloring brightness tools such as HSV value V, HSL lightness L, and Component average to adjust the brightness of textures and create more complex visual effects. The implementation of texture tinting by mixing color and texel interpolated data creates a dynamic and interactive texture mapping.

GLSL shaders are used in this code to manipulate the colors and brightness of the textures, creating a wide range of visual effects. The texturing.js and texturing.frag files provide the necessary functions and code to implement the texturing techniques.

### Previous work
Texturing has been a popular technique in computer graphics for many years. It has been used in various fields such as game development, virtual reality, and architectural visualization. GLSL shaders have been used extensively in these fields to create complex visual effects.

### Future work
Future work on texturing could involve the development of more advanced techniques for creating and manipulating textures. This could include the use of machine learning algorithms to create more realistic and detailed textures.

Additionally, the application of texturing could be expanded to fields such as medical imaging and scientific visualization. For example, texturing could be used to create 3D models of medical scans, which could be used to simulate the effects of diseases on the body.

## Usages
The code provided can be used in various applications, including video games, simulation software, and educational tools. Here are some potential use cases:

- Video games: The texturing techniques implemented in this code could be used as a part of a video game environment. By integrating this code into a game engine, developers can create realistic and immersive environments for their games.
- Simulation software: Texturing could be used to create realistic simulations of real-world environments, such as landscapes and terrains. For example, this could be used to simulate the effects of weather on a landscape.
- Educational tools: This code could be used as a tool for learning about texturing, programming concepts, and 3D graphics. It could be integrated into educational software or used as a standalone application to teach students about computer graphics and simulation.
- Architectural visualization: This code could be used to create 3D models of buildings and environments for architectural visualization. This could be useful for architects and designers to create realistic representations of their designs in a virtual environment.