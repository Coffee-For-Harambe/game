import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5

const canvas = document.getElementById("canvas")
const renderSettings = {
  canvas: canvas,
  antialias: true,
}

const renderer = new THREE.WebGLRenderer(renderSettings)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding

const pmremGenerator = new THREE.PMREMGenerator(renderer)
pmremGenerator.compileEquirectangularShader()

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

/*






*/
const light = new THREE.AmbientLight(0x404040) // soft white light
// scene.add(light)

const plight = new THREE.PointLight(0xffffff, 1, 100)
plight.position.set(5, 5, 5)
// scene.add(plight)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
const scale = new THREE.Vector3(3, 0.01, 3)
cube.scale.copy(scale)
scene.add(cube)

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
// Load a glTF resource

const loader = new GLTFLoader()
loader.load(
  // resource URL
  "/3d/Pug.glb",
  // called when the resource is loaded
  function (gltf) {
    window.gltf = gltf

    scene.add(gltf.scene)
    console.log(gltf.animations)

    gltf.animations // Array<THREE.AnimationClip>
    gltf.scene // THREE.Group
    gltf.scenes // Array<THREE.Group>
    gltf.cameras // Array<THREE.Camera>
    gltf.asset // Object

    // Create an AnimationMixer, and get the list of AnimationClip instances
    let mesh = gltf.scene.children[0]
    const mixer = new THREE.AnimationMixer(mesh)
    const clips = gltf.animations

    // Update the mixer on each frame
    let lastTime = 0
    function update(time) {
      requestAnimationFrame(update)

      mixer.update((time - lastTime) / 1000)
      lastTime = time
    }
    requestAnimationFrame(update)

    // Play a specific animation
    const clip = THREE.AnimationClip.findByName(clips, "Victory")
    const action = mixer.clipAction(clip)
    // action.play()
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened", error)
  }
)

new RGBELoader()
  .setDataType(THREE.UnsignedByteType)
  .load("images/machine_shop_03_1k.hdr", function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture

    scene.background = envMap
    scene.environment = envMap

    texture.dispose()
    pmremGenerator.dispose()
  })

/*
https://hdrihaven.com/hdri/?h=lythwood_room
https://hdrihaven.com/hdri/?h=aft_lounge
https://hdrihaven.com/hdri/?h=wooden_lounge
*/

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  animate()

  console.log("resized idk")
}
window.addEventListener("resize", onWindowResize)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function onMouseDown(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children)

  console.log(intersects)
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000)
  }
}
window.addEventListener("pointerdown", onMouseDown, false)
console.log("peach")
