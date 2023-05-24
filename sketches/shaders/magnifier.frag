precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 umagnifierPos;
uniform float umagnifierSize;

varying vec2 texcoords2;

void main() {
  vec2 texCoord = texcoords2;

  // Calculate the distance from the mouse position
  float distance = length(uMouse - texCoord);

  // If the pixel is within the magnifier area, apply zoom
  if (distance < umagnifierSize) {
    // Calculate the offset from the magnifier position
    vec2 offset = (umagnifierPos- texCoord) * umagnifierSize;

    // Apply the offset to the texture coordinates
    texCoord += offset;
  }

  // Get the color from the original texture
  vec4 color = texture2D(uTexture, texCoord);

  gl_FragColor = color;
}
