//imports, such wow
import * as Utils from "../scripts/utils.js";
import context from "../scripts/context.js";
import * as Noise from "../scripts/perlinNoise.js";

//canvas dimensions, idk its 2d stuff
let w = context.canvas.width;
let h = context.canvas.height;

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

let rndArray = [];

//noise levels
let noiseX = 30;
let noiseY = 0;

//keep track of squares hitting the sides of the screen, when will they start learing how to drive properly
let isGoingDown = true;
let isGoingRight = true;

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
function setY(eventData) {
  if (k == 0) {
    y = eventData.clientY/(moveHeight);
    k = 1;
    ds();
  }
}

//main drawing function
function ds() {
  let ohNo = Noise.perlinNoise(x);
  //change fill color
  context.fillStyle = Utils.hsla((i/colorSpeed+randomColorStart)%360, 100, 50, 0.25);
  //draw square
  context.fillRect(x*moveWidth+ohNo*noiseX, y*moveHeight+ohNo*noiseY, squareWidth, squareHeight);
  randomClearRect(Math.round(Math.random()*rndMaxNumber));
  movementDirection();
  checkBorders((x*moveWidth)+squareWidth, (y*moveHeight)+squareHeight);
  //keep track of amount of squares (very important), I mean its only used for color
  i++;
  //draw more squares
  requestAnimationFrame(ds);
}

function randomClearRect(rnd) {
  //compare random number
  if (rnd == Math.round(rndMaxNumber/2)) {
    //clear line
    context.clearRect(0, y*moveHeight, w, squareHeight)
  }
}

function checkBorders(xWidth, yHeight) {
  //more movement logic, again, read the code cmn
  if (xWidth >= w) {
    isGoingRight = false;
  } else if (xWidth <= squareWidth) {
    isGoingRight = true;
  }
  if (yHeight >= h) {
    isGoingDown = false;
  } else if (yHeight <= squareHeight) {
    isGoingDown = true;
  }
}

function movementDirection() {
  //movement logic, just read the code like cmn
  if (isGoingDown) {
    if (isGoingRight) {
      x++;
      y++;
    } else {
      x--;
      y++;
    }
  } else {
    if (isGoingRight) {
      x++;
      y--;
    } else {
      x--;
      y--;
    }
  }
}

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

function circlesYay(Cx, Cy, Cr) {
  Utils.fillCircle(Cx, Cy, Cr);
}