import { Vector3, AnimationMixer, AnimationClip } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { gridToWorld } from "./3dutils"
import Game from "../../shared/game"

export class Model {
  constructor(src, scene, x, y) {
    this.setWorldPos(x, y)
    this.src = src
    this.scene = scene

    this.loader = new GLTFLoader()

    this.loader.load(
      src,
      this.modelLoaded.bind(this),
      this.modelLoadProgress.bind(this),
      this.modelLoadError.bind(this)
    )
  }

  setWorldPos(x, y) {
    this.pos = gridToWorld(x, y)
    if (this.mesh) {
      this.mesh.position.set(this.pos.x, this.pos.y)
    }
  }

  modelLoadedQueue = []
  render(time) {
    if (this.model && this.modelLoadedQueue.length > 0) {
      this.modelLoadedQueue.forEach((x) => x())
      this.modelLoadedQueue = []
    }
  }

  onModelLoaded(fn) {
    if (this.model) {
      fn()
    } else {
      this.modelLoadedQueue.push(fn)
    }
  }

  modelLoaded(model) {
    this.model = model

    model.model = this

    this.mesh = model.scene.children[0]
    this.mesh.model = this

    this.scene.add(this.mesh)
    this.mesh.position.copy(this.pos)
  }

  modelLoadProgress(xhr) {
    console.log("Model", this.src, (xhr.loaded / xhr.total) * 100 + "% loaded")
  }

  modelLoadError(err) {
    console.error("Model couldn't load", this.src, err)
  }
}

export class GridSquare extends Model {
  constructor(scene, x, y) {
    super("/3d/Floor_Modular.glb", scene, x, y)
    this.gridPos = { x, y }
  }

  render(time) {}

  modelLoaded(model) {
    super.modelLoaded(model)
    this.originalColor = this.mesh.material.color
  }
}

export class AnimatedModel extends Model {
  constructor(src, scene, x, y) {
    super(src, scene, x, y)
  }

  modelLoaded(model) {
    super.modelLoaded(model)
    this.mixer = new AnimationMixer(this.mesh)
  }

  lastDraw = 0
  render(time) {
    super.render(time)
    if (this.lastDraw == 0) {
      this.lastDraw = time
    }

    this.mixer.update((time - this.lastDraw) / 1000)
    this.lastDraw = time
  }

  playAnimation(anim) {
    this.lastDraw = 0
    this.mixer.stopAllAction()

    const clip = AnimationClip.findByName(this.model.animations, anim)
    this.action = this.mixer.clipAction(clip)
    this.action.play()
  }
}
