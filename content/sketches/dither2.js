let controlFactor = 0.1;
let canvassizex = 680;
let canvassizey = 400;
let venus;

function preload() {
    venus = loadImage("/showcase/sketches/venus.jpg");
}

function setup() {
    createCanvas(canvassizex, canvassizey);
    image(venus, 0, 0);
    onleftpressed();
}

function mouseClicked() {
    loadImage("/showcase/sketches/venus.jpg", function (img) {
        venus = img;
        onleftpressed();
    });
}


function myx(u, value) {
    let steps = 5;
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