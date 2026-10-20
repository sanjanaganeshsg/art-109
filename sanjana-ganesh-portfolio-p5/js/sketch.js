
let canvas;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", -2)
    //background(125);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    
}

function mouseMoved(){
    drawThing(mouseX, mouseY);
    drawThing(mouseX - 25, mouseY - 50);
}

function drawThing(_x, _y){
    strokeWeight(0);
    fill(random(150, 225), random(150, 225), random(150, 225));
    rect(_x, _y, 20, 20);
}
