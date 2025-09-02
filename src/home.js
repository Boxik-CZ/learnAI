const btns = document.getElementsByClassName("sel");
const lang = localStorage.getItem("lang");
console.log(lang);
btns[0].onclick = () => {
  if (lang == "us") {
    window.location.href = "./simpleEN.html";
  } else if (lang == "cs") {
    window.location.href = "./simpleCS.html";
  }
};
btns[1].onclick = () => {
  console.log("yes sirrrrr");
};
btns[2].onclick = () => {
  console.log("yes sirrrrr");
};
