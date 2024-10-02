//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
//vars for clock hands
var secLength = 160;
var secWidth = 1;
var minLength = 140;
var minWidth = 3;
var hourLength = 90;
var hourWidth = 5;
///////////////////////////////////////////////////
function setup() {
  createCanvas(720, 400);
}
///////////////////////////////////////////////////
function draw() {
  //paint scene BG
  background(255);
  //translate to center of screen
  translate(width / 2, height / 2);
  //draw clock BG
  fill(255);
  ellipse(0, 0, 350);

  //SECONDS-------------------------------------
  //begin animation
  push();
  //set stroke colour and weight for second hand
  strokeWeight(secWidth);
  stroke(200, 0, 0);
  //set angle - map out current seconds between
  //values of 0-60 to values of degress 0-360
  var secAngle = map(second(), 0, 60, 0, 360);
  //set rotation for seconds
  rotate(radians(secAngle));
  //draw line
  line(0, 0, 0, -secLength);
  //end animation
  pop();

  //MINUTES-------------------------------------
  //begin animation
  push();
  //set stroke colour and weight for minutes hand
  strokeWeight(minWidth);
  //set angle - map out current minutes between
  //values of mins 0-60 to values of degress 0-360
  var minAngle = map(minute(), 0, 60, 0, 360);
  //set rotation for minutes
  rotate(radians(minAngle));
  //draw line
  line(0, 0, 0, -minLength);
  //end animation
  pop();

  //HOURS----------------------------------------
  //begin animation
  push();
  //set stroke colour and weight for hours hand
  strokeWeight(hourWidth);
  stroke(0);
  //set angle - map out current hours between
  //values of hrs 0-12 to values of degress 0-360
  var hourAngle = map(hour(), 0, 60, 0, 360);
  //set rotation for hours
  rotate(radians(hourAngle));
  //draw line
  line(0, 0, 0, -hourLength);
  //animate hand ornament
  push();
  translate(0, -hourLength + 20);
  ellipse(0, 0, 20);
  //end hand ornament animation
  pop();
  //end animation
  pop();

  //HOUR MARKS----------------------------------------
  //set hour mark count
  var hours = 12;
  //set degrees for each hour mark step
  var hourStep = 360 / hours;
  for (let index = 0; index < hours; index++) {
    push();
    rotate(radians(hourStep * index));
    translate(0, -155);
    line(0, 0, 0, -20);
    pop();
  }
}
