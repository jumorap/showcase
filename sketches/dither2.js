let controlFactor = 0.1;
let canvassizex = 680;
let canvassizey = 400;
let venus;
let tileCount = 1;

function preload() {
    venus = loadImage("/showcase/sketches/venus.jpg");
}

function setup() {
    frameRate(10);
    createCanvas(canvassizex, canvassizey);
    onleftpressed();
    const slider = createSlider(1, 20, tileCount);
    slider.position(0, 0);
    slider.input(() => {
        tileCount = slider.value();
    });
}

function mouseClicked() {
    loadImage("/showcase/sketches/venus.jpg", function (img) {
        venus = img;
        onleftpressed();
    });
}

function draw() {
    loadImage("/showcase/sketches/venus.jpg", function (img) {
        venus = img;
        onleftpressed();
        fill(255);
        rect(150, 0, 100, 20);
        fill(0);
        text("Using:" + pow(tileCount+1,3)+" colors!", 150, 18);
    });
}


function myx(u, value) {
    let steps = tileCount;
    return round(steps * round(u * value) / 255) * floor(255 / steps);
}

function onleftpressed() {
    venus.loadPixels();

    let pix = venus.pixels;

    for (var i = 0; i < pix.length; i += 4) {
      
        pix[i] = myx(Math.random(0, 1), pix[i]);
        pix[i + 1] = myx(Math.random(0, 1), pix[i + 1]);
        pix[i + 2] = myx(Math.random(0, 1), pix[i + 2]);
    }
    venus.updatePixels();

    image(venus, 0, 0);

}