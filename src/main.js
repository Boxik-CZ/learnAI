const ml = require("./../lib/MachineLearning-CppModule/ML.js");
let x = [[0], [1]];
let y = [[1], [0]];
let i = [0];
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
  iL = [x[index][0]];
  for (let i = 0; i < h.length; i++) {
    h[i] = ml.sigmoid(ml.sum(i, h[i], bh[i]));
  }
  eLL = ml.LLerror(h, wo, index, y, o, bo);
  eLh = ml.HLerror(eLL, wo, h);

  wo = ml.OLupd(h, wo, eLL, lr);
  wh = ml.HLupd(i, wh, eLh, lr);
  bh = ml.Bupd(bh, eLh, lr);
  oh = ml.Bupd(oh, eLL, lr);
}

for (let i = 0; i < x.length(); i++) {
  iL = [x[i][0]];
  for (let n = 0; n < h.length(); n++) {
    h[i] = ml.sigmoid(ml.sum(i, wh, bh));
  }
  for (let n = 0; n < o.length(); n++) {
    o[i] = ml.sigmoid(ml.sum(i, wo, bo));
  }
  console.log(`x=${x[i][0]}, y=${y[i][0]}, ypred = ${o[0]}`);
}
