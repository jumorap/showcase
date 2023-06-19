# Game Of Life 3D

{{<iframe id="gameoflife" site="https://ycuervob.github.io/gameoflife/" width="600px" height="600px" >}}

{{< details title="sketch.js" open=false >}}
{{< highlight JavaScript >}}

let easycam;
let matrixSize = 40;
let cubeSize = 10;
let update = false;
let matrix = [];
let maxAliveCubes = 1000;  // Establece el límite máximo de cubos vivos
let myshader;
let angle, concentration;
let position;
let state;
let brush;
let record;
let myFont;
let points = [];
let mystatuselemnt;
let providedkernel;
let bg;
let boxColor;
let ambient;
let spaceTexture;
let spot;
let cond1 = 4;
let cond2 = 5;
let showsphere = true;
let edges = true;

let aliveCubes = 0;  // Variable para rastrear la cantidad de cubos vivos

function preload() {
// preload() runs once
bg = loadImage('space.jpg');
myFont = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
}

function getTableContent() {
var table = document.getElementById("myTable");
var rows = table.getElementsByTagName("tr");
var tableContent = [];

for (var i = 1; i < rows.length; i++) {
var cells = rows[i].getElementsByTagName("td");
var rowData = [];
var subRowData = [];

    for (var j = 0; j < cells.length; j++) {
      var input = cells[j].getElementsByTagName("input")[0];
      subRowData.push([parseInt(input.value)]);

      if ((j + 1) % 3 === 0 || j === cells.length - 1) {
        rowData.push(subRowData);
        subRowData = [];
      }
    }

    tableContent.push(rowData);
}
return tableContent;
}

function setTableContent(tableContent) {
var table = document.getElementById("myTable");
var rows = table.getElementsByTagName("tr");

for (var i = 1; i < rows.length; i++) {
var rowData = tableContent[i - 1];
var cells = rows[i].getElementsByTagName("td");

    for (var j = 0; j < cells.length; j++) {
      var input = cells[j].firstChild
      input.value = rowData[Math.floor(j / 3)][j % 3][0];
    }
}
}

function binaryNoise(probability) {
return Math.random() <= probability ? 1 : 0;
}

function genMatrix() {
aliveCubes = 0;  // Reinicia la variable aliveCubes
for (let x = 0; x < matrixSize; x++) {
matrix[x] = [];
for (let y = 0; y < matrixSize; y++) {
matrix[x][y] = [];
for (let z = 0; z < matrixSize; z++) {
matrix[x][y][z] = binaryNoise(0.01); // Cambia la probabilidad aquí (0.01 = 1%)
if (matrix[x][y][z] === 1) {
aliveCubes++;
}
}
}
}
}

function updateMatrix() {
//console.log(matrix);
matrix = convolucionarMatriz(matrix);
//console.log(matrix);
}

function paintMatrix() {
if (edges){
stroke(10);
} else {
noStroke();
}

for (let x = 0; x < matrixSize; x++) {
for (let y = 0; y < matrixSize; y++) {
for (let z = 0; z < matrixSize; z++) {
if (matrix[x][y][z] === 1) {
let posX = (x - matrixSize / 2) * cubeSize;
let posY = (y - matrixSize / 2) * cubeSize;
let posZ = (z - matrixSize / 2) * cubeSize;

          push();
          translate(posX, posY, posZ);
          fill(boxColor || 255);
          
          
          box(cubeSize);
          pop();
        }
      }
    }
}
}

function setup() {
createCanvas(window.innerWidth, window.innerHeight, WEBGL);
textFont(myFont, 20);
mystatuselemnt = document.getElementById("mystatus");
easycam = createEasyCam({ distance: 1 });
genMatrix();
providedkernel = getTableContent();
}

function resizepcanvas() {
resizeCanvas(window.innerWidth, window.innerHeight);
easycam = createEasyCam({ distance: 1 });
}

function draw() {
background(0);
ambientLight(ambient || 25);
directionalLight(color(spot || 255), createVector(1, 1, 1)); // Establecer la dirección de la luz hacia arriba

// compute current camera position in world space:
//const position = treeLocation([0, 0, 0], { from: Tree.EYE, to: Tree.WORLD });


if (update) {
updateMatrix(); // Actualizar la matriz
}

paintMatrix();

// Aplicar la textura a la esfera
texture(bg);
noStroke();

if(showsphere){
sphere(cubeSize * matrixSize * 2);
}
mystatuselemnt.innerHTML = `<p style="color:${frameRate() < 15 ? "red" : "green"}">Frame Count: ${frameRate().toFixed(4)}</p><p>Cubes: ${aliveCubes}</p><p style="${update ? "color:green" : "color:red"}">Status: ${update ? "Running" : "Stopped"}</p>`;
}

