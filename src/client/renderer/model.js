import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

class Model {
  constructor(src, scene) {
    super()

    this.src = src
    this.scene = scene

    this.loader = new GLTFLoader()

    loader.load(
      src,
      this.modelLoaded.bind(this),
      this.modelLoadProgress.bind(this),
      this.modelLoadError.bind(this)
    )
  }

  render(time) {}

  modelLoaded(model) {
    scene.add(model.scene)
    this.model = gltf

    model.model = this

    this.mesh = model.scene.children[0]
  }

  modelLoadProgress(xhr) {
    console.log("Model", this.src, (xhr.loaded / xhr.total) * 100 + "% loaded")
  }

  modelLoadError(err) {
    console.err("Model couldn't load", this.src, err)
  }
}

class Animated extends Model {
  constructor(src, scene) {
    super(src, scene)
  }

  modelLoaded(model) {
    super(model)
    this.mixer = new THREE.AnimationMixer(this.mesh)
  }

  lastDraw = 0
  render(time) {
    super(time)
    if (this.lastDraw == 0) {
      this.lastDraw = time
    }

    this.mixer.update((time - this.lastDraw) / 1000)
    this.lastDraw = time
  }

  playAnimation(anim) {
    this.lastDraw = 0
    this.mixer.stopAllAction()

    const clip = THREE.AnimationClip.findByName(this.clips, anim)
    this.action = this.mixer.clipAction(clip)
    this.action.play()
  }
}
