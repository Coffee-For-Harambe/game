import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

class Renderer {
  constructor() {
    this.canvas = document.getElementById("canvas")

    this.scene = this.setupScene()

    this.setupCamera()
    this.renderer = this.setupRenderer()
    this.setupHDR()

    this.setupGrid()

    window.addEventListener("resize", this.onWindowResize.bind(this))

    window.addEventListener("pointerdown", this.onMouseDown.bind(this), false)

    redraw()
  }

  render() {
    renderer.render(scene, camera)
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
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
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
      .load("images/machine_shop_03_1k.hdr", function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture

        scene.background = envMap
        scene.environment = envMap

        texture.dispose()
        pmremGenerator.dispose()
      })
  }

  setupControls() {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
  }

  setupGrid() {}

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
    const intersects = raycaster.intersectObjects(this.scene.children)

    console.log(intersects)
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000)
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
