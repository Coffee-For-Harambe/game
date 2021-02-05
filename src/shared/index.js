import "./game"
import "./logic"
import "./brain/zerosum"

document.getElementById("debug").style.visibility = "hidden"
document.getElementById("debugjson").style.visibility = "hidden"

document.addEventListener("keydown", function (e) {
  if (e.code == "KeyZ") {
    document.getElementById("debug").style.visibility = "visible"
    document.getElementById("debugjson").style.visibility = "visible"
  }
})

document.addEventListener("keydown", function (e) {
  if (e.code == "KeyX") {
    document.getElementById("debug").style.visibility = "hidden"
    document.getElementById("debugjson").style.visibility = "hidden"
  }
})
