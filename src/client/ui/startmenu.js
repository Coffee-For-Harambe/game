let startBtn = document.getElementById('start_btn');
startBtn.addEventListener("click", _ =>{
  console.log('working')
  toggleScreen('start_menu', false);
  toggleScreen('canvas', true);

})


function toggleScreen(id,toggle) {
  let element = document.getElementById(id);
  let display = ( toggle ) ? 'block' : 'none';
  element.style.display = display;
}












// function hideElement() {
//   let element = document.getElementById("ui")
//   element.classList.toggle("hide")
//   // document.querySelector("#ui").toggleClass("ui.hide")
// }

// function showCredits() {
//   hideElement()
//   let creditsG = document.getElementById("credits")
//   element.classList.toggle("show")
//   // document.querySelector("#ui").toggleClass("ui.hide")
// }

// document.querySelector("#start").addEventListener("click", hideElement)
// document.querySelector("#new").addEventListener("click", hideElement)
// document.querySelector("#credits").addEventListener("click", showCredits)
