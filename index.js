myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

// Defining a point
const A = { x: myCanvas.width / 2, y: 300 };
const B = { x: 400, y: myCanvas.height / 2 };

// Defining the colors
const orange = { r: 230, g: 150, b: 0 };
const blue = { r: 0, g: 70, b: 160 };

const ctx = myCanvas.getContext("2d");
let audioCtx = null;

/* when clicking on the canvas, we initialize the audioCtx. the user needs to interact with the page first*/

const lowFreq = 200;
const highFreq = 600;
let osc = null;
myCanvas.onclick = function () {
  if (audioCtx == null) {
    //diff browsers support diff audio context objects
    audioCtx = new (
      AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext
    )();
    // Now I want a tone, in a specific frequency
    osc = audioCtx.createOscillator();
    osc.frequency.value = 200;
    osc.start();

    //reducing the value of the oscillator so we define a gain node
    const node = audioCtx.createGain();
    node.gain.value = 0.1;

    // connect that oscilator to the node, and the node to the dest audioCtx
    osc.connect(node);
    node.connect(audioCtx.destination);
  }
};

animate();

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height); //clear the canvas

  // move the points using some value of t
  const sec = new Date().getTime() / 1000;
  //set t to the no. of milliseconds from the last sec
  // const t = sec - Math.floor(sec);

  const t = (Math.sin(sec * Math.PI) + 1) / 2;

  //I want to animate the backgroundColor of the canvas so I will generalize the vLerp function
  //iterate through all the attributes
  const { r, g, b } = vLerp(orange, blue, t);
  myCanvas.style.backgroundColor = `rgb(${r},${g},${b})`;

  const C = vLerp(A, B, t);
  drawDot(C, "", "white");

  drawDot(A, "A", "white");
  drawDot(B, "B", "white");

  //Now I want to change the frequency using t value
  if (osc) {
    osc.frequency.value = lerp(lowFreq, highFreq, t);
  }

  //lerping on text
  ctx.strokeStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "bold 40px Arial";
  //we want the dashes to animate so that it covers the whole letter.
  ctx.setLineDash([lerp(30, 130, t), 130]); // makes the ouline of the text => dashed 50 for dash length and 130 for spacing b/w the dashes
  ctx.strokeText("click for sound", myCanvas.width / 2, 10);
  ctx.setLineDash([]); //reset this so that other lines are not affected
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillText("click for sound", myCanvas.width / 2, 10);
  requestAnimationFrame(animate);
}

// Linear Interpolation Function
function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}

//this function will work not just with points but with colors r,g,b as well. color can be viewed as 3d point
function vLerp(A, B, t) {
  //assuming A and B are same type of objects
  const res = {};
  for (let attr in A) {
    res[attr] = lerp(A[attr], B[attr], t);
  }
  return res;
}

/*Draws similar triangles, whoose side lengths are propotional*/
// Draw 10 points equally spaced to A and B
// const n = 10;
// for (let i = 0; i <= n - 1; i++) {
//   const t = i / (n - 1); //-ve values and (1+t) do "extrapolation"
//   // Linear Interpolation Formula on Point C
//   const C = vLerp(A, B, t);
//   drawDot(C, "." + i);
// }

// drawDot(A, "A");
// drawDot(B, "B");

// Interpolation in 2d for cleaner syntax
// function vLerp(A, B, t) {
//   return {
//     x: lerp(A.x, B.x, t),
//     y: lerp(A.y, B.y, t),
//   };
// }

function drawDot(pos, label, color) {
  // Drawing a circle with white fill, black outline and radius 10 on the canvas.
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = "black";
  ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // I want to know that this is circleA so
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 14px Arial";
  ctx.fillText(label, pos.x, pos.y);
}
