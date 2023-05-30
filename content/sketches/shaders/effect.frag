#ifdef GL_ES
precision mediump float;
#endif

// Copyright (c) Patricio Gonzalez Vivo, 2015 - http://patriciogonzalezvivo.com/
// I am the sole copyright owner of this Work.

//This code was addapted from different source of the book of shaders.

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_zoom;  // New zoom variable


//variable to know wich effect return 
uniform bool truchetEffectBool;
uniform bool bricksEffectBool;
uniform bool tileEffectBool;
uniform bool gradientEffectBool;

#define PI 3.14159265358979323846

// Bricks LOGIC
vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

vec3 applyBrickTiling(vec2 st, float u_brickSize) {
    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    st /= vec2(2.15, 0.65) / u_brickSize;

    // Apply the brick tiling
    st = brickTile(st, 5.0);

    return vec3(box(st, vec2(0.9)));
}



// Tiles LOGIC
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

vec3 applyTiles(vec2 st, float u_zoom) {
    // Divide the space in 4
    st = tile(st, u_zoom);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st, PI * 0.25);

    // Draw a square
    return vec3(box(st, vec2(0.7), 0.01));
}

// Tataran

vec3 generateScottishTartan(vec2 st, vec3 colorA, vec3 colorB, float stripeWidth, float zoom) {
    st *= zoom;

    float horizontalStripe = mod(st.y * 10.0, stripeWidth);
    float verticalStripe = mod(st.x * 10.0, stripeWidth);
    
    vec3 tartanColor = mix(colorA, colorB, step(stripeWidth / 2.0, horizontalStripe));
    tartanColor = mix(tartanColor, colorA, step(stripeWidth / 2.0, verticalStripe));
    
    return tartanColor;
}

//gradient
vec3 getGradientColor(vec2 st, float zoom){
  vec3 color = vec3(0.0);

    st *= zoom;      // Scale up the space by zoom
    st = fract(st); // Wrap around 1.0

    // Now we have zoom spaces that go from 0-1

    color = vec3(st,0.0);
    return color;
}

//default texture
vec3 getWhiteColor() {
  return vec3(1.0, 1.0, 1.0);
}


void main(void) {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 finalColor = tileEffectBool ? applyTiles(st, u_zoom) : 
                    bricksEffectBool ? applyBrickTiling(st, u_zoom) : 
                    truchetEffectBool ? generateScottishTartan(st, vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), 0.1, u_zoom):
                    gradientEffectBool ? getGradientColor(st, u_zoom) : 
                    getWhiteColor();  

    gl_FragColor = vec4(finalColor, 1.0);
}