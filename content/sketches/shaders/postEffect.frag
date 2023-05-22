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
    (texture2D(texture, texcoords2 + texelOffset1) +
    texture2D(texture, texcoords2 + texelOffset2) +
    texture2D(texture, texcoords2 + texelOffset3) +
    texture2D(texture, texcoords2 + texelOffset4) +
    texture2D(texture, texcoords2 + texelOffset5) +
    texture2D(texture, texcoords2 + texelOffset6) +
    texture2D(texture, texcoords2 + texelOffset7) +
    texture2D(texture, texcoords2 + texelOffset8) +
    texture2D(texture, texcoords2 + texelOffset9)) / 9.0;

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
    (texture2D(texture, texcoords2 + texelOffset1) +
    texture2D(texture, texcoords2 + texelOffset2) +
    texture2D(texture, texcoords2 + texelOffset3) +
    texture2D(texture, texcoords2 + texelOffset4) +
    texture2D(texture, texcoords2 + texelOffset5) +
    texture2D(texture, texcoords2 + texelOffset6) +
    texture2D(texture, texcoords2 + texelOffset7) +
    texture2D(texture, texcoords2 + texelOffset8) +
    texture2D(texture, texcoords2 + texelOffset9)) / 9.0;

    // Mix the original texel color with the blurred color
    vec4 finalColor = mix(texel, blurredTexel, 0.5); // Adjust the mix value for desired blur intensity

    return finalColor;
}

vec4 pixelEffect(vec4 texel) {
    // Define the pixel size
    float pixelSize = pixelSlider * 0.01 + 0.001;

    // Calculate the pixelated texel coordinates
    vec2 pixelatedUV = floor(texcoords2 / pixelSize) * pixelSize;

    // Sample the color from the pixelated texel coordinates
    vec4 pixelatedColor = texture2D(texture, pixelatedUV);

    return pixelatedColor;
}

void main() {
    // texture2D(texture, texcoords2) samples texture at texcoords2
    // and returns the normalized texel color
    vec4 texel = texture2D(texture, texcoords2);

    // Apply glitch effect
    vec4 finalColor =
        glitchEffectBool ? glitchEffect(texel) :
        lightLeaksBool ? lensFlare(texel) :
        multiplyEffectBool ? multiplyEffect(texel) :
        threeDEffectBool ? glitchEffect3DBlueRed(texel) :
        blurEffectBool ? blurEffect(texel) :
        pixelEffectBool ? pixelEffect(texel) :
        texel;

    gl_FragColor = finalColor;
}
