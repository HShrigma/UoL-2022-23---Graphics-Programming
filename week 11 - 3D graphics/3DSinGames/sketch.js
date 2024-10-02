//Bonus Additions:
//Materials + Several point lights were implemented.
//There is a Graphics texture for the grid.
//The graphics themselves are a background colour with Red value changing with height
//and there are labeled sliders that control Green and Blue values of the Graphics colour.
//custom fonts were also added
//start of my code

//bools to prevent infinite console logs
var loggedGrid = false;
//vars for cube grid
var startX = -400;
var startZ = -400;
var endX = -startX;
var endZ = -startZ;
var cubeXZ = 50;
var buffer;
var length;
//vars for sliders
var sliderHeight;
var sliderColourG;
var sliderColourB;
var sliderOffsetY = 30;
var sliderOffestX = 150;
var labelOffsetY = 0;
var labelH;
var labelG;
var labelB;
//vars for confetti
var confLocs = [];
var confTheta = [];
//vars for cam
var camPos = {
    x: 800,
    y: -600,
    z: 800
}
//slows down the circling animation of the camera
var camAnimSlower = 0.2;
//zoom out camera during circling animation
var camOffset = 200;

//called on successful font load
function drawLabels(font) {
    let keys = ['font-size', 'font-family', 'color'];
    let values = ['16px', 'Montserrat-Bold', 'white'];
    for (let i = 0; i < keys.length; i++) {
        labelH.style(keys[i], values[i]);
        labelG.style(keys[i], values[i]);
        labelB.style(keys[i], values[i]);
    }
    updateLabels();
}
function updateLabels() {

    labelH.html('Height+: ' + sliderHeight.value());
    labelG.html('Green: ' + sliderColourG.value());
    labelB.html('Blue: ' + sliderColourB.value());
}
//called on failed font load
function throwfontErr(font) {
    console.error("Error Loading font: ", font.toString());
}

//function to set positions for the camera
function setCam() {
    camera(camPos.x, camPos.y, camPos.z, 0, 1, 0);
}

//sets material and draws box
function drawCube(size, length, textureValue) {

    //cube draw options
    buffer.background(textureValue, sliderColourG.value(), sliderColourB.value());
    specularMaterial(180);
    shininess(30);
    texture(buffer);

    box(size, length, size);
}

//helper function to generate random coordinates for confetti
function genRandomConfettiLoc() {
    return { x: random(-500, 501), y: random(-800, 1), z: random(-random(-500, 501)) }
}

function drawConfettiplane() {
    normalMaterial();
    plane(15, 15);

}
//confetti function draws confetti using confLocs and confTheta data
function confetti() {
    for (let i = 0; i < confLocs.length; i++) {
        push();


        //set confeti location
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);

        //animate falling by incrementing Y
        confLocs[i].y++;
        if (confLocs[i].y > 0) {
            //res animation after falling too far down
            confLocs[i].y = -800;
        }

        rotateX(confTheta[i]);
        confTheta[i] += 10;
        drawConfettiplane();
        pop();
    }
}

//function for drawing point lights from centre and opposing sides
function drawLights() {
    pointLight(255, 255, 255, 0, -301, 0);
    pointLight(255, 255, 255, startX - 50, length, startZ - 50);
    pointLight(255, 255, 255, endX + 50, length, endZ + 50);    
    pointLight(255, 255, 255, startX - 50, 0, startZ - 50);
    pointLight(255, 255, 255, endX + 50, 0, endZ + 50);
}

//draws a Cube Grid based on a starting and ending X and Z positions
//it takes a size argument to determine the cube size
function drawCubeGrid(startX, startZ, endX, endZ, size) {

    //loop through X and Z positions to draw the grid. 
    for (let posX = startX; posX < endX; posX += size) {
        for (let posZ = startZ; posZ < endZ; posZ += size) {

            //Push and pop reset translate positions to 0,0,0
            push();

            translate(posX, 0, posZ);

            //map out a sine wave for the Y value of the box by using distance from centre
            var distance = dist(posX, 0, posZ, 0, 0, 0);
            length = map(sin(distance + frameCount), -1, 1, 100 + sliderHeight.value(), 300 + sliderHeight.value());
            textureValue = map(sin(distance + frameCount), -1, 1, 0, 255);
            drawCube(size, length, textureValue);

            pop();
            //REMOVE COMMENTS FOR TESTING PURPOSES
            // if (!loggedGrid)
            //     console.log("Cube X: ", posX, "\ncube Z: ", posZ, "\nCube dist: ", distance);
        }
    }

    //REMOVE COMMENTS FOR TESTING PURPOSES
    // loggedGrid = true;
}
function preload() {
    buffer = createGraphics(50, 50);
    sliderHeight = createSlider(0, 400, 0, 5);
    sliderColourG = createSlider(0, 255, 130, 1);
    sliderColourB = createSlider(0, 255, 255, 1);

}
//end of my code



function setup() {
    //start of template code
    createCanvas(900, 800, WEBGL);
    //end of template code

    //start of my code

    //set camera start Position
    setCam();

    //generate confetti locations
    for (let i = 0; i < 200; i++) {
        confLocs.push(genRandomConfettiLoc());
        confTheta.push(random(0, 361));
    }

    //set sliders positions

    sliderHeight.position(sliderOffestX, sliderOffsetY);
    sliderColourG.position(sliderOffestX * 2, sliderOffsetY);
    sliderColourB.position(sliderOffestX * 3, sliderOffsetY);
    //set slider labels
    labelH = createP();
    labelB = createP();
    labelG = createP();
    labelH.position(sliderOffestX, labelOffsetY);
    labelG.position(sliderOffestX * 2, labelOffsetY);
    labelB.position(sliderOffestX * 3, labelOffsetY);
    //label sliders
    loadFont("assets/Montserrat-Bold.ttf", drawLabels, throwfontErr);
    //end of my code
}

function draw() {
    //start of template code
    background(125);
    angleMode(DEGREES);
    //end of template code

    //start of my code
    //map circular camera movement on X and Z axis
    camPos.x = cos(frameCount * camAnimSlower) * (height + camOffset);
    camPos.z = sin(frameCount * camAnimSlower) * (height + camOffset);
    setCam();

    //draw lights
    drawLights();

    //draw cube grid
    drawCubeGrid(startX, startZ, endX, endZ, cubeXZ);

    //draw confetti
    confetti();

    //update Labels
    updateLabels();
    //end of my code
}
