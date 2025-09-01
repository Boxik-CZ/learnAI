// main.js
import {
  sigmoid,
  sigmoidDer,
  sum,
  LLerror,
  HLerror,
  OLupd,
  HLupd,
  Bupd,
  ReLU,
  ReLUDer,
} from "../lib/MachineLearning-CppModule/ML.js"; // relativní cesta
let start = Date.now();
let x = [[0], [1]];
let y = [[1], [0]];
let I = [0];
let h = [0, 0];
let o = [0];
let bh = [0, 0];
let bo = [0];
let wh = [[0], [0]];
let wo = [[0, 0]];
for (let i = 0; i < wh.length; i++) {
  for (let n = 0; n < wh[i].length; n++) {
    wh[i][n] = Math.random();
  }
}
for (let i = 0; i < wo.length; i++) {
  for (let n = 0; n < wo[i].length; n++) {
    wo[i][n] = Math.random();
  }
}
let lr = 0.1;
let index = 0;
let epochs = 50000;
// Main loop

for (let epoch = 0; epoch < epochs; epoch++) {
  index = epoch % 2;
  I = [x[index][0]];
  for (let i = 0; i < h.length; i++) {
    h[i] = sigmoid(sum(wh[i], I, bh[i]));
  }
  //console.log(sum(wh[0], i, bh[i]));
  let eLL = LLerror(h, wo, index, y, o, bo);
  let eLh = HLerror(eLL, wo, h);

  wo = OLupd(h, wo, eLL, lr);
  wh = HLupd(I, wh, eLh, lr);
  bh = Bupd(bh, eLh, lr);
  bo = Bupd(bo, eLL, lr);
}

for (let i = 0; i < x.length; i++) {
  I = [x[i][0]];
  for (let n = 0; n < h.length; n++) {
    h[n] = sigmoid(sum(wh[n], I, bh[n]));
  }
  for (let n = 0; n < o.length; n++) {
    o[n] = sigmoid(sum(wo[n], h, bo[n]));
  }
  console.log(`x=${x[i][0]}, y=${y[i][0]}, ypred = ${o[0]}`);
  //console.log(i);
  console.log(wh);
  console.log(wo);
}
console.log(`Task took: ${Date.now() - start} ms`);
