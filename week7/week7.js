const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
canvas.style.marginTop = window.innerHeight / 2 - height / 2 + "px";
const tweenSpeed = 0.2;

const box = {
  x: 0,
  y: 0,
  w: 20,
  h: 20,
  velocity: { x: 0, y: 0 },
  color: "orange",

  //Target position of the box (initially starting from the center of canvas)
  tx: width / 2 - 10, //10 is half width/height of the box
  ty: height / 2 - 10,
};

function drawRect() {
  ctx.clearRect(0, 0, width, height); //clear the canvas
  ctx.fillStyle = box.color;
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 6;
  ctx.strokeRect(box.x, box.y, box.w, box.h);
  ctx.fillRect(box.x, box.y, box.w, box.h);
}

function updateRectPosition() {
  /*this would give us the exact magnitude of the velocity so in the next frame, 
  the box is immediately trasitioned into the new position. To fix this we need to divide this magnitude into chunks
  so that instead of doing all the tweening in one frame, we'll divide it into a course of multiple frames*/
  box.velocity.x = (box.tx - box.x - box.w / 2) * tweenSpeed;
  box.velocity.y = (box.ty - box.y - box.h / 2) * tweenSpeed; //we want the cursor to be in the middle of the box hence h/2 and w/2

  // update the position based on that velocity
  box.x += box.velocity.x;
  box.y += box.velocity.y;
}

function frame() {
  updateRectPosition();
  drawRect();
  ctx.strokeStyle = requestAnimationFrame(frame);
}

// Everytime we click on the canvas, I want to know the coordinates of the mouse
// The box will move to the mouse position
canvas.onmousedown = function ({ offsetX, offsetY }) {
  //The moment we click on the canvas, we need to update the target x, and target y position of the box object
  // so that we can create a new velocity on x and y axix based on that target x

  box.tx = offsetX;
  box.ty = offsetY;
};

frame();
