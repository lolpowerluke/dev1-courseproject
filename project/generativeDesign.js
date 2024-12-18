//imports, such wow
import * as Utils from "../scripts/utils.js";
import * as Utils2 from "../scripts/utils2.js";
import context from "../scripts/context.js";
import context2 from "../scripts/context2.js";
import context3 from "../scripts/context3.js";
import * as Noise from "../scripts/perlinNoise.js";

//canvas dimensions, idk its 2d stuff
let w = context.canvas.width;
let h = context.canvas.height;
let w2 = context2.canvas.width;
let h2 = context2.canvas.height;
let w3 = context3.canvas.width;
let h3 = context3.canvas.height;

//variables for square dimensions, yes cool right
let squareWidth = 10;
let squareHeight = 10;

let rndMaxNumber = 200;
//variables for square movements, gotta go fast
let moveWidth = 2;
let moveHeight = 6;

//variables for color, ooh shiny
let colorSpeed = 4; //higher is slower
let randomColorStart = Math.round(Math.random()*360);

//evergrowing variables, damn they should really stop eating
let x = 0;
let y;
let k = 0;
let i = 0;

let x2 = w2;
let y2 = h2/2;
let i2 = 0;
let Icolor = 0;
let landArray = [];
let landScapePerlinFactor = 50;
let landscapeSectionsWidth = 30;
let landscapeRandomChangeFactor = 10;
let landscapeMouseSpeed = 20;

let rndArray = [];

//noise levels
let noiseX = 10;
let noiseY = 10;

//keep track of squares hitting the sides of the screen, when will they start learing how to drive properly
let isGoingDownLine = true;
let isGoingRightLine = true;

let isGoingDownLandscape = true;

/*This is meant to feel annoying*/
for (let j = 0; j < rndMaxNumber; j++) {
  let r = Math.round(Math.random());
  if (r == 1) {
    rndArray.push(true);
  } else {
    rndArray.push(false);
  }
}


window.onmousedown = interactiveRight;
//take mousemovement, its in the name cmn
window.onmousemove = setY;


//set Y according to mouse position, wow overcomplication
function setY(e) {
  if (k == 0) {
    setLineStartPoint(e.pageY);
  }
  setLandscapeSpeed(e.pageX);
}

// set start point for the bouncing line
function setLineStartPoint(yLine) {
  y = yLine/(moveHeight);
  k = 1;
}

// gets faster depending on where you mouse is in the window
function setLandscapeSpeed(xMouse) {
  landscapeMouseSpeed = landscapeSectionsWidth - Math.round((((xMouse/w2)) * landscapeSectionsWidth)) + 1;
}

// repeat everything ever frame
function repeat() {
  ds();
  landscape();
  requestAnimationFrame(repeat);
}

//main drawing function
function ds() {
  if (k > 0) {
    let ohNo = Noise.perlinNoise(x);
    let ohNoRandom = Math.round(Math.random());
    if (ohNoRandom == 0) {
      ohNo = ohNo*-1;
    }
    //change fill color
    setColors();
    //draw square
    context.fillRect(x*moveWidth+ohNo*noiseX, y*moveHeight+ohNo*noiseY, squareWidth, squareHeight);
    randomClearRect(Math.round(Math.random()*rndMaxNumber));
    movementDirectionLine();
    checkBordersLine((x*moveWidth)+squareWidth, (y*moveHeight)+squareHeight);
    //keep track of amount of squares (very important), I mean its only used for color
    i++;
  }
}

// set color for bouncing line squares
function setColors() {
  context.fillStyle = Utils.hsla((i/colorSpeed+randomColorStart)%360, 100, 50, 0.1);
}

// clear a line randomly
function randomClearRect(rnd) {
  //compare random number
  if (rnd == Math.round(rndMaxNumber/2)) {
    //clear line
    context.clearRect(0, y*moveHeight, w, squareHeight)
  }
}

function movementDirectionLine() {
  //movement logic, just read the code like cmn
  if (isGoingDownLine) {
    if (isGoingRightLine) {
      x++;
      y++;
    } else {
      x--;
      y++;
    }
  } else {
    if (isGoingRightLine) {
      x++;
      y--;
    } else {
      x--;
      y--;
    }
  }
}

function checkBordersLine(xWidth, yHeight) {
  //more movement logic, again, read the code cmn
  if (xWidth >= w) {
    isGoingRightLine = false;
  } else if (xWidth <= squareWidth) {
    isGoingRightLine = true;
  }
  if (yHeight >= h) {
    isGoingDownLine = false;
  } else if (yHeight <= squareHeight) {
    isGoingDownLine = true;
  }
}

// draw a circle when you click (sometimes)
/**
 * 
 * @param {MouseEvent} e 
 */
function interactiveRight(e) {
  let r = Math.round(Math.random()*rndMaxNumber);
  if (rndArray[r]) {
    circlesYay(e.pageX, e.pageY, r);
  }
}

// draw circle
function circlesYay(Cx, Cy, Cr) {
  Utils.fillCircle(Cx, Cy, Cr);
}

//create initial landscape array
for (let lnd = 0; lnd < Math.round(w2/landscapeSectionsWidth)+landscapeSectionsWidth; lnd++) {
  Icolor++;
  i2++;
  makeLandscapePoint();
}

