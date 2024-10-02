//extensions:
//Implemented Audio functionalities:
// - Notes now play sounds from a p5 MonoSynth object
// - p5 audio class implemented
// - Notes data comes from a static notes array (index chosen based on grid X) and a mapped octave (based on grid Y)
//UI Implementations:
// - Audio ON/OFF toggle comes from Backspace key
// - Slider for threshold (defaults at 50)
// - Slider for volume in % (defaults at 50%)
//Visual Implementations(in Grid.js):
// - Sparks fly off on 3% of detections
// - notes no longer circles - now rectangles
// - rectangular notes rotate as well
// - colour of rectangular notes
// - Blue value mix now includes frameCount into map function 

var video;
var prevImg;
var diffImg;
var currImg;
var thresholdSlider;
var threshold;
//start of my code
var grid;
var volSlider;
var vol;
//end of my code

function setup() {
    createCanvas(640 * 2, 480);
    pixelDensity(1);

    //start of my code
    angleMode(DEGREES);
    //end of my code

    video = createCapture(VIDEO);
    video.hide();

    thresholdSlider = createSlider(0, 255, 50);
    thresholdSlider.position(20, 20);
    //start of my code
    volSlider = createSlider(0, 100, 50, 1);
    volSlider.position(20, 50);
    grid = new Grid(640, 480);
    //end of my code

}

function draw() {


    background(0);
    image(video, 0, 0);

    currImg = createImage(video.width, video.height);
    currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
    //start of my code
    currImg.resize(video.width / 4, video.height / 4);
    currImg.filter(BLUR, 3);
    //end of my code
    diffImg = createImage(video.width, video.height);
    diffImg.loadPixels();
    //start of my code
    diffImg.resize(video.width / 4, video.height / 4);
    //end of my code

    threshold = thresholdSlider.value();
    //start of my code
    vol = volSlider.value();
    //end of my code

    if (typeof prevImg !== 'undefined') {
        prevImg.loadPixels();
        currImg.loadPixels();
        for (var x = 0; x < currImg.width; x += 1) {
            for (var y = 0; y < currImg.height; y += 1) {
                var index = (x + (y * currImg.width)) * 4;
                var redSource = currImg.pixels[index + 0];
                var greenSource = currImg.pixels[index + 1];
                var blueSource = currImg.pixels[index + 2];

                var redBack = prevImg.pixels[index + 0];
                var greenBack = prevImg.pixels[index + 1];
                var blueBack = prevImg.pixels[index + 2];

                var d = dist(redSource, greenSource, blueSource, redBack, greenBack, blueBack);

                if (d > threshold) {
                    diffImg.pixels[index + 0] = 0;
                    diffImg.pixels[index + 1] = 0;
                    diffImg.pixels[index + 2] = 0;
                    diffImg.pixels[index + 3] = 255;
                } else {
                    diffImg.pixels[index + 0] = 255;
                    diffImg.pixels[index + 1] = 255;
                    diffImg.pixels[index + 2] = 255;
                    diffImg.pixels[index + 3] = 255;
                }
            }
        }
    }
    diffImg.updatePixels();
    image(diffImg, 640, 0);
    prevImg = createImage(currImg.width, currImg.height);
    prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);
    console.log("saved new background");
    noFill();
    stroke(255);
    text(threshold, 160, 35);
    //start of my code
    text(vol+'%',160,65);
    text("Press BACKSPACE to toggle audio ON/OFF", currImg.width / 2 + 100, 10);



    text(setAudioText(), currImg.width / 2 + 150, 25);

    grid.run(diffImg,vol);
    //end of my code


}

function keyPressed() {
    //start of my code
    if (keyCode === BACKSPACE) {
        grid.toggleAudio();
    }
    //end of my code
}
//start of my code
function setAudioText() {
    let audioText = "Audio is OFF";
    stroke(255, 0, 0);
    if (grid.audioEnabled) {
        stroke(0, 255, 0);
        audioText = "Audio is ON";
    }
    return audioText;
}
//end of my code

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function distSquared(x1, y1, z1, x2, y2, z2) {
    var d = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1);
    return d;
}
