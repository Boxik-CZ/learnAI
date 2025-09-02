import { getDataset } from "./prepareModel";
const preD = document.getElementById("presetDS");
const uplD = document.getElementById("uplDS");
const clsBtn = document.getElementById("close");
const prDia = document.getElementsByClassName("dialog")[0];
const add = document.getElementsByClassName("add");
preD.onclick = () => {
  prDia.style.display = "flex";
};
clsBtn.onclick = () => {
  prDia.style.display = "none";
};
let ds = [];
let x = [];
let y = [];
window.onload = () => {
  for (let i = 0; i < add.length; i++) {
    add[i].onclick = () => {
      prDia.style.display = "none";
      ds = getDataset(`https://boxik-cz.github.io/learnAI/assets/datasets/${i}.ds`);
      x = ds[0];
      y = ds[1];
      console.log(x);
      console.log(y);
    };
  }
};
