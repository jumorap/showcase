let img;
let hueSlider;
let saturationSlider;
let brightnessSlider;
let input;
let button;


function preload() {
  img = loadImage('https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg');
  input = createInput();
}

function setup() {
  createCanvas(400, 400);

  // Crea el slider de Hue
  hueSlider = createSlider(-360, 360, 0);
  hueSlider.position(20, height + 20);
  // Agrega una etiqueta para el slider de Hue
  let hueLabel = createElement('label', 'Hue');
  hueLabel.position(150, height);
  hueLabel.style('marginTop', '20px');

  // Crea el slider de Saturation
  saturationSlider = createSlider(0, 255, 127);
  saturationSlider.position(20, height + 50);
  // Agrega una etiqueta para el slider de Saturation
  let saturationLabel = createElement('label', 'Saturation');
  saturationLabel.position(150, height + 30);
  saturationLabel.style('marginTop', '20px');

  // Crea el slider de Brightness
  brightnessSlider = createSlider(-255, 255, 0);
  brightnessSlider.position(20, height + 80);
  // Agrega una etiqueta para el slider de Brightness
  let brightnessLabel = createElement('label', 'Brightness');
  brightnessLabel.position(150, height + 60);
  brightnessLabel.style('marginTop', '20px');

  // Actualiza la imagen cuando se mueve alguno de los sliders
  hueSlider.input(drawupdate);
  saturationSlider.input(drawupdate);
  brightnessSlider.input(drawupdate);

  
  // Create a text input and button
  input.position(0, 0);
  button = createButton('imge URL or reset');
  button.position(input.x + input.width, 0);
  button.mousePressed(buttonpressed);

  image(img, 0, 0, width, height);
}

function buttonpressed() {
  url = input.value() || 'https://http2.mlstatic.com/D_NQ_NP_866685-MLC29350122842_022019-O.jpg';
  loadImage(url, myimg => {
    img = myimg;
    drawupdate();
  });
}

function drawupdate() {
  background(0);
  image(img, 0, 0, width, height);
  angle = radians(hueSlider.value());
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const matrix = [
    cos + (1 - cos) / 3, 1 / 3 * (1 - cos) - Math.sqrt(1 / 3) * sin, 1 / 3 * (1 - cos) + Math.sqrt(1 / 3) * sin,
    1 / 3 * (1 - cos) + Math.sqrt(1 / 3) * sin, cos + 1 / 3 * (1 - cos), 1 / 3 * (1 - cos) - Math.sqrt(1 / 3) * sin,
    1 / 3 * (1 - cos) - Math.sqrt(1 / 3) * sin, 1 / 3 * (1 - cos) + Math.sqrt(1 / 3) * sin, cos + 1 / 3 * (1 - cos)
  ];

  loadPixels();


  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let r = pixels[index] || 0;
      let g = pixels[index + 1] || 0;
      let b = pixels[index + 2] || 0;
      let average = (r + g + b) / 3;
      const newR = r * matrix[0] + g * matrix[1] + b * matrix[2];
      const newG = r * matrix[3] + g * matrix[4] + b * matrix[5];
      const newB = r * matrix[6] + g * matrix[7] + b * matrix[8];

      pixels[index] = average + (newR - average) * (saturationSlider.value() / 127) + brightnessSlider.value();
      pixels[index + 1] = average + (newG - average) * (saturationSlider.value() / 127) + brightnessSlider.value();
      pixels[index + 2] = average + (newB - average) * (saturationSlider.value() / 127) + brightnessSlider.value();
    }
  }
  updatePixels();
}


function rotatehueofcolor(c) {
  c.sort((a, b) => { if (a.nombre < b.nombre) { return -1 } else if (a.nombre > b.nombre) { return 1 } else { return 0 } });
  let cmax = c[2].value;
  let cmin = c[0].value;
  let dif = cmax - cmin;
  let hue = hueSlider.value();
  let postomod = (Math.floor((hue + c[1].value - cmin) / dif) + 1) % 3;

  if (dif == 0) {
    return c;
  }

  c[Math.abs(postomod)].value = c[Math.abs(postomod)].value + hue;



  return c;
}