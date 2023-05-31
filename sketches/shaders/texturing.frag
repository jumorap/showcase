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