function keyPressed() {
if (keyCode === 32) {
maxAliveCubes = Math.random() * 1000;
genMatrix();
} else if (keyCode === 67) {
update = !update;
}
}

function updatekernel() {
providedkernel = getTableContent();
displaySuccessMessage("Kernel updated");
}

function resetKernel() {
providedkernel = [
[[[1], [1], [1]], [[1], [1], [1]], [[1], [1], [1]]],
[[[1], [1], [1]], [[1], [0], [1]], [[1], [1], [1]]],
[[[1], [1], [1]], [[1], [1], [1]], [[1], [1], [1]]]
];
setTableContent(providedkernel);
displaySuccessMessage("Kernel has been reset");
}

function displaySuccessMessage(msg) {
document.getElementById("message").innerHTML = msg;
document.getElementById("message").toggleAttribute("hidden");
setTimeout(() => {
document.getElementById("message").toggleAttribute("hidden");
}, 2000);
}

function convolucionarMatriz(matrizEntrada) {
aliveCubes = 0;  // Reinicia la variable aliveCubes
const flattenedArray = matrizEntrada.flat().flat(); // Obtener un arreglo plano
const typedArray = new Float32Array(flattenedArray); // Especificar el tipo de datos
const shape = [matrizEntrada.length, matrizEntrada[0].length, matrizEntrada[0][0].length];
const binaryMatrix = tf.tensor3d(typedArray, shape, 'float32'); // Crear tensor especificando el tipo
const kernel = tf.tensor4d(providedkernel);
const N = matrizEntrada.length;
const expandedBinaryMatrix = binaryMatrix.expandDims(-1);
const expandedKernel = kernel.expandDims(-1);
const binaryMatrixFloat = tf.cast(expandedBinaryMatrix, 'float32');
const kernelFloat = tf.cast(expandedKernel, 'float32');
const convolved = tf.conv3d(binaryMatrixFloat, kernelFloat, [1, 1, 1], 'same');

let newmatriz = convolved.arraySync();

const matrizConvertida = newmatriz.map(row => row.map(column => column.map(
item => {
if ((item[0] == cond1 || item[0] == cond2)) {
return 1;
} else {
return 0;
}
}
)
)
);

// Copiar la matriz original
const matrizOpuesta = JSON.parse(JSON.stringify(matrizConvertida));

// Cambiar las caras opuestas
for (let i = 0; i < N; i++) {
for (let j = 0; j < N; j++) {
// Cambiar las caras superior e inferior
const tempSuperior = matrizOpuesta[i][j][0];
matrizOpuesta[i][j][0] = matrizOpuesta[i][j][N - 1];
matrizOpuesta[i][j][N - 1] = tempSuperior;

      // Cambiar las caras izquierda y derecha
      const tempIzquierda = matrizOpuesta[i][0][j];
      matrizOpuesta[i][0][j] = matrizOpuesta[i][N - 1][j];
      matrizOpuesta[i][N - 1][j] = tempIzquierda;

      // Cambiar las caras frontal y trasera
      const tempFrontal = matrizOpuesta[0][i][j];
      matrizOpuesta[0][i][j] = matrizOpuesta[N - 1][i][j];
      matrizOpuesta[N - 1][i][j] = tempFrontal;
    }
}


binaryMatrix.dispose();
kernel.dispose();
expandedBinaryMatrix.dispose();
expandedKernel.dispose();
binaryMatrixFloat.dispose();
kernelFloat.dispose();
convolved.dispose();


return matrizOpuesta;
}

function toggleTable() {
document.getElementById("container").classList.toggle("show");
}

function closeModal() {
document.getElementById('mymodal').toggleAttribute('hidden')
}

function startStop() {
update = !update;
let butn = document.getElementById('star-stop');
butn.innerHTML = update ? 'Stop' : 'Start';
butn.classList.toggle('btn-danger');
}

function reset() {
genMatrix();
}

function updateColor() {
boxColor = document.getElementById('colorPicker').value;
}

