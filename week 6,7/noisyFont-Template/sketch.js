//start of my code
var points;
var font;
//end of my code
function preload() {
  font = loadFont('assets/Calistoga-Regular.ttf');
}

//////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(900, 400);
  background(0);

  points = font.textToPoints('c o d e', 50, 300, 300, {
    sampleFactor: .3,
    simplifyThreshold: 0
  });
}

//////////////////////////////////////////////////////////////////////
function draw() {
  fill(0, 5);
  rect(0, 0, width, height);

  // **** Your code here ****
  for (let i = 0; i < points.length; i++) {
    fill(random(100, 255), random(0, 150), random(0, 255));
    amt = map(mouseX, 0, width, 0, 20);
    nx = noise(points[i].x + points[i].y + frameCount);
    ny = noise(points[i].y + points[i].x + frameCount + mouseY);
    locX = map(nx, 0, 1, amt, -amt);
    locY = map(ny, 0, 1, amt, -amt);
    ellipse(points[i].x + locX, points[i].y + locY, random(0, 10));
  }
}
