// sigmoid + derivace
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDer(x) {
  let s = sigmoid(x);
  return s * (1 - s);
}

// pomocná funkce sum(v1 * v2 + b)
function sum(v1, v2, b) {
  let s = 0;
  for (let i = 0; i < v1.length; i++) {
    s += v1[i] * v2[i];
  }
  return s + b;
}

// output layer error
function LLerror(hL, who, sample, y, oL_out, b) {
  let deltaO = new Array(who.length);

  for (let j = 0; j < who.length; j++) {
    let z_out = sum(hL, who[j], b[j]);
    oL_out[j] = sigmoid(z_out);
    deltaO[j] = (oL_out[j] - y[sample][j]) * sigmoidDer(z_out);
  }

  return deltaO;
}

// hidden layer error
function HLerror(nextDelta, whn, hL) {
  let deltaH = new Array(hL.length);

  for (let i = 0; i < hL.length; i++) {
    let sumErr = 0;
    for (let j = 0; j < nextDelta.length; j++) {
      sumErr += whn[j][i] * nextDelta[j];
    }
    deltaH[i] = hL[i] * (1 - hL[i]) * sumErr;
  }

  return deltaH;
}

// update weights hidden -> output
function OLupd(hL, who, deltaO, lr) {
  for (let j = 0; j < who.length; j++) {
    for (let i = 0; i < hL.length; i++) {
      who[j][i] -= lr * deltaO[j] * hL[i];
    }
  }
  return who;
}

// update weights input -> hidden
function HLupd(iL, wih, deltaH, lr) {
  for (let i = 0; i < wih.length; i++) {
    for (let k = 0; k < iL.length; k++) {
      wih[i][k] -= lr * deltaH[i] * iL[k];
    }
  }
  return wih;
}

// update bias
function Bupd(b, delta, lr) {
  for (let i = 0; i < b.length; i++) {
    b[i] -= lr * delta[i];
  }
  return b;
}

function ReLU(x) {
  if (x > 0) {
    return x;
  } else {
    return 0;
  }
}

function ReLUDer(x) {
  if (x > 0) {
    return 1;
  } else {
    return 0;
  }
}
// export (pro Node.js)
module.exports = {
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
};