function updateColorAmbient() {
ambient = document.getElementById('colorPickerAmbient').value;
}

function updateColorSpot() {
spot = document.getElementById('colorPickerSpot').value;
}

function updateMatrixSize() {
matrixSize = document.getElementById('matrixSizeInput').value;
matrix = [];
genMatrix();
displaySuccessMessage("Matrix size updated");
}

function adyajentcond1() {
cond1 = document.getElementById('cond1').value;
displaySuccessMessage("Condition 1 updated");
}

function adyajentcond2() {
cond2 = document.getElementById('cond2').value;
displaySuccessMessage("Condition 2 updated");
}

function toggleFullScreen() {
var elem = document.documentElement;

if (elem.requestFullscreen) {
if (document.fullscreenElement) {
document.exitFullscreen();
} else {
elem.requestFullscreen();
}
} else if (elem.mozRequestFullScreen) { // Firefox
if (document.mozFullScreen) {
document.mozCancelFullScreen();
} else {
elem.mozRequestFullScreen();
}
} else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
if (document.webkitFullscreenElement) {
document.webkitExitFullscreen();
} else {
elem.webkitRequestFullscreen();
}
} else if (elem.msRequestFullscreen) { // IE/Edge
if (document.msFullscreenElement) {
document.msExitFullscreen();
} else {
elem.msRequestFullscreen();
}
}

resizepcanvas();
}

function updateShowSphere() {
document.getElementById('text-show-sphere').innerHTML = showsphere ? 'Hide Sphere' : 'Show Sphere';
showsphere = !showsphere;
}

function updateShowEdges() {
document.getElementById('text-show-edges').innerHTML = true ? 'Hide Edges' : 'Show Edges';
edges = !edges;
}

{{< /highlight >}}
{{< /details >}}



{{< details title="index.html" open=false >}}
{{< highlight JavaScript >}}

<!DOCTYPE html>
<html>

<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.js"></script>
  <script src="https://freshfork.github.io/p5.EasyCam/p5.easycam.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
  <script src="sketch.js"></script>
  <title>Game Of Life 3D</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="style.css">
  <meta charset="utf-8" />
</head>

<body onresize="resizepcanvas()">

  <div id="mymodal" class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Welcome to the Game of Life</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="closeModal();">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Press the <span style=" font-weight: bold;">Space Bar</span> key to restart the game and generate a new
          world.</p>
        <p>To start or stop the simulation, simply press the <span style=" font-weight: bold;">C</span> key.</p>
      </div>
    </div>
  </div>

  <div id="message" class="alert alert-success" role="alert" hidden>
    This is a success alert—check it out!
  </div>

  <div class="floating-bubble" onclick="toggleTable()">Options</div>
  <div id="mystatus"></div>
  <div id="status-buttons">
    <button id="star-stop" type="button" class="btn btn-success" onclick="startStop()">Start</button>
    <button id="reset" type="button" class="btn btn-warning" onclick="reset()">Reset</button>
    <button id="full-screen-button" type="button" class="btn btn-primary" onclick="toggleFullScreen()">Full
      Screen</button>
  </div>



  <div id="container" class="container">
    <h1>Convolution Matrix</h1>
    <table id="myTable" class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th>Col 1</th>
          <th>Col 2</th>
          <th>Col 3</th>
          <th>Col 4</th>
          <th>Col 5</th>
          <th>Col 6</th>
          <th>Col 7</th>
          <th>Col 8</th>
          <th>Col 9</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
        </tr>
        <tr>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="0" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
        </tr>
        <tr>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
          <td><input type="number" value="1" class="form-control"></td>
        </tr>
        <!-- Repite las filas restantes -->
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-warning" onclick="resetKernel()">Reset Kernel</button>
      <button type="button" class="btn btn-success" onclick="updatekernel()">Apply Kernel</button>
    </div>
    <div class="color-ambient">
      <span class="text-options">Color box: </span>
      <input type="color" id="colorPicker" onchange="updateColor()" value="#ffffff">
      <span class="text-options">Color ambient: </span>
      <input type="color" id="colorPickerAmbient" onchange="updateColorAmbient()" value="#191919">
      <span class="text-options">Spot ligh color: </span>
      <input type="color" id="colorPickerSpot" onchange="updateColorSpot()" value="#ffffff">
    </div>
    <div class="color-ambient">
      <span class="text-options">Matrix size: </span>
      <input type="number" id="matrixSizeInput" value="40">
      <button type="button" class="btn btn-primary" onclick="updateMatrixSize()">Apply</button>
      <span class="text-options-warning">A high number is not recommended.</span>
    </div>
    <div class="color-ambient">
      <span class="text-options">Adjacent game conditions: </span>
      <select id="cond1" class="form-select" onchange="adyajentcond1()" aria-label="Selection of condition">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4" selected>4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
      <span class="text-options">and </span>
      <select id="cond2" class="form-select" onchange="adyajentcond2()" aria-label="Selection of condition">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5" selected>5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </select>
    </div>
    <div class="color-ambient">
      <span id="text-show-sphere" class="text-options">Show Sphere: </span>
      <input type="checkbox" id="showSphere" onchange="updateShowSphere()" checked>
      <span id="text-show-edges" class="text-options">Show edges: </span>
      <input type="checkbox" id="showEdges" onchange="updateShowEdges()" checked>
    </div>
  </div>

