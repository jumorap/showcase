precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform float brightness;

void main() {
    vec3 color1 = uMaterial1.rgb;
    vec3 color2 = uMaterial2.rgb;
    
    // Overlay blending
    vec3 result = mix(2.0 * color1 * color2, 1.0 - 2.0 * (1.0 - color1) * (1.0 - color2), step(0.5, color1));
    
    gl_FragColor = vec4(result, uMaterial1.a * brightness);
}
