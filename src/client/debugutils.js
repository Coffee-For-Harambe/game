import renderjson from "./renderjson"

console.log(renderjson)
renderjson.set_icons("+", "-")
renderjson.set_show_to_level(1)

let inspecting
let inspector
window.DEBUGUTILS_REFRESH = true

window.addEventListener("load", function () {
  inspector = document.getElementById("debugjson")
})

function refresh() {
  if (inspecting && window.DEBUGUTILS_REFRESH) {
    requestAnimationFrame(refresh)
    inspector.innerHTML = ""
    inspector.appendChild(renderjson(inspecting))
  }
}

export function inspect(obj, depth = 1, time = 60 * 1000) {
  inspecting = obj
  renderjson.set_show_to_level(depth)
  window.DEBUGUTILS_REFRESH = true
  refresh()
  setTimeout(stopInspecting, time)
}

export function stopInspecting(obj) {
  inspecting = null
  inspector.innerHTML = ""
}