</body>

</html>

{{< /highlight >}}
{{< /details >}}

### Links of interest

* [Complete code of the project here](https://github.com/ycuervob/gameoflife/)
* [GitHub page of the code here](https://ycuervob.github.io/gameoflife/)

## About the project

### The game of life
The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a mathematical game that simulates the evolution of a grid of cells based on a set of simple rules. Despite its simplicity, the Game of Life exhibits complex and fascinating patterns.

The game is played on a two-dimensional grid, where each cell can be in one of two states: alive or dead. The state of each cell is determined by its neighboring cells. The rules for the evolution of the game are as follows:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

These rules are applied simultaneously to every cell in the grid, creating a new generation. The process is repeated indefinitely, and the patterns that emerge can be highly complex and intricate.

The Game of Life is not considered a conventional game, as it does not have any players or winning conditions. It is more accurately described as a "zero-player game" or a simulation. The initial state of the grid, often called the "seed," is set by the user or generated randomly. From there, the evolution of the grid is determined solely by the rules of the game.

The Game of Life has captured the interest of mathematicians, computer scientists, and enthusiasts alike due to its ability to generate intricate and unexpected patterns. It has been studied extensively and has revealed interesting properties, including patterns that oscillate, move, replicate, or even create structures like gliders and spaceships.

### Inspiration
In his influential book "El mundo como obra de arte: En busca del diseño profundo de la naturaleza" renowned American physicist Professor Frank Wilczek presents a fascinating exploration of projections of dimensional and extradimensional spaces. Throughout its pages, the author invites us to embark on an intellectual journey that transcends the limits of reality as we know it.

In this captivating work, Wilczek emphasizes the importance of understanding how dimensions function and manifest in the universe. Through cutting-edge examples and theories, the author delves into the possibility of the existence of additional dimensions beyond the three that we commonly perceive. With exceptional mastery, he demonstrates how these additional dimensions could manifest and how we could potentially interact with them in the tangible world.

One of the most intriguing questions addressed in the book is the possibility of coexistence with beings that have more than three dimensions in our three-dimensional world. Wilczek challenges us to imagine and explore how these beings could interact with us, how they would perceive reality, and how their existence could influence our environment. Through his analysis, the professor encourages us to expand our mental horizons and consider new perspectives on the nature of reality itself.

From these considerations arises the mention of John Horton Conway's Game of Life, a mathematician's game mentioned earlier. This influential game in various fields of science is presented on a two-dimensional grid, which can be seen as a projection of a higher dimension. In a finite world, the Game of Life behaves as a grid unfolded in a three-dimensional world. When finite automata move upwards to the boundary of the two-dimensional grid, they reappear at the bottom of the grid. The same occurs when they move to the right (or left), and the automaton reappears on the other side of the grid, almost teleporting. However, for Professor Wilczek, this phenomenon occurs because the plane of the game, as we know it, is actually a projection of a higher-dimensional figure.

The projections of figures from one dimension to another are extremely useful in various applications. A notable example is taking the planet Earth, with all its roads and locations, and representing it on a three-dimensional sphere, and then projecting it onto a two-dimensional plane, which facilitates navigation through systems like GPS.

<div>
<p style="text-align: center;">Figure 1: Example of a map projection where the reference surface with geographic coordinates (f,l) is projected onto the 2D mapping plane with 2D Cartesian coordinates (x, y).</p>
<img style="display: block;margin-left: auto; margin-right: auto;width: 50%;" id="classigConvolution" src="/showcase/sketches/mapProjection.png" width="500" height="auto">
<p style="font-size: 10px">Source: <a target="_blank" href="https://kartoweb.itc.nl/geometrics/Map%20projections/body.htm">https://kartoweb.itc.nl/geometrics/Map%20projections/body.htm</a></p>
</div>

This projection process presents a fundamental challenge: how to accurately represent a curved surface on a plane without distorting the geographic information too much. Throughout history, numerous cartographic projections have been developed, each with its advantages and limitations.

In the context of GPS navigation, specific cartographic projections are used to represent the Earth's surface on a two-dimensional plane. Among the most common projections are the Mercator projection and the Robinson projection. The Mercator projection is widely used due to its ability to preserve angles and facilitate maritime navigation, although it tends to distort areas near the poles. On the other hand, the Robinson projection seeks a balance between shape and size of regions, making it more suitable for the global representation of the Earth.

In the Game of Life, a similar process takes place, where it is important to understand that the automata do not actually teleport, but rather move on a three-dimensional structure. In this case, the plane they operate on is a torus, a donut-shaped object, where the automata move in circular trajectories inward and outward (not up and down), as well as around the surface of the torus (not from left to right).

This peculiar configuration gives rise to interesting and recurring patterns in the Game of Life. As the automata interact and reproduce according to the rules of the game, patterns emerge that evolve over time. These patterns can take on complex geometric forms, such as static blocks, periodic oscillators, or even space-faring ships that move around the torus.
<div>
<p style="text-align: center;">Figure 2: Game of life torus - basic animation</p>
<div class="row" style="display: flex;height: auto;width: 100%">
  <div style="float: left;width: 50%">
    <img style="display: block;margin-left: auto; margin-right: auto;width: 100%;" id="classigConvolution" src="/showcase/sketches/game_of_life_2d.gif" width="auto" height="10px">
  </div>
  <div style="background-color: #fbfbfb;width: 50%;float: left;display: flex;align-items: center;">
    <img style="display: block;margin-left: auto; margin-right: auto;width: 100%;" id="classigConvolution" src="/showcase/sketches/game_of_life.gif" width="auto" height="10px">
  </div>
</div>

</div>

<p style="font-size: 10px">Source: <a target="_blank" href="https://www.youtube.com/watch?v=FRclzGILg74">https://www.youtube.com/watch?v=FRclzGILg74</a></p>

The topology of the torus introduces a notion of finite boundaries in this simulated world, as the automata cannot escape the torus or indefinitely move in a particular direction. This creates a confined yet dynamic environment, where patterns evolve and develop within the limits of the torus.

The Game of Life is a fascinating example of how a mathematical structure like a torus can influence the dynamics and emerging patterns of a system. Through observation and experimentation, we can appreciate the various shapes and behaviors that arise in this three-dimensional virtual world and explore the broader implications of geometry in the evolution of automata.

With the projections clear, now the same phenomenon will be applied to the development of a Game of Life that operates in three dimensions on its own (adding diagonal and forward-backward movements). This means that this new Game of Life is a projection of a four-dimensional figure. By extrapolating the Game of Life in two dimensions, the original game will be given a torus shape, where automata that travel forward will teleport backward, and vice versa. Thus, an additional original figure of one dimension is introduced to the torus, creating a hyper-torus (a torus in four dimensions), visible in a three-dimensional world as:

<p style="text-align: center;">Figure 3: 4D Hyper-torus visualization as a 3D object</p>
<img style="display: block;margin-left: auto; margin-right: auto;width: 100%;" id="classigConvolution" src="/showcase/sketches/hyper_torus.gif" width="auto" height="10px">
<p style="font-size: 10px">Source: <a target="_blank" href="https://www.youtube.com/watch?v=C5qwBpAqTUs">https://www.youtube.com/watch?v=C5qwBpAqTUs</a></p>

When closely examining the movement within a hyper-torus, a fascinating property is revealed: when an object attempts to exit this three-dimensional representation of a four-dimensional object, it returns to itself and maintains internal movement within its own space. This characteristic resembles the dynamics observed in the original game, where finite automata exist in a limited yet freely moving world.

The concept of the hyper-torus, also known as a torus in four dimensions, expands our understanding of geometry and invites us to explore the limits of our spatial perception. In this configuration, the hyper-torus exhibits complex trajectories and self-contained movement, implying continuous and recurrent interaction within its own dimensions.

Similar to the Game of Life, where finite automata can move freely within a bounded environment, objects existing in the hyper-torus also experience a sense of freedom within their multidimensional space. Although confined within the limits of the three-dimensional representation, their internal movement unfolds in multiple directions, creating a dynamic and continuous dance within the hyper-torus.

This exploration of geometry and the representation of four-dimensional objects leads us to reflect on the possibilities and challenges posed by understanding reality beyond our limited perceptual dimensions. The study of the hyper-torus and its intrinsic movement encourages us to consider the implications of higher dimensions and how they influence the dynamics and interactions of objects.

## Three.js

Three.js is a JavaScript library that is utilized in the mentioned project for rendering 3D graphics and creating interactive visualizations. It provides a set of powerful tools and functions for working with WebGL, a web-based graphics API that enables hardware-accelerated 3D rendering in modern browsers.

In the context of the project, Three.js is used to visualize the projection of the hyper-torus as a cube, which is the three-dimensional representation of the four-dimensional Game of Life. By leveraging Three.js, the project can create a dynamic and immersive environment where users can observe and interact with the evolving patterns within the hyper-torus as a cube.

With Three.js, it becomes possible to render complex geometries, apply materials and textures, manipulate camera perspectives, and add lighting effects to enhance the visual experience. The library offers a high-level abstraction, making it easier to work with 3D graphics in the browser without directly dealing with the lower-level WebGL API.

By combining TensorFlow.js for the computational aspects of the Game of Life and Three.js for the visualization, the project can provide an engaging and interactive representation of the evolution of automata within the hyper-torus. It allows users to explore the fascinating patterns and dynamics that emerge from this mathematical simulation in a visually appealing and intuitive manner.

## TensorFlow.js

The code uses TensorFlow, an open-source library for machine learning and neural networks. TensorFlow offers a wide range of tools and functionalities for building and training machine learning models.

In this case, TensorFlow is used to perform the convolution of the Game of Life matrix. Convolution is a mathematical process that combines two functions to produce a third function that represents how one function influences the other. In the context of the Game of Life, convolution is used to apply the rules of the game and determine the state of each cell in the next generation.

The code uses the convolution functionality of TensorFlow to convolve the Game of Life matrix with a specific kernel. The kernel is a three-dimensional matrix that defines the rules of survival and death for the cells in the game. Through convolution, a new matrix is obtained that represents the next generation of the game.

### Little Explannation

In two dimensions we can make a convolution like the ones shown in [masking section](/showcase/docs/shortcodes/corte_1/masking/#kernel-convolution), this kind of convolution allow us to alter an image mixing the characteristics of a convolution kernel and the image itsefl. Each operation is made over every pixel of the image making possible to change the value of the pixel according to the values of the pixel in its surroundings, an example of a single operation is shown in the next image.

<div>
<p style="text-align: center;">Figure 4: Kernel convolution</p>
<img id="classigConvolution" src="/showcase/sketches/convolution2d.png" width="auto" height="auto">
</div>

We can create a convolution in which we can count the number of one's surrounding a specific "pixel". the process shown in figure 1 is calculated throw a simple operation, basically the process consist of reshaping the values of the matrices of shape 3x3 in vectors of shape 9x1 an operate them with dot product.

{{< katex display >}}
    C_M = (1 \times 1) + (0 \times 1) + (0 \times 1) + (0 \times 1) + (1 \times 0) + (1 \times 1) + (1 \times 1) + (0 \times 1) + (0 \times 1) = 3
{{< /katex >}}

Similarly, we can extrapolate this operation in two dimensions in three dimensions as well, imagine a kernel matrix not of shape 3x3 but one of shape 3x3x3 such as the one in the Figure 2 which has ones in every postion exept for the center.

<div>
<p style="text-align: center;">Figure 5: Kernel convolution 3 dimensions</p>
<img style="display: block;margin-left: auto; margin-right: auto;width: 50%;" id="classigConvolution" src="/showcase/sketches/convolution3d.png" width="500px" height="500px">
</div>

Therefore, we can use a matrix of such characteristics to perform a similar operation like the one made in Figure 1, as shown in Figure 3.

<div>
<p style="text-align: center;">Figure 6: Convolution 3 dimensions</p>
<img  id="classigConvolution" src="/showcase/sketches/convolution3dcomplete.png" width="auto" height="auto">
</div>

### The power of TensorFlow.js

An operation like the one shown in Figure 3, can be perform by making simple steps in node js or in browsers by the use of WEBGL that help us making operations faster thanks to GPU.

```JavaScript
    const tf = require('@tensorflow/tfjs');

    // Define the binary input data
    const inputData = tf.tensor5d(
    [[[[[1, 0, 1], [0, 1, 0]], [[1, 0, 1], [0, 1, 0]]]]],
    [1, 2, 2, 2, 1] // Shape: [batch, depth, height, width, channels]
    );

    // Define the binary kernel weights
    const kernelWeights = tf.tensor5d(
    [[[[[1, 0, 1], [0, 1, 0]], [[1, 0, 1], [0, 1, 0]]]]],
    [1, 2, 2, 2, 1] // Shape: [filters, depth, height, width, channels]
    );

    // Perform the convolution
    const convOutput = tf.conv3d(inputData, kernelWeights, 1, 'valid');

    // Print the result
    convOutput.print();
```

## Conclusion
In conclusion, the Game of Life 3D project, inspired by the fascinating ideas presented in Frank Wilczek's book "El mundo como obra de arte: En busca del diseño profundo de la naturaleza," offers a captivating exploration of the intersection between mathematics, geometry, and the possibilities of higher dimensions.

By extending John Horton Conway's original Game of Life into a three-dimensional projection of a four-dimensional hyper-torus, the project pushes the boundaries of our spatial perception and invites us to contemplate the nature of reality itself. Just as Wilczek challenges us to envision beings existing in dimensions beyond our own, the Game of Life 3D provides a glimpse into a world where automata freely navigate within the confines of a toroidal structure.

Through the use of technologies such as Three.js and TensorFlow.js, the project leverages the power of web-based graphics rendering and machine learning to create an immersive and interactive experience. Users can observe and interact with the evolving patterns within the hyper-torus as a cube, gaining insights into the complex dynamics and intricate geometries that emerge.

The project serves as a testament to the profound influence of mathematics and geometry on our understanding of the universe. By exploring the behavior of automata within the hyper-torus, it sheds light on the intrinsic connections between dimensions, patterns, and the underlying fabric of reality. It encourages us to expand our mental horizons and contemplate the existence of higher dimensions that may shape our perception and interactions with the world.

In essence, the Game of Life 3D project, inspired by the visionary ideas of Frank Wilczek, not only provides an engaging and visually appealing simulation but also serves as a catalyst for deeper reflections on the nature of our reality and the hidden dimensions that may lie beyond our current understanding.

1. The Game of Life 3D project explores the fascinating possibilities of extending the traditional Game of Life to a three-dimensional space. By projecting the game onto a hyper-torus, which is a four-dimensional figure, the project introduces new dynamics and patterns that emerge from the interaction of automata within this multidimensional environment.
2. The use of Three.js, a powerful JavaScript library for 3D rendering, allows for the visualization of the hyper-torus projection as a cube. This immersive visualization enhances the user experience and provides a dynamic and interactive platform to observe and explore the evolving patterns within the Game of Life 3D.
3. TensorFlow.js, an open-source library for machine learning and neural networks, plays a crucial role in the project by performing the convolution of the Game of Life matrix. Convolution is a mathematical process used to apply the rules of the game and determine the state of each cell in the next generation. By leveraging the convolution functionality of TensorFlow.js, the project achieves efficient computation and accurate simulation of the game's evolution.
4. The concept of higher dimensions, as explored in the project, challenges our perception of reality and encourages us to think beyond our familiar three-dimensional world. By visualizing and interacting with the hyper-torus projection, we gain insights into the intricate dynamics that arise from additional dimensions and how they influence the behavior of automata in the Game of Life.
5. The Game of Life 3D project demonstrates the power of combining mathematical concepts, computational tools, and interactive visualization to create engaging simulations. It showcases the potential of using innovative approaches to explore complex systems and patterns, stimulating curiosity and deeper understanding of mathematical and scientific principles.

## References

1. Wilczek, Frank. "El mundo como obra de arte: En busca del diseño profundo de la naturaleza."
