import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import Game from "../../shared/game"
import {
  Model,
  AnimatedModel,
  GridSquare,
  SquareHighlighter,
  CharacterModel,
} from "./model"

import { gridToWorld } from "./3dutils"

import { buildGrid } from "../../shared/gridutils"

export default class Renderer {
  constructor(game) {
    this.game = game
    game.renderer = this

    this.canvas = document.getElementById("canvas")

    this.scene = this.setupScene()

    this.camera = this.setupCamera()
    this.renderer = this.setupRenderer()
    this.setupHDR()

    this.setupGrid()
    this.setupControls()

    window.addEventListener("resize", this.onWindowResize.bind(this))

    window.addEventListener("pointerdown", this.onMouseDown.bind(this), false)
    window.addEventListener("pointerup", this.onMouseUp.bind(this), false)

    this.ring = new SquareHighlighter(this.scene)

    game.update()
    this.redraw()
  }

  render(time) {
    for (let model of this.scene.children) {
      if (model.model) {
        model.model.render(time)
      }
    }

    this.redraw()

    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  redraw() {
    requestAnimationFrame(this.render.bind(this))
  }

  update() {
    Game.Instance.teams.forEach((team) => {
      team.characters.forEach((character) => {
        if (!character.model) {
          character.model = new CharacterModel(character, this.scene)
        }

        character.model.positionToCharacter()
      })
    })
  }

  setupScene() {
    const scene = new THREE.Scene()
    const light = new THREE.AmbientLight(0x404040) // soft white light

    return scene
  }

  setupCamera() {
    // Two different types of camera are setup.
    // const camera = new THREE.OrthographicCamera(-10, 10, 4, -4, 0.1, 1000)
    const camera = new THREE.PerspectiveCamera(
      16, // FOV
      window.innerWidth / window.innerHeight, // Aspect Ratio

      0.75, // zNear
      16000 // zFar
    )

    camera.position.set(-64, 100, 64)

    return camera
  }

  setupRenderer() {
    const renderSettings = {
      canvas: this.canvas,
      antialias: true,
    }

    const renderer = new THREE.WebGLRenderer(renderSettings)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMapping = THREE.LinearToneMapping
    renderer.toneMappingExposure = 1
    renderer.outputEncoding = THREE.sRGBEncoding

    return renderer
  }

  setupHDR() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    pmremGenerator.compileEquirectangularShader()

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load("/images/machine_shop_03_1k.hdr", (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture

        this.scene.background = envMap
        this.scene.environment = envMap

        texture.dispose()
        pmremGenerator.dispose()
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

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()
  onMouseDown(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  onMouseUp(e) {
    const newMouse = new THREE.Vector2()
    newMouse.x = (e.clientX / window.innerWidth) * 2 - 1
    newMouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    if (!newMouse.equals(this.mouse)) {
      return
    }

    this.raycaster.setFromCamera(this.mouse, this.camera)

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children)

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.model instanceof GridSquare) {
        const gridPos = intersects[i].object.model.gridPos
        if (gridPos) {
          Game.Instance.squareClicked({ x: gridPos.x, y: gridPos.y })
        } else {
          Game.Instance.squareClicked()
        }

        break
      }
    }
  }
}
