// Images
let horse, chicken, sheep, cow, pig, barn;

// Sounds
let horsesound, chickensound, sheepsound, cowsound, pigsound;

function preload() {
  // Load images
  horse = loadImage('data/Horse Emoji.png');
  chicken = loadImage('data/Chicken Emoji.png');
  sheep = loadImage('data/Sheep Emoji.png');
  cow = loadImage('data/Cow Emoji.png');
  pig = loadImage('data/Pig Emoji.png');
  barn = loadImage('data/Barn.png');

  // Load sounds
  horsesound = loadSound('data/horse.mp3');
  chickensound = loadSound('data/chicken.mp3');
  sheepsound = loadSound('data/sheep.mp3');
  cowsound = loadSound('data/cow.mp3');
  pigsound = loadSound('data/pig.mp3');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  textFont('Verdana');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // Sky
  background(135, 206, 235);

  // Grass
  fill(0, 200, 100);
  noStroke();
  rect(0, height * 0.75, width, height * 0.25);

  // Text in the sky
  fill(255, 255, 255);
  textSize(32);
  textAlign(CENTER);
  text('Interactive Farm Scene', width / 2, 50);
  
  textSize(18);
  text('Click on the animals to hear their sounds! 🐴🐔🐑🐄🐷', width / 2, 85);

  // Barn - centered horizontally, positioned above grass
  let barnWidth = 400;
  let barnHeight = 400;
  let barnX = (width - barnWidth) / 2;
  let barnY = height * 0.75 - barnHeight + 50;
  image(barn, barnX, barnY, barnWidth, barnHeight);

  // Animal emojis - positioned at bottom, evenly spaced
  let animalSize = 100;
  let animalY = height - animalSize - 20;
  let spacing = width / 6;
  
  image(horse, spacing * 0.5, animalY, animalSize, animalSize);
  image(chicken, spacing * 1.5, animalY, animalSize, animalSize);
  image(sheep, spacing * 2.5, animalY, animalSize, animalSize);
  image(cow, spacing * 3.5, animalY, animalSize, animalSize);
  image(pig, spacing * 4.5, animalY, animalSize, animalSize);
}

function mousePressed() {
  let animalSize = 100;
  let animalY = height - animalSize - 20;
  let spacing = width / 6;
  
  // Horse
  if (mouseX > spacing * 0.5 && mouseX < spacing * 0.5 + animalSize && 
      mouseY > animalY && mouseY < animalY + animalSize) {
    horsesound.play();
  }
  // Chicken
  else if (mouseX > spacing * 1.5 && mouseX < spacing * 1.5 + animalSize && 
           mouseY > animalY && mouseY < animalY + animalSize) {
    chickensound.play();
  }
  // Sheep
  else if (mouseX > spacing * 2.5 && mouseX < spacing * 2.5 + animalSize && 
           mouseY > animalY && mouseY < animalY + animalSize) {
    sheepsound.play();
  }
  // Cow
  else if (mouseX > spacing * 3.5 && mouseX < spacing * 3.5 + animalSize && 
           mouseY > animalY && mouseY < animalY + animalSize) {
    cowsound.play();
  }
  // Pig
  else if (mouseX > spacing * 4.5 && mouseX < spacing * 4.5 + animalSize && 
           mouseY > animalY && mouseY < animalY + animalSize) {
    pigsound.play();
  }
}

