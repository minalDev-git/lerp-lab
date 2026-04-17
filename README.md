# lerp-lab

Demonstration of linear interpolation (lerp) in JavaScript. This repository contains two small web demos that show how the lerp function works for numbers, colors, and 2D points — one interactive slider demo (week8) and one animated canvas demo (root).

## Overview
Linear interpolation (often shortened to "lerp") is a simple technique to find a value that lies between two known values. It is widely used in animation, color blending, audio parameter smoothing, and many other interactive systems where smooth transitions are needed.

This repository contains:
- `index.html` + `index.js` — a canvas-based animated demo that uses lerp for positions, color transitions, and audio frequency.
- `week8/week8.html` + `week8/week8.js` — a focused, interactive UI that lets you control the lerp parameter with a slider and see the numeric result.

---

## What is Linear Interpolation (lerp)?
Linear interpolation produces a value that is a fraction `t` of the way between two values `a` and `b`. The fraction `t` usually ranges from 0 to 1:
- `t = 0` → result is `a`
- `t = 1` → result is `b`
- `0 < t < 1` → result is between `a` and `b`

Mathematically, the formula is:
result = a * (1 - t) + b * t

This formula gives a smooth, linear blend from `a` to `b` as `t` moves from 0 to 1.

---

## The lerp function (how it works)
The simple JavaScript implementation used in these demos is:

```javascript
function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}
```

- `a` and `b` are numbers (start and end).
- `t` is the interpolation parameter (0..1).
- The function returns a number between `a` and `b`.

For objects like colors or 2D points, a `vLerp` (vector lerp) is used to apply `lerp` to each attribute:

```javascript
function vLerp(A, B, t) {
  const res = {};
  for (let attr in A) {
    res[attr] = lerp(A[attr], B[attr], t);
  }
  return res;
}
```

This lets you treat colors (`{r, g, b}`) as 3D points or positions (`{x, y}`) the same way.

---

## Root demo (index.html + index.js)

Files:
- `index.html`
- `index.js`

What it demonstrates:
- A full-window canvas with two fixed points labeled A and B.
- An intermediate point C that moves smoothly between A and B using `vLerp` with a time-varying `t`.
- Background color transitions between an orange and a blue value using `vLerp` on color channels.
- A dashed outline text that animates using `lerp` for dash length.
- On the first click the page initializes an audio oscillator (user interaction is required by browsers to enable audio). The oscillator's frequency is controlled by `lerp` between `lowFreq` and `highFreq`, providing an audio feedback that follows the visual interpolation.

How to interact:
- Open `index.html` in a browser.
- Observe the moving point and the background color smoothly changing — these are direct visual feedback of lerp in action.
- Click anywhere on the canvas to enable sound (this is required by modern browsers; the click is a discoverable affordance that provides the necessary user gesture). After clicking you will hear a tone whose pitch follows the same interpolation pattern.

---

## Week8 demo (week8/week8.html + week8/week8.js)

Files:
- `week8/week8.html`
- `week8/week8.js`

What it demonstrates:
- A small UI to experiment with numeric lerp. The page exposes:
  - Two numeric inputs: "Start Value" and "End Value".
  - A slider (`input type="range"`) with values between 0 and 1 (step 0.01) that represents `t`.
  - Live text that shows the current lerp amount (`t`) and the computed lerped value between start and end.

Behavior:
- As the slider is moved (direct manipulation), the computed value updates immediately.
- The numeric inputs accept changes; when you change either start or end, the result updates right away.

Why this is useful:
- The slider provides continuous control and immediate feedback — a classic HCI pattern for exploring parameter space.
- The interface supports discoverability (labels and clear results), responsiveness (instant updates), and visibility (you can see both the parameter and the resulting number).

Example interaction:
- Set start = 10, end = 100, move slider to 0.5 → result shows 55.00 (because lerp(10, 100, 0.5) = 55).

---

---

## Live Demo
1. Website URL:
   git clone https://github.com/minalDev-git/lerp-lab.git
2. Interact:
   - Move the slider in week8 to see numeric lerp results.
   - In the root demo, click the canvas to enable sound and watch the visual changes.

---
