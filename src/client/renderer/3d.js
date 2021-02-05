import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js"

import { inspect, stopInspecting } from "../debugutils"

import Game from "../../shared/game"
import { Model, AnimatedModel, GridSquare, SquareHighlighter, CharacterModel } from "./model"

import { gridToWorld, WORLD_SCALE } from "./3dutils"

import { buildGrid } from "../../shared/gridutils"

window.THREE = THREE

export default class Renderer {
  constructor(game) {
    this.game = game
    game.renderer = this

    this.canvas = document.getElementById("canvas")
    this.debug = document.getElementById("debug")

    this.scene = this.setupScene()

    this.camera = this.setupCamera()

    this.setupRenderer()
    this.setupHDR()

    this.setupGrid()
    this.setupControls()

    window.addEventListener("resize", this.onWindowResize.bind(this))

    canvas.addEventListener("pointerdown", this.onMouseDown.bind(this), false)
    canvas.addEventListener("pointermove", this.onMouseMoved.bind(this), false)
    canvas.addEventListener("pointerup", this.onMouseUp.bind(this), false)

    this.ring = new SquareHighlighter(this.scene)

    this.scenery = new Model("Scene.glb", this.scene, 0, 0, true)
    this.scenery.onModelLoaded((x) => {
      this.scenery.mesh.frustumCulled = false
      this.scenery.fadable = this.scenery.mesh.getObjectByName("FadableDecor")
    })
    game.update()
    this.redraw()
  }

  lastFrame = 0
  frameInterval = 1000 / 30
  render(time) {
    this.redraw()

    if (time - this.lastFrame < this.frameInterval) {
      return
    }

    this.lastFrame = time

    if (window.DEBUGGING) {
      this.debug.innerHTML = `
      <strong>GAME STATE:</strong>
        <div style="padding-left: 1rem">
          turnStage: ${this.game.state.turnStage}<br/>
          selectedCharacter: ${
            this.game.state.selectedCharacter
              ? this.game.state.selectedCharacter.debugStr()
              : "null"
          }<br/>
          teamsTurn: ${this.game.state.teamsTurn}<br/>
        </div>
      <strong>TEAM1:</strong>
        <div style="padding-left: 1rem">
          ${this.game.teams[0].characters.map((c) => c.debugStr()).join("<br />")}
        </div>
      <strong>TEAM2:</strong>
        <div style="padding-left: 1rem">
          ${this.game.teams[1].characters.map((c) => c.debugStr()).join("<br />")}
        </div>
    `
    }

    const toRemove = []

    let blockInput = false
    this.scene.traverse((obj) => {
      if (obj.model instanceof AnimatedModel) {
        const isAnimating = obj.model.animate(time)
        if (isAnimating) {
          blockInput = true
        }
      }
    })

    // Traverse Scene twice to first determine blockInput and _then_ update
    this.scene.traverse((obj) => {
      if (obj.model instanceof Model) {
        obj.model.render(time)

        if (obj.model.shouldRemove) {
          toRemove.push(obj)
        }
      }
    })

    this.blockInput = blockInput

    for (let obj of toRemove) {
      this.scene.remove(obj)
      this.game.update()
    }

    const dir1 = this.controls.target.clone().sub(this.camera.position.clone()).normalize()

    // TODO: Don't fade on elevated Y axis difference unless it also occludes
    const pos = new THREE.Vector3()
    if (this.scenery.fadable) {
      this.scenery.fadable.traverse((obj) => {
        if (obj.material) {
          obj.material.transparent = true
          obj.getWorldPosition(pos)
          obj.material.opacity =
            1 - Math.pow(this.controls.target.clone().sub(pos.clone()).normalize().dot(dir1), 3)
        }
      })
    }

    this.renderer.render(this.scene, this.camera)
    this.cssrenderer.render(this.scene, this.camera)
    this.controls.update()
  }

  redraw() {
    requestAnimationFrame(this.render.bind(this))
  }

