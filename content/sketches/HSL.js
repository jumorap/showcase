let hueSlider, satSlider, lightSlider;

function setup() {
  createCanvas(400, 400);
  
  // Create sliders for hue, saturation, and lightness
  hueSlider = createSlider(0, 360, 0);
  hueSlider.position(20, 20);
  satSlider = createSlider(0, 100, 50);
  satSlider.position(20, 50);
  lightSlider = createSlider(0, 100, 50);
  lightSlider.position(20, 80);
}

function draw() {
  // Get the current values of the sliders
  let hue = hueSlider.value();
  let sat = satSlider.value();
  let light = lightSlider.value();
  
  // Set the background color based on the current values of the sliders
  colorMode(HSL);
  background(hue, sat, light);
  
  // Draw a rectangle with the current color values
  noStroke();
  fill(hue, sat, light);
  rect(150, 150, 100, 100);
  
  // Display the current values of the sliders
  textAlign(LEFT, CENTER);
  textSize(16);
  fill(0);
  text("Hue: " + hue, hueSlider.x + hueSlider.width + 10, hueSlider.y + hueSlider.height / 2);
  text("Saturation: " + sat + "%", satSlider.x + satSlider.width + 10, satSlider.y + satSlider.height / 2);
  text("Lightness: " + light + "%", lightSlider.x + lightSlider.width + 10, lightSlider.y + lightSlider.height / 2);
}
