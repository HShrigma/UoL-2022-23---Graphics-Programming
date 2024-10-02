////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround() {
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
  // your code here
  //start of my code
  //init propeller position, size and options
  propeller = Bodies.rectangle(150, 480, 200, 15, { isStatic: true, angle: angle })
  //add propeller to world
  World.add(engine.world, [propeller]);
  //end of my code

}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push();
  //start of my code
  //set angle and angular velocity
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);

  //update angle by angleSpeed
  angle += angleSpeed;
  //draw object
  drawVertices(propeller.vertices);
  //end of my code
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(bird, bird.mass * 10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds() {
  push();
  //start of my code
  for (var i = 0; i < birds.length; i++) {
    drawVertices(birds[i].vertices);
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
  }
  //end of my code
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
  //start of my code
  //tracker vars
  var boxPosX = 600;
  var boxPosY = 465;
  var boxSize = 80;
  //for loop for width
  for (var x = 0; x < 3; x++) {
    //for loop for height    
    for (var y = 0; y < 6; y++) {
      var box = Bodies.rectangle(boxPosX + boxSize * x, boxPosY - boxSize * y, boxSize, boxSize);
      boxes.push(box);
      colors.push(random(100, 255));
      World.add(engine.world, [box]);
    }
  }
  //end of my code
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push();
  //start of my code
  //loop thorugh boxes
  for (var i = 0; i < boxes.length; i++) {
    //set fill to random green and draw box
    fill(0, colors[i], 0);
    drawVertices(boxes[i].vertices);
    //check for box in world
    if (isOffScreen(boxes[i])) {
      gameManager.boxes--;
      removeFromWorld(boxes[i]);
      boxes.splice(i, 1);
      colors.splice(i, 1);
      i--;
    }
  }
  //end of my code
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
  //start of my code
  slingshotBird = Bodies.circle(200, 230, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);
  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 200 },
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
  //end of my code
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push();
  //start of my code
  fill(200, 120, 0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  //end of my code
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
