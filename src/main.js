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
export function tiny(x,y,wh=[[0], [0]], wo = [[0, 0]], bh = [0, 0], bo = [0]) {
  let start = Date.now();
  let I = [0];
  let h = [0, 0];
  let o = [0];
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

  let model = [[wh, wo], [bh, bo], [1,2,1]];
  return model;
}

export function calcNet(x,model) {
  let net = [];
  let tmp = [];
  for (let i = 0; i < model[2].length; i++) {
    for (let n = 0; n < model[2][i]; n++) {
      tmp.push(0);
    }
    net.push(tmp);
    tmp = [];
  }
  let w = model[0];
  let b = model[1];
  net[0] = x;
  let z = 0;
  for (let i = 1; i < net.length; i++) { // layer
    for (let n = 0; n < net[i].length; n++) { // neuron
      z = 0;
      for (let j = 0; j < net[i-1].length; j++) { // connection
        z += net[i-1][j]*w[i-1][n][j];
      }
      net[i][n] = sigmoid(z);
    }
  }
  return net[net.length-1];
}