  update() {
    this.game.teams.forEach((team) => {
      team.characters.forEach((character) => {
        if (!character.model) {
          character.model = new CharacterModel(character, this.scene)
        }
      })
    })
  }

  setupScene() {
    const scene = new THREE.Scene()

    return scene
  }

  setupCamera() {
    // Two different types of camera are setup.
    // const camera = new THREE.OrthographicCamera(-10, 10, 4, -4, 0.1, 1000)
    const camera = new THREE.PerspectiveCamera(
      16, // FOV
      window.innerWidth / window.innerHeight, // Aspect Ratio

      1, // zNear
      16000 // zFar
    )

    camera.position.set(807, 889, 912)
    camera.layers.enable(1)
    camera.layers.enable(2)

    return camera
  }

  setupRenderer() {
    const cssrenderer = new CSS3DRenderer()
    this.cssrenderer = cssrenderer

    cssrenderer.domElement.style.position = "fixed"
    cssrenderer.domElement.style.top = 0
    cssrenderer.domElement.style.left = 0
    cssrenderer.domElement.style.bottom = 0
    cssrenderer.domElement.style.right = 0
    cssrenderer.domElement.style.pointerEvents = "none"
    cssrenderer.domElement.id = "cssrenderer"
    document.body.appendChild(cssrenderer.domElement)
    cssrenderer.setSize(window.innerWidth, window.innerHeight)

    const renderSettings = {
      canvas: this.canvas,
      antialias: true,
    }

    const renderer = new THREE.WebGLRenderer(renderSettings)
    this.renderer = renderer

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    renderer.physicallyCorrectLights = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    // renderer.toneMapping = THREE.LinearToneMappina
    renderer.toneMappingExposure = 1
    // renderer.outputEncoding = THREE.LinearEncoding
    renderer.outputEncoding = THREE.sRGBEncoding
  }

  setupHDR() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    pmremGenerator.compileEquirectangularShader()
    // pmremGenerator.compileCubemapShader()

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load("/images/lilienstein_1k.hdr", (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture

        texture.magFilter = THREE.LinearFilter
        texture.needsUpdate = true

        this.scene.background = envMap
        this.scene.environment = envMap
      })
  }

  setupControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.update()

    const center = gridToWorld(15 / 2, 15 / 2)
    controls.target = center

    this.controls = controls
  }

  setupGrid() {
    this.grid = buildGrid()
    this.linearGrid = []

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const square = new GridSquare(this.scene, x, y)
        this.grid[y][x] = square
        this.linearGrid.push(square)
        square.enableCoordinates()
      }
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.cssrenderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  raycaster = new THREE.Raycaster()
  hoverTimerID = null
  onMouseMoved(e) {
    if (this.hoverTimerID) {
      window.clearTimeout(this.hoverTimerID)
    }
    this.hoverTimerID = setTimeout(() => {
      this.hoverTimerID = null
      this.updateHover(e)
    }, 60)
  }

  updateHover(e) {
    this.mouse = null

    const mouse = new THREE.Vector2()
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    this.raycaster.layers.set(1)

    this.raycaster.setFromCamera(mouse, this.camera)

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children)

    for (let i = 0; i < intersects.length; i++) {
      const pos = intersects[i].object?.model?.gridPos
      if (pos) {
        this.game.state.hovered = { x: pos.x, y: pos.y }
        const hasCharacter = this.game.characterGrid[pos.y][pos.x]
        this.canvas.classList.toggle("cursor-pointer", hasCharacter)
        return
      }
    }

    this.game.state.hovered = null
  }

  onMouseDown(e) {
    if (this.blockInput) {
      return
    }

    this.updateHover(e)

    this.mouse = new THREE.Vector2()
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  onMouseUp(e) {
    if (!this.mouse || this.blockInput) {
      return
    }

    this.game.squareClicked(this.game.state.hovered)
    inspect(this.game.state.selectedCharacter)
  }
}
