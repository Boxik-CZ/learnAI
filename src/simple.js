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
window.onload = () => {
  for (let i = 0; i < add.length; i++) {
    add[i].onclick = () => {
      prDia.style.display = "none";
    };
  }
};
