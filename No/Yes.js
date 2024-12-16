/** @type {CanvasRenderingContext2D} */
let context;

setContext();

export default context;

function setContext() {
  let canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context = canvas.getContext("2d");
}