import {
  Vector3,
  Vector2,
  AnimationMixer,
  AnimationClip,
  TextGeometry,
  Font,
  MeshBasicMaterial,
  Mesh,
  Color,
} from "three"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { gridToWorld, WORLD_SCALE, WORLD_SCALE_V } from "./3dutils"
import Game from "../../shared/game"
import { distanceTo } from "../../shared/gridutils"
import { computePath } from "../../shared/astar"
import { inspect } from "../debugutils"

import droidJSON from "three/examples/fonts/droid/droid_sans_regular.typeface.json"
const font = new Font(droidJSON)

export class Model {
  constructor(src, scene, x, y, fullScene = false) {
    this.pos = new Vector3()
    this.setWorldPos(x, y)
    this.src = src
    this.scene = scene
    this.fullScene = fullScene

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
    this.pos.copy(pos)
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

    if (this.fullScene) {
      this.mesh = model.scene
    } else {
      this.mesh = model.scene.children[0]
    }

    if (this.layer) {
      this.mesh.layers.set(this.layer)
    }

    model.model = this

    this.mesh.model = this
    this.mesh.scale.copy(WORLD_SCALE_V)

    this.scene.add(this.mesh)
    this.mesh.position.copy(this.pos)
  }

  modelLoadProgress(xhr) {
    // console.log("Model", this.src, (xhr.loaded / xhr.total) * 100 + "% loaded")
  }

  modelLoadError(err) {
    console.error("Model couldn't load", this.src, err)
  }
}

export class GridSquare extends Model {
  constructor(scene, x, y) {
    super("Floor_Modular.glb", scene, x, y)
    this.gridPos = { x, y }
    this.setWorldPos(x, y)
  }

  layer = 1

  static Colors = {
    default: new Color(0.181, 0.181, 0.181),
    walkable: new Color(0.044, 0.328, 0.638),
    highlighted: new Color(0.348, 0.348, 0.348),
    attackRange: new Color(0.147, 0, 0),
    attackable: new Color(0.421, 0, 0),
  }

  setPos(pos) {
    if (this.gridPos) {
      pos.y = -(((this.gridPos.y % 2) + (this.gridPos.x % 2)) % 2) * 0.03
    }
    super.setPos(pos)
  }

  modelLoaded(model) {
    super.modelLoaded(model)
  }

  render(time) {
    const state = Game.Instance.state
    const selected = state.selectedCharacter

    let col = GridSquare.Colors.default
    if (Game.Instance.renderer.blockInput) {
      this.mesh.material.color.set(col)
      return
    }

    if (selected) {
      const start = selected.pos
      const dist = distanceTo(start, this.gridPos)
      const standingOnUs = Game.Instance.characterGrid[this.gridPos.y][this.gridPos.x]

      if (
        state.turnStage == "Moving" &&
        dist <= selected.movement &&
        (!standingOnUs || standingOnUs != selected)
      ) {
        col = GridSquare.Colors.walkable
      } else if (state.turnStage == "Attacking" && dist <= selected.attackRange) {
        if (standingOnUs) {
          if (standingOnUs.team !== selected.team) {
            col = GridSquare.Colors.attackable
          }
        } else {
          col = GridSquare.Colors.attackRange
        }
      }
    }

    const hovered = Game.Instance.state.hovered
    if (hovered && hovered.x == this.gridPos.x && hovered.y == this.gridPos.y) {
      col = col.clone().multiplyScalar(1.35)
    }
    this.mesh.material.color.set(col)
  }

