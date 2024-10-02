var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
    translate(width / 2, height / 2);
    //start of my code    
    //rotate hand axis
    rotate(radians(speed / 3));
    //end of my code
    celestialObj(color(255, 150, 0), 200); // SUN
    //start of my code
    //rotate child movement axis
    rotate(radians(speed));
    push();
    translate(0, 300);
    //rotate hand axis
    rotate(radians(speed));
    celestialObj(color(0, 0, 255), 80); // EARTH
    //rotate child movement axis
    var moonAngle = -4;
    rotate(radians(speed * moonAngle));
    push();
    translate(0, 100);
    celestialObj(color(255), 30);
    rotate(radians(speed * 4));
    push();
    translate(0, 45);
    rotate(radians(speed * 4));
    celestialObj(color(255), 20);
    pop();
    pop();
    pop();
    //end of my code
    pop();
}

function celestialObj(c, size) {
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size / 2, 0);
}
