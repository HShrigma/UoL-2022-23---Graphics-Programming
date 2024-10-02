/*Notes:
This is my solution for the waving dots assignment.

====================================
Variatons from a regular submission:
====================================

1- Implemented a mouseX normaliser which allows for the dots to stay in place as MouseX on default
can sometimes give 1 instead of 0.
2- Included mouseX & mouseY into the noise for editing the fill colour and styled with noStroke()

==============================
Submission notes on execution:
==============================

1.
For fill colours - R,G & B use noise values:
R - takes frameCount
G - takes mouseX
B - takes mouseY

Reasoning: it looks more interesting as colours both flicker and fade into each other.

====================================
2.
For drawing the dots:

used ellipse position x/y + size/2 
Reasoning: Avoiding the dots being half-rendered out of the canvas.
ellipse size is 1/2 of the size variable.

====================================
3.

For generating noise:
3D noise was generated using dot.x, dot.y and the current frameCount multiplied by a scaler.

Reasoning: Animation is much smoother when frameCount is scaled.

====================================
4.

For mapping out noise (with mouseX):

mouseX was not used for noise generation but instead was added to the mapping variables.
Reasoning: It achieved virtually the same results as generating the noise with mouseX, however
achieving a completely still grid is much easier this way, code looks cleaner and easier to read.

====================================
4.1.

2 different scaling variables were used
1 for position, 1 for rotation
Reasoning: Better control over the final product. Rotation and position are different in sensitivity.

====================================
Thank you for reading! c:
====================================
*/


//helper function to get rid of mouseX being rounded to 1 when at the leftmost of the screen
//start of my code
function mouseXNormaliser() {
  if (mouseX > 0 && mouseX < 1) {
    return 0;
  }
  return mouseX;
}

//end of my code
function setup() {
  createCanvas(500, 500);
  background(255);
}

function draw() {
  background(255);

  var noOfDots = 20;
  var size = width / noOfDots;
  for (var x = 0; x < noOfDots; x++) {
    for (var y = 0; y < noOfDots; y++) {
      //start of my code
      //generate different noise values for colours
      var rNoise = noise(frameCount);       //changes with time
      var gNoise = noise(mouseX);      //changes with mouse movement
      var bNoise = noise(mouseY);      //changes with mouse movement

      //map noise to byte values
      var r = map(rNoise, 0, 1, 0, 255);
      var g = map(gNoise, 0, 1, 0, 255);
      var b = map(bNoise, 0, 1, 0, 255);

      //generate colour var
      var clr = color(r, g, b);

      //establish an accurate X and y position
      var posX = size * x;
      var posY = size * y;

      //feed all of that data into params
      params = {
        color: clr,
        x: posX,
        y: posY,
        size: size
      }
      //end of my code
      wave(params);
    }
  }
}


function wave(params) {
  //start of my code
  //add scalers to adjust noise values
  var frameScaler = 0.06;
  var posLimit = mouseXNormaliser() * 0.003;
  var angleLimit = mouseXNormaliser() * 0.000001;

  //generate noise using X & Y pos and scaled frame count as
  //the 3D noise 
  var noiseTD = noise(params.x, params.y, frameCount * frameScaler);

  //map to translation using position scaler
  //value to map: 3D noise
  //range1: 0-1
  //range2: +/- (mouseX * position scaler)
  var trans = map(noiseTD, 0, 1, -posLimit, posLimit);

  //map to rotation using rotation scaler
  //value to map: 3D noise
  //range1: 0-1
  //range2: +/- (mouseX * rotation scaler)
  var rot = map(noiseTD, 0, 1, -angleLimit, angleLimit);

  //translate and rotate canvas
  rotate(rot);
  translate(trans, trans);

  //use noise colour as fill and remove black outline
  noStroke();
  fill(params.color);

  //draw ellipse
  ellipse(params.x + params.size / 2, params.y + params.size / 2, params.size / 2);
  //end of my code

}