  enableCoordinates() {
    if (!this.coordinates) {
      const text = new TextGeometry(`(${this.gridPos.x}, ${this.gridPos.y})`, {
        font,
        size: WORLD_SCALE / 3,
        height: 0.1,
      })

      text.computeBoundingBox()

      const centerOffsetX = -0.5 * (text.boundingBox.max.x - text.boundingBox.min.x)

      const centerOffsetZ = -0.5 * (text.boundingBox.max.z - text.boundingBox.min.z)

      const textMesh = new Mesh(text, new MeshBasicMaterial({ color: 0xffffff }))

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
    this.mesh.rotation.set(0, ((Math.floor(Math.random() * 4) * 90) / 360) * Math.PI * 2, 0)
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

  animate(time) {
    return false
  }
}

export class SquareHighlighter extends AnimatedModel {
  constructor(scene) {
    super("Swoosh.glb", scene, 0, 0)
    this.lastPos = null
    this.shouldShow = false
  }

  modelLoaded(model) {
    super.modelLoaded(model)
    this.mesh.visible = false
  }

  render(time) {
    super.render(time)

    const square = Game.Instance.state.selectedCharacter?.pos
    if (square != this.lastPos) {
      this.playAnimation("Swoosh")
      this.lastPos = square
      if (square) {
        this.setWorldPos(square.x, square.y)
        this.shouldShow = true
      } else {
        this.shouldShow = false
      }
    }

    this.mesh.visible = this.shouldShow && !Game.Instance.renderer.blockInput
  }
}

export class CharacterModel extends AnimatedModel {
  constructor(character, scene) {
    super(character.modelName, scene, 0, 0)
    this.character = character
    character.model = this

    this.lastCharacterPos = new Vector2(0, 0)
    this.targetPos = null

    this.movementQueue = []

    this.movementSpeed = 1
  }

  modelLoaded(model) {
    super.modelLoaded(model)
    this.playAnimation("Idle")
    if (this.character.pos.y > 7) {
      this.mesh.rotation.set(0, Math.PI, 0)
    }

    this.setPos(gridToWorld(this.character.x, this.character.y))
    this.lastCharacterPos = this.character.pos.clone()
  }

  render(time) {
    super.render(time)

    if (this.character.hp < 0) {
      // AND NOT IS PLAYING DYING ANIMATION
      this.shouldRemove = true
    }
  }

  face(square) {
    let target = Math.atan2(square.x - this.pos.x, -square.y + this.pos.y)
    if (target - this.mesh.rotation > Math.PI) {
      target -= Math.PI
    }

    this.wantsTargetYaw = target
  }

  animate(time) {
    super.animate(time)

    if (!this.character.pos.equals(this.lastCharacterPos)) {
      inspect(this)
      this.movementQueue = computePath(
        this.lastCharacterPos.clone(),
        this.character.pos.clone(),
        this.character
      )
      this.lastCharacterPos = this.character.pos.clone()
      // Replace with character.calculatePath
    }

    if (!this.targetPos && this.movementQueue.length) {
      const pos = this.movementQueue.shift()
      this.targetPos = gridToWorld(pos.x, pos.y)
      this.startingPos = this.pos.clone()
      this.movementStart = time
      this.face(pos.x, pos.y)
    }

    if (this.wantsTargetYaw) {
      this.wantsTargetYaw = null

      this.yawStart = time
      this.startingYaw = this.mesh.rotation.y
      this.targetYaw = this.wantsTargetYaw
    }

    let isAnimating = false
    if (this.targetPos) {
      const elapsed = Math.min(1, (time - this.movementStart) / 1000 / this.movementSpeed)
      const toMove = this.targetPos.clone().sub(this.startingPos.clone()).multiplyScalar(elapsed)
      this.setPos(toMove.add(this.startingPos))

      if (this.pos.equals(this.targetPos)) {
        this.targetPos = null
      }

      isAnimating = true
    }

    if (this.targetYaw) {
      const elapsed = Math.min(1, (time - this.yawStart) / 1000 / this.movementSpeed)
      const toRotate = (this.targetYaw - this.startingYaw) * elapsed

      const rot = this.mesh.rotation
      this.mesh.rotation.set(rot.x, toRotate, rot.z)

      if (this.targetYaw == rot.y) {
        this.targetYaw = null
      }

      isAnimating = true
    }

    return isAnimating
  }
}
