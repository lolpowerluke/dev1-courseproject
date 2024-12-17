/** @type {CanvasRenderingContext2D} */
let context;

setContext();

export default context;

function setContext() {
  let canvas2 = document.getElementById("canvas2");
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight;
  context = canvas2.getContext("2d");
}
