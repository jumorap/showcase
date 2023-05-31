# Post Effects

{{< hint info >}}
**Exercises**

1. Implement some posteffects you find interesting.

{{< /hint >}}

## Solution

The solution implemented various post effects to enhance the visual appearance of the rendered image. These effects were chosen based on personal interest and were designed to add visual flair and improve the overall aesthetic quality of the output.

{{< details title="postEffects.js" open=false >}}
{{< highlight JavaScript >}}
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

{{< /highlight >}}
{{< /details >}}




{{< details title="postEffects.frag" open=false >}}
{{< highlight glsl >}}
precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
uniform vec3 tintColor; // new uniform for tint color
uniform vec2 textureSize;
uniform bool glitchEffectBool; // component average visualization
uniform float glitchSlider;
uniform bool lightLeaksBool; // component average visualization
uniform float lightLeaksSlider;
uniform bool multiplyEffectBool; // component average visualization
uniform float multiplySlider;
uniform bool threeDEffectBool; // component average visualization
uniform float threeDSlider;
uniform bool blurEffectBool; // component average visualization
uniform float blurSlider;
uniform bool pixelEffectBool; // component average visualization
uniform float pixelSlider;



uniform float seconds;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;


float random(float seed) {
return fract(sin(seed) * 43758.5453);
}

float randomInRange(float minValue, float maxValue, float seed) {
return mix(minValue, maxValue, random(seed));
}

// ------------------------------
vec4 glitchEffect(vec4 texel) {
// Get the glitched texel color by adding a distortion
float distanceBeetwenOriginal = randomInRange(0.03, 0.06, seconds);

    vec2 glitchUV = texcoords2 + vec2(
        sin(glitchSlider * 6.0) * distanceBeetwenOriginal,
        cos(glitchSlider * 6.0) * distanceBeetwenOriginal
    );

    vec4 glitchedTexel = texture2D(texture, glitchUV);

    // Apply the glitched texel color
    vec4 glitchColor = mix(texel, glitchedTexel, 0.5); // You can adjust the mix value for desired glitch intensity

    // Add noise
    float noiseValue = randomInRange(-0.1, 0.1, gl_FragCoord.x + gl_FragCoord.y * seconds); // Use the fragment coordinates as the random seed

    // Add on off glitch effect
    float onOff = randomInRange(-0.1, 0.1, seconds); // Use the fragment coordinates as the random seed

    glitchColor.rgb += noiseValue;
    glitchColor.rgb += onOff;

    return glitchColor;
}

vec4 lightLeaks(vec4 texel) {
vec2 resolution = vec2(800.0, 600.0); // Adjust the resolution according to your needs

    // Simulating light leaks by adding color to the corners
    vec4 lightColor = vec4(1.0, 0.8, 0.0, 0.5); // Adjust the light color and intensity
    float distToCenter = distance(gl_FragCoord.xy, resolution * 0.5);
    float lightIntensity = 1.0 - smoothstep(0.0, length(resolution) * 0.5, distToCenter);
    texel += lightColor * lightIntensity * lightLeaksSlider;

    // Randomly generate light leaks between 3 and 6
    float numLightLeaks = floor(randomInRange(3.0, 7.0, gl_FragCoord.x * gl_FragCoord.y));

    // Generate random positions for light leaks
    for (int i = 0; i < 6; i++) {
        if (i < int(numLightLeaks)) {
            // Generate random position within the resolution
            vec2 leakPosition = vec2(randomInRange(0.0, resolution.x, float(i)), randomInRange(0.0, resolution.y, float(i + 1)));

            // Add color to the randomly generated position
            float leakIntensity = randomInRange(0.2, 0.8, float(i + 2)); // Adjust the intensity range
            texel += lightColor * leakIntensity * smoothstep(0.0, length(resolution) * 0.5, distance(gl_FragCoord.xy, leakPosition));
        }
    }

    return texel;
}

vec4 glitchEffect3DBlueRed(vec4 texel) {
// Get the glitched texel color by adding a distortion
vec2 glitchUV = texcoords2 + vec2(
sin(threeDSlider * 6.0) * 0.03,
cos(threeDSlider * 6.0) * 0.03
);
vec2 glitchUV2 = texcoords2 + vec2(
sin(threeDSlider * 6.0) * -0.03,
cos(threeDSlider * 6.0) * -0.03
);

    vec4 glitchedTexel = texture2D(texture, glitchUV);
    vec4 glitchedTexel2 = texture2D(texture, glitchUV2);

    // Apply the glitched texel color
    vec4 glitchColor = mix(texel, glitchedTexel, 0.5); // You can adjust the mix value for desired glitch intensity
    vec4 glitchColor2 = mix(texel, glitchedTexel2, 0.5); // You can adjust the mix value for desired glitch intensity

    // Paint the texel red and blue
    glitchColor.r = 0.3;
    glitchColor2.b = 0.3;

    // Apply the red and blue channels to the texel color
    vec4 finalColor = glitchColor + glitchColor2;

    return finalColor;
}