//draw landscape
function landscape() {
  i2++;
  if (i2 % landscapeMouseSpeed == 0) {
    makeLandscapePoint();
    landArray.shift();
  }
  
  context2.clearRect(0, 0, w2, h2);

  for (let Iarray = 0; Iarray < landArray.length-1; Iarray++) {
    context2.fillStyle = landArray[Iarray].color;
    context2.beginPath();
    context2.moveTo(Iarray*landscapeSectionsWidth - (i2%landscapeMouseSpeed), h2);
    context2.lineTo(Iarray*landscapeSectionsWidth - (i2%landscapeMouseSpeed), landArray[Iarray].y);
    if (landArray[Iarray+1].y > landScapePerlinFactor/2) {
      context2.lineTo(Iarray*landscapeSectionsWidth + landscapeSectionsWidth - (i2%landscapeMouseSpeed), landArray[Iarray+1].y);
    } else {
      context2.lineTo(Iarray*landscapeSectionsWidth + landscapeSectionsWidth - (i2%landscapeMouseSpeed), landArray[Iarray+1].y);
    }
    context2.lineTo(Iarray*landscapeSectionsWidth + landscapeSectionsWidth - (i2%landscapeMouseSpeed), h2);
    context2.fill();
  }
}

// create coordinates for the landscape array
function makeLandscapePoint() {
  Icolor += 5;
  checkBordersLandscape(y2)
  movementDirectionLandscape();
  let landScapePoint = {
    y: y2,
    color: Utils.hsla((Icolor/colorSpeed+randomColorStart)%360, 100, 50, 0.2)
  }
  landArray.push(landScapePoint);
}

function checkBordersLandscape(yHeight) {
  //more movement logic, again, read the code cmn
  if (yHeight > h2/4*3) {
    isGoingDownLandscape = false;
  } else if (yHeight < h2/4) {
    isGoingDownLandscape = true;
  }
  let randomChange = Math.round(Math.random()*landscapeRandomChangeFactor);
  if (randomChange == Math.round(landscapeRandomChangeFactor/2)) {
    isGoingDownLandscape = !isGoingDownLandscape;
  }
}

function movementDirectionLandscape() {
  //movement logic, just read the code like cmn
  let rndNoise = Math.round(Noise.perlinNoise(i2)*landScapePerlinFactor);
  if (isGoingDownLandscape) {
    y2 += rndNoise;
  } else {
    y2 -= rndNoise;
  }
}


// draw spaceInvader
let width = 10;
let uppercornerHeight = h3-width*7 - 10;
let uppercornerWidth = w3-width*7 - 10;

context3.fillStyle = "rgb(0, 0, 0, 0.5)";
context3.strokeStyle = "rgb(255, 0, 0, 0.5)";
context3.fillRect(uppercornerWidth, uppercornerHeight, width*7, width*7);
context3.strokeRect(uppercornerWidth, uppercornerHeight, width*7, width*7);
context3.fillStyle = "rgb(0, 255, 0, 0.25)";

context3.beginPath();
context3.moveTo(uppercornerWidth + width, uppercornerHeight + width*2);
context3.lineTo(uppercornerWidth + width, uppercornerHeight + width*4);
context3.lineTo(uppercornerWidth + width*2, uppercornerHeight + width*4);
context3.lineTo(uppercornerWidth + width*2, uppercornerHeight + width*5);
context3.lineTo(uppercornerWidth + width*1, uppercornerHeight + width*5);
context3.lineTo(uppercornerWidth + width*1, uppercornerHeight + width*6);
context3.lineTo(uppercornerWidth + width*3, uppercornerHeight + width*6);
context3.lineTo(uppercornerWidth + width*3, uppercornerHeight + width*4);
context3.lineTo(uppercornerWidth + width*4, uppercornerHeight + width*4);
context3.lineTo(uppercornerWidth + width*4, uppercornerHeight + width*6);
context3.lineTo(uppercornerWidth + width*6, uppercornerHeight + width*6);
context3.lineTo(uppercornerWidth + width*6, uppercornerHeight + width*5);
context3.lineTo(uppercornerWidth + width*5, uppercornerHeight + width*5);
context3.lineTo(uppercornerWidth + width*5, uppercornerHeight + width*4);
context3.lineTo(uppercornerWidth + width*6, uppercornerHeight + width*4);
context3.lineTo(uppercornerWidth + width*6, uppercornerHeight + width*2);
context3.lineTo(uppercornerWidth + width*5, uppercornerHeight + width*2);
context3.lineTo(uppercornerWidth + width*5, uppercornerHeight + width*3);
context3.lineTo(uppercornerWidth + width*4, uppercornerHeight + width*3);
context3.lineTo(uppercornerWidth + width*4, uppercornerHeight + width*2);
context3.lineTo(uppercornerWidth + width*3, uppercornerHeight + width*2);
context3.lineTo(uppercornerWidth + width*3, uppercornerHeight + width*3);
context3.lineTo(uppercornerWidth + width*2, uppercornerHeight + width*3);
context3.lineTo(uppercornerWidth + width*2, uppercornerHeight + width*2);
context3.fill();





repeat();