//mods
//1 - randomized asteroid colours
//2 - score system
//3 - difficulty: spawn rate of asteroids is raised for every 5 points
var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
//start of my code
var score = 0;
var scoreTracker = 0;
var scoreTxt;
var lose = false;
//end of my code
//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
  //start of my code
  //draw score if lose condition not met;
  if (!lose) {
    fill(255);
    textSize(15);
    scoreTxt = "SCORE: " + score;
    text(scoreTxt, width / 2, 20);
  }
  //raise difficulty for every 5 score points
  if (scoreTracker >= 5) {
    asteroids.spawnRate += 0.005;
    scoreTracker = 0;
  }
  //end of my code
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
  //start of my code
  //spaceship-2-asteroid collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }
  }

  //asteroid-2-earth collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    if (isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }
  }
  //spaceship-2-earth
  if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x)) {
    gameOver();
  }
  //spaceship-2-atmosphere
  if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)) {
    spaceship.setNearEarth();
  }
  //bullet collisions
  for (var i = 0; i < asteroids.locations.length; i++) {
    for (var j = 0; j < spaceship.bulletSys.bullets.length; j++) {
      if (isInside(asteroids.locations[i], asteroids.diams[i], spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam)) {
        asteroids.destroy(i);
        score++;
        scoreTracker++;
        break;
      }
    }
  }
  //end of my code
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  //start of my code
  if (dist(locA.x, locA.y, locB.x, locB.y) < (sizeA + sizeB) / 2) {
    return true;
  }
  return false;
  //end of my code
}

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) { // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  //set lose condition to true
  lose = true;
  fill(255);
  textSize(80);
  textAlign(CENTER);
  //start of my code
  text(scoreTxt, width / 2, (height / 2) - 160);
  //end of my code
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}