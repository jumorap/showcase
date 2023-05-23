precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
uniform float brightness;

void main() {
    // Screen blending
    vec3 result = 1.0 - (1.0 - uMaterial1.rgb) * (1.0 - uMaterial2.rgb);
    
    gl_FragColor = vec4(brightness * result, 1.0);
}