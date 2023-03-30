let venus;
let canvassizex = 680;
let canvassizey = 575;
let tileCount = 1;
let globalimg;

function preload() {
    venusOriginal = loadImage("/showcase/sketches/venus.jpg");
}

function setup() {
    createCanvas(canvassizex, canvassizey);
    resizeCanvas(canvassizex, venusOriginal.height * 2 + 10);
    const slider = createSlider(1, 10, tileCount);
    slider.position(0, venusOriginal.height * 2 + 5);
    slider.input(() => {
        tileCount = slider.value();
        drawImages();
    });
    drawImages();
}

function drawImages() {
    image(venusOriginal, 0, 0);
    loadImage("/showcase/sketches/venus.jpg", img => {
        globalimg = img;
        makeDithered(tileCount);
        fill(255);
        rect(5, venusOriginal.height * 2 - 30, 200, 20);
        fill(0);
        text("Using:" + pow(tileCount+1,3)+" colors!", 15, venusOriginal.height * 2 - 18);
    });
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(steps, value) {
    return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(tileCount) {
    
    globalimg.loadPixels();

    let pixs = globalimg.pixels;

    for (let y = 0; y < globalimg.height; y++) {
        for (let x = 0; x < globalimg.width; x++) {
            let index = (x + y * globalimg.width) * 4;
            let oldR = pixs[index];
            let oldG = pixs[index + 1];
            let oldB = pixs[index + 2];

            let newR = closestStep(tileCount, oldR);
            let newG = closestStep(tileCount, oldG);
            let newB = closestStep(tileCount, oldB);

            pixs[index] = newR;
            pixs[index + 1] = newG;
            pixs[index + 2] = newB;
        }
    }

    globalimg.updatePixels();
    globalimg.resize(canvassizex, 0);
    image(globalimg, 0, venusOriginal.height);
}
