precision mediump float;

uniform sampler2D uTexture;  // Textura de entrada
uniform mat3 uMatrix;        // Matriz de convolución
uniform vec2 uTextureSize;   // Tamaño de la textura
uniform vec2 uCanvasSize;    // Tamaño del canvas
uniform vec2 uMouse;         // Posición del ratón
uniform bool uCircle;        // Si se usa un círculo o no
varying vec2 texcoords2;  // Coordenadas de textura interpoladas

vec2 truncate(vec2 value) {
  return clamp(value, 0.0, 1.0);
}

void main() {
    vec2 st = gl_FragCoord.xy / uCanvasSize;
    float pct = step(distance(st, uMouse),0.3);

    // Realizar la convolución
    vec3 convolvedColor = vec3(0.0);
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 texcoords = truncate(texcoords2 + vec2(i, j) / uTextureSize);
            vec3 color = texture2D(uTexture, texcoords).rgb;
            convolvedColor += color * uMatrix[i+1][j+1];
        }
    }

    // Salida del fragmento
    pct = uCircle ? pct : 1.0;
    vec3 originalColor = texture2D(uTexture, texcoords2).rgb;

    gl_FragColor = vec4(mix(originalColor, convolvedColor, pct), 1.0);

}
