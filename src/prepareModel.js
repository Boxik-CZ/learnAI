export async function readFile() {
  const response = await fetch('./datasets/data.txt');
  const text = await response.text();
  return text;
}

export function getDataset(path) {
  let text = readFile(path);
  let x = [];
  let y = [];
  let a = text.split("\n")[0];
  let b = text.split("\n")[1];
  x = a.split(";");
  
  for (let i = 0; i < x.length; i++) {
    x[i] = x[i].split(",");
    for (let n = 0; n < x[i].length; n++) {
        x[i][n] = parseInt(x[i][n]);
    }
  }
  y = b.split(";");
  for (let i = 0; i < y.length; i++) {
    y[i] = y[i].split(",");
    for (let n = 0; n < y[i].length; n++) {
        y[i][n] = parseInt(y[i][n]);
    }
  }
  return [x,y];
}