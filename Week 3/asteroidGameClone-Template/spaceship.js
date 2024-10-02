class Spaceship {

  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run() {
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw() {
    fill(125);
    triangle(this.location.x - this.size / 2, this.location.y + this.size / 2,
      this.location.x + this.size / 2, this.location.y + this.size / 2,
      this.location.x, this.location.y - this.size / 2);
  }

  move() {
    //start of my code
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.normalize();
    //end of my code
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  interaction() {
    var interSpeed = 0.7;
    if (keyIsDown(LEFT_ARROW)) {
      //start of my code
      this.applyForce(createVector(-interSpeed, 0));
      //end of my code
    }
    if (keyIsDown(RIGHT_ARROW)) {
      //start of my code
      this.applyForce(createVector(interSpeed, 0));
    }
    if (keyIsDown(UP_ARROW)) {
      //start of my code
      this.applyForce(createVector(0, -interSpeed));
      //end of my code
    }
    if (keyIsDown(DOWN_ARROW)) {
      //start of my code
      this.applyForce(createVector(0, interSpeed));
      //end of my code
    }
  }

  fire() {
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges() {
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }

  setNearEarth() {
    //YOUR CODE HERE (6 lines approx)
    //start of my code
    console.log("IS NEAR EARTH");
    var gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    var friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.div(30);
    this.applyForce(friction);
    //end of my code
  }
}
