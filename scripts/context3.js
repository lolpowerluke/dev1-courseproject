/** @type {CanvasRenderingContext2D} */
let context;

setContext();

export default context;

function setContext() {
  let canvas = document.getElementById("canvas3");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context = canvas.getContext("2d");
}