vec4 lensFlare(vec4 texel) {
// Define the lens flare properties
vec2 resolution = vec2(randomInRange(-100.0, 800.0, lightLeaksSlider), randomInRange(-100.0, 600.0, lightLeaksSlider)); // Adjust the resolution according to your needs
vec4 flareColor = vec4(1.0, 0.0, 0.0, 0.8); // Adjust the flare color and intensity
vec4 flareColor2 = vec4(0.0, 1.0, 0.0, 0.8); // Adjust the flare color and intensity
vec4 flareColor3 = vec4(0.0, 0.0, 1.0, 0.8); // Adjust the flare color and intensity
float flareRadius = 0.3; // Adjust the radius of the flare effect
float flareIntensity = lightLeaksSlider; // Adjust the intensity of the flare effect

    // Calculate the center position of the screen
    vec2 screenCenter = resolution * 0.6;
    vec2 screenCenter2 = resolution * 0.4;
    vec2 screenCenter3 = resolution * 0.2;

    // Calculate the distance from the current fragment to the screen center
    float distanceToCenter = distance(gl_FragCoord.xy, screenCenter);
    float distanceToCenter2 = distance(gl_FragCoord.xy, screenCenter2);
    float distanceToCenter3 = distance(gl_FragCoord.xy, screenCenter3);

    // Calculate the normalized distance
    float normalizedDistance = distanceToCenter / length(resolution);
    float normalizedDistance2 = distanceToCenter2 / length(resolution);
    float normalizedDistance3 = distanceToCenter3 / length(resolution);

    // Calculate the flare factor based on the distance
    float flareFactor = smoothstep(flareRadius + 0.5, 0.0, normalizedDistance);
    float flareFactor2 = smoothstep(flareRadius + 0.25, 0.0, normalizedDistance2);
    float flareFactor3 = smoothstep(flareRadius, 0.0, normalizedDistance3);

    // Apply the flare color and intensity
    vec4 flare = flareColor * flareFactor * flareIntensity;
    vec4 flare2 = flareColor2 * flareFactor2 * flareIntensity;
    vec4 flare3 = flareColor3 * flareFactor3 * flareIntensity;

    // Add the flare to the texel color
    flare2 += flare3;
    flare += flare2;
    vec4 finalColor = texel + flare;

    return finalColor;
}

vec4 multiplyEffect(vec4 texel) {
// Calculate the texel offsets for blur
vec2 texelOffset1 = vec2(-multiplySlider, -multiplySlider);
vec2 texelOffset2 = vec2(0.0, -multiplySlider);
vec2 texelOffset3 = vec2(multiplySlider, -multiplySlider);
vec2 texelOffset4 = vec2(-multiplySlider, 0.0);
vec2 texelOffset5 = vec2(0.0, 0.0);
vec2 texelOffset6 = vec2(multiplySlider, 0.0);
vec2 texelOffset7 = vec2(-multiplySlider, multiplySlider);
vec2 texelOffset8 = vec2(0.0, multiplySlider);
vec2 texelOffset9 = vec2(multiplySlider, multiplySlider);

    // Sample the surrounding texels and accumulate the color
    vec4 blurredTexel =
        (
            texture2D(texture, texcoords2 + texelOffset1) +
            texture2D(texture, texcoords2 + texelOffset2) +
            texture2D(texture, texcoords2 + texelOffset3) +
            texture2D(texture, texcoords2 + texelOffset4) +
            texture2D(texture, texcoords2 + texelOffset5) +
            texture2D(texture, texcoords2 + texelOffset6) +
            texture2D(texture, texcoords2 + texelOffset7) +
            texture2D(texture, texcoords2 + texelOffset8) +
            texture2D(texture, texcoords2 + texelOffset9)
        ) / 9.0;

    // Mix the original texel color with the blurred color
    vec4 finalColor = mix(texel, blurredTexel, 0.5); // Adjust the mix value for desired blur intensity

    return finalColor;
}

vec4 blurEffect(vec4 texel) {
float blurSlider0 = blurSlider * 0.01;

    // Calculate the texel offsets for blur
    vec2 texelOffset1 = vec2(-blurSlider0, -blurSlider0);
    vec2 texelOffset2 = vec2(0.0, -blurSlider0);
    vec2 texelOffset3 = vec2(blurSlider0, -blurSlider0);
    vec2 texelOffset4 = vec2(-blurSlider0, 0.0);
    vec2 texelOffset5 = vec2(0.0, 0.0);
    vec2 texelOffset6 = vec2(blurSlider0, 0.0);
    vec2 texelOffset7 = vec2(-blurSlider0, blurSlider0);
    vec2 texelOffset8 = vec2(0.0, blurSlider0);
    vec2 texelOffset9 = vec2(blurSlider0, blurSlider0);

    // Sample the surrounding texels and accumulate the color
    vec4 blurredTexel =
        (
            texture2D(texture, texcoords2 + texelOffset1) +
            texture2D(texture, texcoords2 + texelOffset2) +
            texture2D(texture, texcoords2 + texelOffset3) +
            texture2D(texture, texcoords2 + texelOffset4) +
            texture2D(texture, texcoords2 + texelOffset5) +
            texture2D(texture, texcoords2 + texelOffset6) +
            texture2D(texture, texcoords2 + texelOffset7) +
            texture2D(texture, texcoords2 + texelOffset8) +
            texture2D(texture, texcoords2 + texelOffset9)
        ) / 9.0;

    // Mix the original texel color with the blurred color
    vec4 finalColor = mix(texel, blurredTexel, 0.5); // Adjust the mix value for desired blur intensity

    return finalColor;
}

