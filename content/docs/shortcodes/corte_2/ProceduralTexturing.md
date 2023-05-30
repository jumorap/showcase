# Procedural texturing

{{< hint info >}}
**Exercise**

Exercises

Adapt other patterns from the book of shaders (refer also to the shadertoy collection) and map them as textures onto other 3D shapes.
{{< /hint >}}

## Solution

4 different patterns will be returned from the shader:

Gradient effect: This effect creates a smooth transition between two or more colors, producing a visually appealing gradient pattern. It can be used to add depth and dimension to a design or to create a vibrant and dynamic background.

Bricks effect: The bricks effect simulates the appearance of a brick wall by repeating a brick pattern. It typically includes variations in color, texture, and lighting to create a realistic or stylized brickwork effect. This pattern is often used in architectural visualizations, game environments, or any design that requires a brick-like appearance.

Tiles effect: The tiles effect replicates the look of tiled surfaces, such as ceramic or mosaic tiles. It includes repeated square or rectangular patterns, often with distinct color variations or textures to mimic different types of tiles. This effect is commonly used in creating realistic floorings, walls, or decorative patterns in digital art, interior design, or game development.

Scottish Tartan effect: Scottish Tartan refers to the distinctive crisscross pattern of intersecting horizontal and vertical lines that represent specific Scottish clans or regions. The Scottish Tartan effect mimics the intricate design and colors of traditional tartans. It typically incorporates a combination of vibrant hues and intricate patterns, each with its own symbolic meaning. This effect is often used to evoke Scottish heritage, cultural references, or to add a touch of traditional flair to various designs, including fashion, branding, or digital artwork.

Bellow is the code used for that purpure:

{{< details title="effect.fraq" open=false >}}
{{< highlight Java >}}
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
{{< /highlight >}}
{{< /details >}}

{{< details title="Sketch.js" open=false >}}
{{< highlight Java >}}
    let gradientCheck;
let tilesCheck;
let bricksCheck;
let TruchetChecked;

let pg;
let truchetShader;

let u_time = 0; // Variable to store the time

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('effect.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  pg.noStroke();
  pg.textureMode(NORMAL);
  // use truchetShader to render onto pg
  pg.shader(truchetShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(truchetShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', 3);
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
  
  gradientCheck = createCheckbox('Gradient Effect', false);
  gradientCheck.position(10, 10);
  gradientCheck.style('color', 'white');
  gradientCheck.changed(() => truchetShader.setUniform('gradientEffectBool',     gradientCheck.checked()));
  
  tilesCheck = createCheckbox('tiles Effect', false);
  tilesCheck.position(10, 25);
  tilesCheck.style('color', 'white');
  tilesCheck.changed(() => truchetShader.setUniform('tileEffectBool',     tilesCheck.checked()));
  
  bricksCheck = createCheckbox('bricks Effect', false);
  bricksCheck.position(10, 40);
  bricksCheck.style('color', 'white');
  bricksCheck.changed(() => truchetShader.setUniform('bricksEffectBool',     bricksCheck.checked()));
  
  
  TruchetChecked = createCheckbox('truchet Effect', false);
  TruchetChecked.position(10, 55);
  TruchetChecked.style('color', 'white');
  TruchetChecked.changed(() => truchetShader.setUniform('truchetEffectBool',     TruchetChecked.checked()));
  
}

function draw() {
  background(33);
  orbitControl();
  cylinder(100, 200);
  
  // Update the u_time uniform value
  truchetShader.setUniform('u_time', u_time);
  u_time += 0.01; // Increase the time value
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  truchetShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg NDC quad (i.e., x, y and z vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/texturePatter.js" width="800" height="400" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js">}}


## How to use

Click the different check boxes in the upper left corner to change the texture applied to the cylinder.

## Little explanation of the code

1. The code begins with some preprocessor directives and uniform variables declaration, including resolution, time, zoom, and boolean variables indicating which effect to apply.

2. Next, there are three functions related to the "Bricks" effect:
 - brickTile scales and offsets a 2D coordinate to create a tiling effect with a staggered pattern.
- box generates a rectangular gradient within a specified size.
- applyBrickTiling applies the brick tiling effect to the input coordinate.

3. Following that, there are four functions related to the "Tiles" effect:
- rotate2D rotates a 2D coordinate around the center.
- tile scales a 2D coordinate to create a tiling effect.
- Another version of box is defined with an additional parameter for controlling the smoothness of the edges.
- applyTiles applies the tile effect to the input coordinate.
4. The generateScottishTartan function generates the "Scottish Tartan" effect by creating a color pattern based on the input coordinate, two colors, a stripe width, and a zoom factor.
5. The getGradientColor function generates a simple gradient effect based on the input coordinate and zoom factor.
6. The getWhiteColor function returns a default white color.
7. The main function is where the magic happens. It first calculates the normalized coordinate st based on the fragment's position and the resolution. Then, it uses a conditional statement to determine which effect to apply based on the boolean variables.
- If tileEffectBool is true, it applies the "Tiles" effect by calling applyTiles.
- If bricksEffectBool is true, it applies the "Bricks" effect by calling applyBrickTiling.
- If truchetEffectBool is true, it applies the "Scottish Tartan" effect by calling generateScottishTartan.
- If gradientEffectBool is true, it applies the gradient effect by calling getGradientColor.
- If none of the boolean variables are true, it defaults to the getWhiteColor function.
8. Finally, the resulting color is assigned to gl_FragColor, which determines the pixel color for the fragment.

