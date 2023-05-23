// welcome to your first ever shader :)
// in glsl it is mandatory to define a precision!
precision mediump float;
precision mediump int;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
uniform sampler2D u_texture;
uniform mediump int index;
varying vec2 texcoords2;


void main() {
  mat3 colorMats[9];
  colorMats[0] = mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
  colorMats[1] = mat3(0.567, 0.433, 0.000, 0.558, 0.442, 0.000, 0.000, 0.242, 0.758);
  colorMats[2] = mat3(0.817, 0.183, 0.000, 0.333, 0.667, 0.000, 0.000, 0.125, 0.875);
  colorMats[3] = mat3(0.625, 0.375, 0.000, 0.700, 0.300, 0.000, 0.000, 0.300, 0.700);
  colorMats[4] = mat3(0.800, 0.200, 0.000, 0.258, 0.742, 0.000, 0.000, 0.142, 0.858);
  colorMats[5] = mat3(0.950, 0.050, 0.000, 0.000, 0.433, 0.567, 0.000, 0.475, 0.525);
  colorMats[6] = mat3(0.967, 0.033, 0.00, 0.00, 0.733, 0.267, 0.00, 0.183, 0.817);
  colorMats[7] = mat3(0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114);
  colorMats[8] = mat3(0.618, 0.320, 0.062, 0.163, 0.775, 0.062, 0.163, 0.320, 0.516);

  vec4 texel = texture2D(u_texture, texcoords2);
  vec3 colortransform;

  if (index == 0) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[0];
  }else if (index == 1) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[1];
  }else if (index == 2) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[2];
  }else if (index == 3) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[3];
  }else if (index == 4) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[4];
  }else if (index == 5) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[5];
  }else if (index == 6) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[6];
  }else if (index == 7) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[7];
  }else if (index == 8) {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[8];
  }else {
    colortransform = vec3(texel.x, texel.y, texel.z) * colorMats[0];
  }


  gl_FragColor = vec4(colortransform, 1.0);

}