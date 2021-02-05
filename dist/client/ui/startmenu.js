function hideElement() {
  let element = document.getElementById("ui");
  element.classList.toggle("hide"); // document.querySelector("#ui").toggleClass("ui.hide")
}

document.querySelector("#start").addEventListener("click", hideElement);
document.querySelector("#new").addEventListener("click", hideElement);
document.querySelector("#Options").addEventListener("click", hideElement);
//# sourceMappingURL=startmenu.js.map
