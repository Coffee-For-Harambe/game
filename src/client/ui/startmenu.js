let isMenuOpen = true;
let hadGameStarted = false;



let playBtn = document.getElementById('play_btn');
  playBtn.addEventListener("click", _ =>{
  toggleGame()
  if(!hadGameStarted){ hadGameStarted == true}
})

let newGameBtn = document.getElementById('new_game_btn');
newGameBtn.addEventListener("click", _ =>{
  hadGameStarted = true
  toggleGame()
})


function toggleGame(){
  isMenuOpen = !isMenuOpen
  toggleElement('start_page',isMenuOpen ? true : false);
  toggleElement('canvas', isMenuOpen ? false : true);
}


function toggleElement(id,toggle) {
  let element = document.getElementById(id);
  let display = ( toggle ) ? 'block' : 'none';
  element.style.display = display;
}




// Escape key opens menu
window.addEventListener('keydown', function(e){
  if((e.key=='Escape'||e.key=='Esc') && (e.target.nodeName=='BODY') && hadGameStarted){
      console.log("exc")
      e.preventDefault();
      toggleGame()
    }
});
