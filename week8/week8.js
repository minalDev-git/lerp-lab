const A = document.getElementById("start");
const B = document.getElementById("end");
const slider = document.getElementById("lerpSlider");
const lerpAmountSpan = document.getElementById("lerpAmount");
const lerpValueSpan = document.getElementById("lerpValue");

let start = A.valueAsNumber;
let end = B.valueAsNumber;
// move the slider using value of t
let t = slider.valueAsNumber;

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function updateUI() {
  const result = lerp(start, end, t);

  lerpAmountSpan.textContent = t;
  lerpValueSpan.textContent = result.toFixed(2);
}

A.addEventListener("input", (e) => {
  start = e.target.valueAsNumber;
  updateUI();
});
B.addEventListener("input", (e) => {
  end = e.target.valueAsNumber;
  updateUI();
});
slider.addEventListener("input", (e) => {
  t = e.target.valueAsNumber;
  updateUI();
});
