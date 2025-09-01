const btns = document.querySelectorAll("img");
btns[0].onclick = () => {
  localStorage.setItem("lang", "us");
  window.location.href = "./homeEN.html";
};
btns[1].onclick = () => {
  localStorage.setItem("lang", "cs");
  window.location.href = "./homeCS.html";
};