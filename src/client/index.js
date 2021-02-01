/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

/*
import confetti from "canvas-confetti"
confetti?.create(document.getElementById("canvas2"), {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 })
*/

import "../shared/index"

import Renderer from "./renderer/3d"

window.RENDERER = new Renderer(window.GAME)