vec4 pixelEffect(vec4 texel) {
// Define the pixel size
float pixelSize = pixelSlider * 0.02 + 0.001;

    // Calculate the pixelated texel coordinates
    vec2 pixelatedUV = floor(texcoords2 / pixelSize) * pixelSize;

    // Sample the color from the pixelated texel coordinates
    vec4 pixelatedColor = texture2D(texture, pixelatedUV);

    return pixelatedColor;
}

void main() {
vec4 texel = texture2D(texture, texcoords2);
float effectIntensity = 1.0;

    if (glitchEffectBool) texel = mix(texel, glitchEffect(texel), effectIntensity);
    if (lightLeaksBool) texel = mix(texel, lensFlare(texel), effectIntensity);
    if (multiplyEffectBool) texel = mix(texel, multiplyEffect(texel), multiplySlider + 0.3);
    if (threeDEffectBool) texel = mix(texel, glitchEffect3DBlueRed(texel), effectIntensity);
    if (blurEffectBool) texel = mix(texel, blurEffect(texel), blurSlider);
    if (pixelEffectBool) texel = mix(texel, pixelEffect(texel), pixelSlider - 0.3);

    gl_FragColor = texel;
}

{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/postEffect.js" width="724" height="524" marginHeight="0" marginWidth="0" frameBorder="0" scrolling="no" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}

## Description

The code implementation includes several post effects to enhance the visual appearance of the rendered image. The Glitch Effect introduces visual distortions and artifacts to create a glitchy, digital aesthetic. The Light Leaks Effect simulates the appearance of light leaking into the camera lens, adding a dreamy and vintage vibe. The Multiply Effect overlays multiple copies of the original image at the same distance, resulting in a multiplied and intensified visual effect. The 3D Effect utilizes the red and blue channels and the distance from the original image to create a stereoscopic 3D effect. The Blur Effect applies a blurring filter to the image, creating a softer and smoother appearance. Lastly, the Pixel Effect transforms the image into a pixelated version, giving it a retro or low-resolution look.

You can combine multiple effects using the checkboxes in each effect, using the sliders to change the angles and intensity for each one

### Previous work

These post effects draw inspiration from various techniques used in computer graphics and image processing. Glitch effects have been popularized in digital art and media, replicating the visual artifacts and errors found in malfunctioning digital systems. Light leaks have been a common aesthetic element in photography and cinematography, adding a nostalgic and ethereal atmosphere. Multiplying and overlaying images is a technique often used in graphic design to create complex and layered visuals. The 3D effect mimics the concept of stereoscopy, which provides an illusion of depth perception. Blur effects are frequently employed to soften images or create a sense of motion. Pixelation has its roots in early computer graphics and video games, offering a distinct retro look.

### Future work

Further development can involve refining and expanding the existing post effects. This can include adding customization options for each effect, allowing users to adjust parameters such as intensity, frequency, or color variations. Additionally, exploring additional post effects from different domains, such as color grading, chromatic aberration, or film grain, can provide more diverse visual styles and options for users.

## Usages

1. Digital Art and Design: The post effects can be used by digital artists and designers to create visually striking and unique compositions, adding a distinct aesthetic appeal to their work.

2. Video Production: The effects can be applied to video footage during post-production to enhance the overall visual aesthetics of films, commercials, music videos, or any other video content.

3. Game Development: Incorporating these post effects into game development can enhance the visual experience, creating visually immersive and captivating environments, and adding unique art styles to games.

4. Augmented Reality (AR) and Virtual Reality (VR): The post effects can be utilized in AR and VR applications to enhance immersion and create visually engaging experiences for users, whether in gaming, education, training, or other interactive simulations.

5. Social Media and Online Content: Content creators on platforms like YouTube, Instagram, or TikTok can use these effects to add visual flair to their videos or images, making their content stand out and captivate their audience.

6. Experimental and Artistic Projects: Artists, researchers, or hobbyists interested in exploring visual effects, digital aesthetics, or interactive installations can incorporate these effects into their projects to create unique and thought-provoking experiences.

7. Educational Purposes: The code and its effects can be used as educational material to teach programming, computer graphics, or digital art concepts, allowing learners to experiment and understand the principles behind these effects.
