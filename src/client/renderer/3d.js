import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

import Game from "../../shared/game"
import { Model, AnimatedModel, GridSquare } from "./model"
import { buildZeroGrid } from "../../shared/gridutils"

export default class Renderer {
  constructor(game) {
    this.game = game

    this.canvas = document.getElementById("canvas")

    this.scene = this.setupScene()

    this.camera = this.setupCamera()
    this.renderer = this.setupRenderer()
    this.setupHDR()

    this.setupGrid()
    this.setupControls()

    window.addEventListener("resize", this.onWindowResize.bind(this))

    window.addEventListener("pointerdown", this.onMouseDown.bind(this), false)

    const plight = new THREE.PointLight(0xffffff, 1, 100)
    plight.position.set(5, 5, 5)
    this.scene.add(plight)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    const scale = new THREE.Vector3(3, 0.01, 3)
    cube.scale.copy(scale)
    this.scene.add(cube)

    this.ring = new AnimatedModel("/3d/Swoosh.glb", this.scene, 0, 0)
    this.ring.setWorldPos(1, 1)
    this.ring.onModelLoaded(() => {
      this.ring.playAnimation("Swoosh")
    })

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
      0.1, // zNear
      1000 // zFar
    )

    camera.position.z = 5

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

    renderer.toneMapping = THREE.ACESFilmicToneMapping
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

    this.controls = controls
  }

  setupGrid() {
    this.grid = buildZeroGrid()
    this.linearGrid = []

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const square = new GridSquare(this.scene, x, y)
        this.grid[y][x] = square
        this.linearGrid.push(square)
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

    this.raycaster.setFromCamera(this.mouse, this.camera)

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children)

    console.log(intersects)
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.model instanceof GridSquare) {
        const gridPos = intersects[i].object.model.gridPos
        Game.Instance.selectSquare(gridPos)
        this.ring.setWorldPos(gridPos.x, gridPos.y)
        break
      }
      // intersects[i].object.material.color.set(0xff0000)
      // console.log
    }
  }
}

/*
const plight = new THREE.PointLight(0xffffff, 1, 100)
plight.position.set(5, 5, 5)
scene.add(plight)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
const scale = new THREE.Vector3(3, 0.01, 3)
cube.scale.copy(scale)
scene.add(cube)
*/
