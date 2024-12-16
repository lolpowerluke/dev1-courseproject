"use strict";

let uppercorner = 50;
let width = 50;

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

context.fillStyle = "black";
context.fillRect(uppercorner, uppercorner, width*7, width*7);
context.fillStyle = "green";
context.beginPath();

context.moveTo(uppercorner + width, uppercorner + width*2);
context.lineTo(uppercorner + width, uppercorner + width*4);
context.lineTo(uppercorner + width*2, uppercorner + width*4);
context.lineTo(uppercorner + width*2, uppercorner + width*5);
context.lineTo(uppercorner + width*1, uppercorner + width*5);
context.lineTo(uppercorner + width*1, uppercorner + width*6);
context.lineTo(uppercorner + width*3, uppercorner + width*6);
context.lineTo(uppercorner + width*3, uppercorner + width*4);
context.lineTo(uppercorner + width*4, uppercorner + width*4);
context.lineTo(uppercorner + width*4, uppercorner + width*6);
context.lineTo(uppercorner + width*6, uppercorner + width*6);
context.lineTo(uppercorner + width*6, uppercorner + width*5);
context.lineTo(uppercorner + width*5, uppercorner + width*5);
context.lineTo(uppercorner + width*5, uppercorner + width*4);
context.lineTo(uppercorner + width*6, uppercorner + width*4);
context.lineTo(uppercorner + width*6, uppercorner + width*2);
context.lineTo(uppercorner + width*5, uppercorner + width*2);
context.lineTo(uppercorner + width*5, uppercorner + width*3);
context.lineTo(uppercorner + width*4, uppercorner + width*3);
context.lineTo(uppercorner + width*4, uppercorner + width*2);
context.lineTo(uppercorner + width*3, uppercorner + width*2);
context.lineTo(uppercorner + width*3, uppercorner + width*3);
context.lineTo(uppercorner + width*2, uppercorner + width*3);
context.lineTo(uppercorner + width*2, uppercorner + width*2);

context.fill();