let pic
let pic2
let x = 0
let canvassizex = 680;
let canvassizey = 575;
let imagesize = canvassizex / 2;
let tileCount = 0;
let mycolor = [0, 0, 0];

function preload() {
  pic = loadImage('/showcase/sketches/kinegram.jpg');
}

function setup() {
  createCanvas(canvassizex, canvassizey);
  typeSelect = createRadio();
  typeSelect.option('kinegram');
  typeSelect.option('kinegram2');
  typeSelect.option('kinegram3');
  typeSelect.style('font-size', '10px');
  typeSelect.style('text-align', 'center');
  typeSelect.style('align', 'center');
  typeSelect.position(0, 0);
  typeSelect.value('Normal vision');
  typeSelect.changed(program);

  // create a slider element and position it on the canvas
  const slider = createSlider(-300, 300, tileCount);
  slider.position(200, 0);
  slider.input(() => {
    tileCount = slider.value();
  });

  const r = createSlider(0, 255, red);
  r.position(canvassizex-200, 20);
  r.input(() => {
    mycolor[0] = r.value();
  });

  const g = createSlider(0, 255, green);
  g.position(canvassizex-200, 40);
  g.input(() => {
    mycolor[1] = g.value();
  });

  const b = createSlider(0, 255, blue);
  b.position(canvassizex-200, 60);
  b.input(() => {
    mycolor[2] = b.value();
  });
  
}

function program() {
  pic = loadImage('/showcase/sketches/' + typeSelect.value() + '.jpg');
  switch (typeSelect.value()) {
    case 'kinegram':
      imagesize = canvassizex / 2;
      break;
    case 'kinegram2':
      imagesize = canvassizex;
      break;
    case 'kinegram3':
      imagesize = canvassizex - 50;
      break;
  }
}

function draw() {
  background(255);
  imageMode(CENTER);
  pic.resize(imagesize, 0)
  image(pic, canvassizex / 2, canvassizey / 2);

  for (let j = 0; j < 2000; j += 8) {
    stroke(color(mycolor))
    strokeWeight(4)
    line(x + j + tileCount, 30, x + j, height)
    strokeWeight(4)
    line(x - j + tileCount, 30, x - j, height)
  }

  rect(canvassizex-240, 10, 230, 60);
  strokeWeight(1);
  text("R", canvassizex-230, 25);
  text("G", canvassizex-230, 45);
  text("B", canvassizex-230, 65);

  if (x > canvassizex) {
    x = 0
  } else {
    x = x + 0.5
  }

}









/*
let x=0
for(let k=99; k<1000;k+=7){
   stroke(220)
   strokeWeight(4)
   line(k,0,k,300)
  
   stroke(220)
   strokeWeight(7)
   line(k,290,k,500)
 } 
  push()
  translate(100,101)
  rotate(HALF_PI*4)
  image(pic,0,0,275,300)
  
  pop() 
 
   for(let j=0;j<2000;j+=7){
    stroke(50)
    strokeWeight(2)
    line(j+x,0,j+x,height)
  }
  if(x>550){
    x=0
  }else{
    x=x+0.9
  }









*/