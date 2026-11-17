var socket;

function setup() {
  createCanvas(400, 400);
  background(150);

  socket = io.connect("http://localhost:3000");
  socket.on("mouse", newDrawing);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 50, 50);
}

function mouseDragged() {
  var data = {
    x: mouseX,
    y: mouseY
  };

  socket.emit("mouse", data);

  noStroke();
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 50, 50);
}