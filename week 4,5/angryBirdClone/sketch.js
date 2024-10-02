// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

//start of my code
var gameManager = {
  score: 0,
  timeLeft: 60,
  gameOver: false,
  victory: false,
  boxes: 18,
  lastSec: 0
};
//end of my code

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle = 0;
var angleSpeed = 0;
var canvas;
////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
  //start of my code
  gameManager.lastSec = second();
  //end of my code
}
////////////////////////////////////////////////////////////
function draw() {
  background(0);
  //start of my code

  //set time left
  if (gameManager.lastSec != second()) {
    gameManager.timeLeft--;
    gameManager.lastSec = second();
  }
  //set victory condition
  if (gameManager.boxes == 0) {
    gameManager.victory = true;
  }
  //set loss condition
  if (gameManager.timeLeft <= 0) {
    gameManager.gameOver = true;
  }

  //draw game over
  if (gameManager.gameOver) {
    drawGameOver();
  }
  //draw victory
  else if (gameManager.victory) {
    drawVictory();
  }
  //draw game if loss condition was not met
  else {
    //end of my code
    Engine.update(engine);

    drawGround();

    drawPropeller();

    drawTower();

    drawBirds();

    drawSlingshot();
    //start of my code

    drawHUD();
  }
  //end of my code

}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    //start of my code
    angleSpeed += 0.01;
    //end of my code
  }
  else if (keyCode == RIGHT_ARROW) {
    //start of my code
    angleSpeed -= 0.01;
    //end of my code
  }
}
////////////////////////////////////////////////////////////
function keyTyped() {
  //if 'b' create a new bird to use with propeller
  if (key === 'b') {
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key === 'r') {
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased() {
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body) {
  var pos = body.position;
  return (pos.y > height || pos.x < 0 || pos.x > width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = { x: 0, y: 0 };
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = { x: 0, y: 0 };
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
//start of my code

function drawHUD() {
  push();
  fill(255);
  textAlign(CENTER);

  var txtSize = 25;
  var timeLeft = `Time left: ${gameManager.timeLeft}`;
  var boxesLeft = `Boxes left: ${gameManager.boxes}`;

  textSize(txtSize);
  text(timeLeft, width / 2, txtSize);
  text(boxesLeft, width / 2, txtSize * 2 + 3);
  pop();
}

function drawGameOver() {
  fill(255, 0, 0);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}

function drawVictory() {
  fill(0, 255, 0);
  textSize(80);
  textAlign(CENTER);
  text("VICTORY", width / 2, height / 2);
  noLoop();
}
//end of my code