//extensions:
//Key press events trigger the change of the left photo:
//-Implemented using a random number generator (RNG) and the keyPressed() function
//-calls loop() as draw() is executed once before noloop() (applies to next extension)
//faces change dynamically change values following MouseX: 
//- Created using mappings to linear interpolation
//- In order to draw updates, mouseMoved() function (called on event when mouse is moved) calls loop()
var imgs = [];
var avgImg;
var numOfImages = 30;
//start of my code
var imageIndexLeft;
//end of my code
//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    //start of my code
    //push all images to imgs array
    for (let i = 0; i < numOfImages; i++) {
        let filename = "assets/" + i + ".jpg";
        imgs.push(loadImage(filename));
    }
    //set index for left image
    setImageIndexLeft();
    //end of my code
}
//////////////////////////////////////////////////////////
function setup() {
    //start of my code
    createCanvas(imgs[0].width * 2, imgs[0].height);
    //end of my code
    pixelDensity(1);
    //start of my code
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    //end of my code
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    //start of my code
    //draw first image
    image(imgs[imageIndexLeft], 0, 0);

    //load pixel arrays for left images and right image
    avgImg.loadPixels();
    imgs.forEach(element => {
        element.loadPixels();
    });
    //loop through X and Y coordinates
    for (let x = 0; x < imgs[0].width; x++) {
        for (let y = 0; y < imgs[0].height; y++) {
            //get pixel index
            let pixelIndex = (x + (y * imgs[0].width)) * 4;

            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            //get sum of all images' RGB values at this pixel
            imgs.forEach(img => {
                sumR += img.pixels[pixelIndex];
                sumG += img.pixels[pixelIndex + 1];
                sumB += img.pixels[pixelIndex + 2];
            });
            //set RGB values to average of all images' RGBs at this pixel, set alpha to max
            avgImg.pixels[pixelIndex] = round(sumR / imgs.length);
            avgImg.pixels[pixelIndex + 1] = round(sumG / imgs.length);
            avgImg.pixels[pixelIndex + 2] = round(sumB / imgs.length);
            avgImg.pixels[pixelIndex + 3] = 255;
        }

    }
    //call linear interpolation function
    lerpMouseXToRightImg();

    avgImg.updatePixels();
    //draw right image and stop loop
    image(avgImg, imgs[0].width, 0);
    noLoop();
    //end of my code
}
//start of my code

//on any key pressed swap left image
function keyPressed() {
    setImageIndexLeft();
    loop();

}

//draws new random image
function drawRandomImg() {
    setImageIndexLeft();
    image(imgs[imageIndexLeft], 0, 0);
}
//sets random index for left image
function setImageIndexLeft() {
    imageIndexLeft = round(random(0, imgs.length));
}
//restarts draw loop
function mouseMoved() {
    loop();
}

//linearly interpolates all pixels on avgImg to pixels of left img based on mouseX movement 
function lerpMouseXToRightImg() {
    for (let pixel = 0; pixel < imgs[0].pixels.length; pixel++) {
        avgImg.pixels[pixel] = lerp(avgImg.pixels[pixel], imgs[imageIndexLeft].pixels[pixel], map(mouseX, 0, width, 0, 1));
    }
}
//end of my code