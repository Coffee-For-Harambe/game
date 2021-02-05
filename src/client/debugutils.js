import renderjson from "./renderjson"

renderjson.set_icons("+", "-")
renderjson.set_show_to_level(1)

let inspecting
let inspector
window.DEBUGUTILS_REFRESH = false

window.addEventListener("load", function () {
  inspector = document.getElementById("debugjson")
})

let lastTime = 0
function refresh(time) {
  if (inspecting && window.DEBUGUTILS_REFRESH && time - lastTime > (1 / 15) * 1000) {
    if (inspector) {
      inspector.innerHTML = ""
      inspector.appendChild(renderjson(inspecting))
      requestAnimationFrame(refresh)
    }
    lastTime = time
  }
}

export function inspect(obj, depth = 1, time = 60 * 1000) {
  if (!window.DEBUGGING) {
    return
  }

  inspecting = obj
  lastTime = 0
  window.DEBUGUTILS_REFRESH = true

  renderjson.set_show_to_level(depth)
  refresh(1000)

  setTimeout(stopInspecting, time)
}

export function stopInspecting(obj) {
  inspecting = null
  inspector.innerHTML = ""
  lastTime = 0
}

document.getElementById("debug").style.visibility = "hidden"
document.getElementById("debugjson").style.visibility = "hidden"

document.addEventListener("keydown", function (e) {
  if (e.code == "KeyZ") {
    window.DEBUGGING = true
    document.getElementById("debug").style.visibility = "visible"
    document.getElementById("debugjson").style.visibility = "visible"
  }
})

document.addEventListener("keydown", function (e) {
  if (e.code == "KeyX") {
    window.DEBUGGING = true
    window.DEBUGUTILS_REFRESH = false
    document.getElementById("debug").style.visibility = "hidden"
    document.getElementById("debugjson").style.visibility = "hidden"
  }
})
