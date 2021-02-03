import {
  Vector3,
  AnimationMixer,
  AnimationClip,
  TextGeometry,
  Font,
  MeshBasicMaterial,
  Mesh,
} from "three"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { gridToWorld, WORLD_SCALE, WORLD_SCALE_V } from "./3dutils"
import Game from "../../shared/game"

import droidJSON from "three/examples/fonts/droid/droid_sans_regular.typeface.json"
const font = new Font(droidJSON)

export class Model {
  constructor(src, scene, x, y) {
    this.setWorldPos(x, y)
    this.src = src
    this.scene = scene

    this.loader = new GLTFLoader()

    this.loader.load(
      "/3d/" + src,
      this.modelLoaded.bind(this),
      this.modelLoadProgress.bind(this),
      this.modelLoadError.bind(this)
    )
  }

  setWorldPos(x, y) {
    this.setPos(gridToWorld(x, y))
  }

  setPos(pos) {
    this.pos = pos
    if (this.mesh) {
      this.mesh.position.copy(this.pos)
      this.mesh.updateMatrix()
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
    this.mesh.scale.copy(WORLD_SCALE_V)

    this.scene.add(this.mesh)
    this.mesh.position.copy(this.pos)
  }

  modelLoadProgress(xhr) {
    // console.log("Model", this.src, (xhr.loaded / xhr.total) * 100 + "% loaded")
  }

  modelLoadError(err) {
    // console.error("Model couldn't load", this.src, err)
  }
}

export class GridSquare extends Model {
  constructor(scene, x, y) {
    super("Floor_Modular.glb", scene, x, y)
    this.gridPos = { x, y }
    this.setWorldPos(x, y)
  }

  setPos(pos) {
    if (this.gridPos) {
      pos.y = -(((this.gridPos.y % 2) + (this.gridPos.x % 2)) % 2) * 0.03
    }
    super.setPos(pos)
  }

  render(time) {}

  enableCoordinates() {
    if (!this.coordinates) {
      const text = new TextGeometry(`(${this.gridPos.x}, ${this.gridPos.y})`, {
        font,
        size: WORLD_SCALE / 3,
        height: 0.1,
      })

      text.computeBoundingBox()

      const centerOffsetX =
        -0.5 * (text.boundingBox.max.x - text.boundingBox.min.x)

      const centerOffsetZ =
        -0.5 * (text.boundingBox.max.z - text.boundingBox.min.z)

      const textMesh = new Mesh(
        text,
        new MeshBasicMaterial({ color: 0xffffff })
      )

      textMesh.position.x = this.pos.x + centerOffsetX
      textMesh.position.y = this.pos.y + 0.5
      textMesh.position.z = this.pos.z + centerOffsetZ

      // textMesh.rotation.x = Math.Pi
      textMesh.rotation.x = -Math.PI / 2

      this.coordinates = textMesh
      this.scene.add(textMesh)
    }
  }

  modelLoaded(model) {
    super.modelLoaded(model)
    this.originalColor = this.mesh.material.color
    this.mesh.rotation.set(
      0,
      ((Math.floor(Math.random() * 4) * 90) / 360) * Math.PI * 2,
      0
    )
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

export class SquareHighlighter extends AnimatedModel {
  constructor(scene) {
    super("Swoosh.glb", scene, 0, 0)
    this.visible = false
    this.lastPos = null
  }

  render(time) {
    const square = Game.Instance.selectedSquare
    if (square !== this.lastPos) {
      this.lastPos = square
      if (square) {
        this.setWorldPos(square.x, square.y)
        this.visible = true
      } else {
        this.visible = false
      }
    }
  }
}

export class CharacterModel extends AnimatedModel {
  constructor(character, scene) {
    super(character.modelName, scene, 0, 0)
    this.character = character
    this.positionToCharacter
  }

  modelLoaded(model) {
    super.modelLoaded(model)
    this.playAnimation("Idle")
  }

  positionToCharacter() {
    this.setWorldPos(this.character.x, this.character.y)
  }

  render(time) {
    super.render(time)

    if (!this.character) {
      return
    }
    if (this.character.health < 0) {
      // AND NOT IS PLAYING DYING ANIMATION
      this.scene.remove(this.mesh)
    }
  }
}
