// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
// Extensions:
// Pressing any key changes the filters from sepia to greyscale and vice versa:
// - implemented using keyPressed() function to trigger change a bool
// - also calls loop() to update the image on the right
// Slider implemented to control the matrix value:
// - default matrix value is at 64, however can be changed from values 1-128 (determined by testing)
// - these affect the convolution and radial blur of the image
// - genMatrix() function implemented to shorten code for matrix and generate updated visuals on slider change
// - short tutorial written on how to operate both extensions below left image
var imgIn;

//start of my code
//true for sepia, false for grayscale
var sepOrGrey = true;
var matrixValue = 64;
var matrixSlider;
var matrix;
//end of my code

/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage("assets/husky.jpg");
  //start of my code
  matrixSlider = createSlider(1, 128, matrixValue, 1);
  //end of my code

}
/////////////////////////////////////////////////////////////////
function setup() {
  createCanvas((imgIn.width * 2), imgIn.height + 30);
  //start of my code
  matrixSlider.position(5, imgIn.height + 70);
  //end of my code

}
/////////////////////////////////////////////////////////////////
function draw() {
  //start of my code
  matrixValue = matrixSlider.value();
  matrix = genMatrix();
  //end of my code
  background(255);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  textSize(15);
  text("Press any key to switch between sepia and greyscale.", 0, imgIn.height + 15);
  text("Move Slider to change amount of radial blur and convolution.", 0, imgIn.height + 30);
  noLoop();


}
/////////////////////////////////////////////////////////////////
function mousePressed() {
  loop();
}
//start of my code
//functions that ensure slider movement with Mouse And Keyboard call draw function
function mouseReleased() {
  loop();
}
function keyPressed(){
  //start of my code
  sepOrGrey = !sepOrGrey;
  //end of my code
  loop();
}
//end of my code

/////////////////////////////////////////////////////////////////
//start of my code
function genMatrix() {
  arr = [1 / matrixValue, 1 / matrixValue, 1 / matrixValue, 1 / matrixValue, 1 / matrixValue, 1 / matrixValue, 1 / matrixValue, 1 / matrixValue];
  matr = [];
  for (let i = 0; i < 8; i++) {
    matr.push(arr);    
  }
  return matr;
}
function sepiaFilter(img) {

  var resultImg = createImage(img.width, img.height);

  resultImg.loadPixels();
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {

      let index = ((y * img.width) + x) * 4;

      let oldRed = img.pixels[index];
      let oldGreen = img.pixels[index + 1];
      let oldBlue = img.pixels[index + 2];

      let newRed = (oldRed * .393) + (oldGreen * .769) + (oldBlue * .189);
      let newGreen = (oldRed * .349) + (oldGreen * .686) + (oldBlue * .168);
      let newBlue = (oldRed * .272) + (oldGreen * .534) + (oldBlue * .131);

      resultImg.pixels[index] = newRed;
      resultImg.pixels[index + 1] = newGreen;
      resultImg.pixels[index + 2] = newBlue;
      resultImg.pixels[index + 3] = 255;
    }

  }
  resultImg.updatePixels();
  return resultImg;
}

function darkCorners(img) {
  var resultImg = createImage(img.width, img.height);
  img.loadPixels();
  resultImg.loadPixels();

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {

      let index = ((y * img.width) + x) * 4;
      let oldRed = img.pixels[index];
      let oldGreen = img.pixels[index + 1];
      let oldBlue = img.pixels[index + 2];

      let distFromCentre = dist(round(img.width / 2), round(img.height / 2), x, y);
      let dynLum;

      if (distFromCentre < 300) {
        dynLum = 1;
      }
      else if (distFromCentre >= 300 & distFromCentre < 450) {
        dynLum = map(distFromCentre, 300, 449, 1, 0.4);
      }
      else {
        dynLum = map(distFromCentre, 450, 600, 0.4, 0);
      }

      let newRed = constrain(oldRed * dynLum, 0, 255);
      let newGreen = constrain(oldGreen * dynLum, 0, 255);
      let newBlue = constrain(oldBlue * dynLum, 0, 255);

      resultImg.pixels[index] = newRed;
      resultImg.pixels[index + 1] = newGreen;
      resultImg.pixels[index + 2] = newBlue;
      resultImg.pixels[index + 3] = 255;
    }
  }

  resultImg.updatePixels();
  return resultImg;
}

function radialBlurFilter(img) {
  var resultImg = createImage(img.width, img.height);
  resultImg.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {

      var index = (x + y * img.width) * 4;
      var c = convolution(x, y, matrix, matrix.length, img);

      let oldRed = img.pixels[index];
      let oldGreen = img.pixels[index + 1];
      let oldBlue = img.pixels[index + 2];
      let distFromCentre = dist(img.width / 2, img.height / 2, x, y);
      let dynBlur = 1;
      if (distFromCentre < 100) {
        dynBlur = 0;
      }
      else {
        dynBlur = constrain(map(distFromCentre, 100, 300, 0, 1), 0, 1);

      }
      resultImg.pixels[index + 0] = c[0] * dynBlur + oldRed * (1 - dynBlur);
      resultImg.pixels[index + 1] = c[1] * dynBlur + oldGreen * (1 - dynBlur);
      resultImg.pixels[index + 2] = c[2] * dynBlur + oldBlue * (1 - dynBlur);
      resultImg.pixels[index + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      // Get pixel loc within convolution matrix
      var xloc = x + i - offset;
      var yloc = y + j - offset;
      var index = (xloc + img.width * yloc) * 4;
      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1);

      // multiply all values with the mask and sum up
      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

function borderFilter(img) {
  let resultImg = createGraphics(img.width, img.height);
  resultImg.image(img, 0, 0);
  resultImg.noFill();
  resultImg.stroke(255);
  resultImg.strokeWeight(40);
  resultImg.rect(0, 0, img.width, img.height, 40);
  return resultImg;
}
function greyscaleFilter(img) {
  var resultImg = createImage(img.width, img.height);
  resultImg.loadPixels();
  img.loadPixels();

  for (x = 0; x < resultImg.width; x++) {
    for (y = 0; y < resultImg.height; y++) {

      var index = (x + y * resultImg.width) * 4;

      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var gray = r * 0.299 + g * 0.587 + b * 0.114; // LUMA ratios 

      resultImg.pixels[index + 0] = resultImg.pixels[index + 1] = resultImg.pixels[index + 2] = gray;
      resultImg.pixels[index + 3] = 255;
    }
  }
  resultImg.updatePixels();
  return resultImg;
}
//end of my code
function earlyBirdFilter(img) {
  var resultImg = createImage(img.width, img.height);
  //start of my code
  if (sepOrGrey) {
    resultImg = sepiaFilter(img);
  }
  else {
    resultImg = greyscaleFilter(img);
  }
  //end of my code
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)

  return resultImg;
}


