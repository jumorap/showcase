precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform float opacity;

void main() {
    vec3 color1 = uMaterial1.rgb;
    vec3 color2 = uMaterial2.rgb;
    
    // Difference blending
    vec3 result = abs(color1 - color2);
    
    gl_FragColor = vec4(result, uMaterial1.a * opacity);
}
