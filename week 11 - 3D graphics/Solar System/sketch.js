var sunTexture;
var earthTexture;
var moonTexture;
var starsBuffer;
var starsLoc;


function genRandXY() {
    randX = random(0, width * 3 + 1);
    randY = random(0, height * 5 + 1);
    var location = {
        x: randX,
        y: randY
    }
    return location;
}

function preload() {
    sunTexture = loadImage("assets/sun.jpg");
    earthTexture = loadImage("assets/earth.jpg");
    moonTexture = loadImage("assets/moon.jpg");

    starsBuffer = createGraphics(width * 3, height * 5);


    starsLoc = [];

}


function setup() {
    createCanvas(900, 600, WEBGL);
    angleMode(DEGREES);
    rectMode(CENTER);
    //remove wireframes
    noStroke();

    camera(0, -400, height, 0, -20, 0, 0, 1, 0);

    location = genRandXY();
    starsLoc.push(location);
}
//code to draw the sun
function drawSun() {
    texture(sunTexture);
    sphere(75);
    pointLight(255, 255, 255, 0, 0, 0);
    pointLight(255, 255, 255, 0, 0, 0);
}
//code to draw the earth
function drawEarth() {
    texture(earthTexture);
    ambientMaterial(255, 255, 255);
    sphere(50);
}

//code to draw the moon
function drawMoon() {
    texture(moonTexture);
    ambientMaterial(255, 255, 255);
    sphere(15);
}

function sky() {
    translate(0, 200, -500);

    starsBuffer.fill(255);

    for (let i = 0; i < starsLoc.length; i++) {
        if (random(0, 100) <= 94) {
            starsBuffer.rect(starsLoc[i].x, starsLoc[i].y, 5);
        }
        else {
            starsLoc[i] = genRandXY();
        }
    }
    texture(starsBuffer);
    plane(width * 3, height * 5);
}

function draw() {
    //used to reset frames to simulate animation
    background(155);

    push();
    rotateX(32);
    sky();
    pop();

    push();
    drawSun();
    rotateY(-frameCount);
    push();
    translate(260, 0, 0);
    rotateY(frameCount);
    drawEarth();
    rotateY(frameCount * 2);
    push();
    translate(100, 0, 0);
    drawMoon();
    pop();
    pop();
    pop();

}
