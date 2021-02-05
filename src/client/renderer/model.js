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
  Euler,
  Quaternion,
} from "three"

import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { gridToWorld, worldToGrid, WORLD_SCALE, WORLD_SCALE_V } from "./3dutils"
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
      this.model.scene.traverse((obj) => {
        obj.castShadow = true
        obj.receiveShadow = true
      })
    } else {
      this.mesh = model.scene.children[0]
      this.mesh.castShadow = true
      this.mesh.receiveShadow = true
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
        if (standingOnUs && standingOnUs.team != selected.team && dist <= selected.attackRange) {
          col = GridSquare.Colors.attackable
        } else {
          col = GridSquare.Colors.walkable
        }
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

  playAnimation(anim, additive = false, loop = true) {
    this.lastDraw = 0
    if (!additive) {
      this.mixer.stopAllAction()
    }

    const clip = AnimationClip.findByName(this.model.animations, anim)
    if (clip) {
      const action = this.mixer.clipAction(clip)
      if (additive) {
        if (!loop) {
          action.setLoop(THREE.LoopOnce, 1)
          action.clampWhenFinished = false
        }
        if (this.action) {
          if (this.additiveAction) {
            this.additiveAction.stop()
          }
          action.fadeIn(0.3)
          this.additiveAction = action
        } else {
          action.play()
        }
      } else {
        this.mixer.stopAllAction()
        this.action = action
      }
      action.play()
    } else {
      console.log("Animation not found on model:", anim, this.src)
    }
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
    if (!square) {
      this.lastPos = null
      this.shouldShow = false
    } else if (!this.lastPos || !square.equals(this.lastPos)) {
      this.playAnimation("Swoosh")
      if (square) {
        this.lastPos = square.clone()
        this.setWorldPos(square.x, square.y)
        console.log("WetWorldPos", square, this.pos)
        this.shouldShow = true
      } else {
        this.lastPos = null
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

    // this.lastCharacterPos = new Vector2(0, 0)
    this.targetPos = null

    this.movementQueue = []

    this.movementSpeed = 0.7

    this.createHPBar()
  }

  modelLoaded(model) {
    super.modelLoaded(model)
    this.playAnimation(this.character.animations.idle)
    if (this.character.pos.y > 7) {
      this.mesh.rotation.set(0, Math.PI, 0)
    }

    this.setPos(gridToWorld(this.character.x, this.character.y))
    this.lastCharacterPos = this.character.pos.clone()
  }

  render(time) {
    super.render(time)
    this.updateHP()
  }

  face(square) {
    const pos = worldToGrid(this.pos)
    let target = Math.atan2(square.x - pos.x, square.y - pos.y)
    this.wantsTargetYaw = new Quaternion().setFromEuler(new Euler(0, target, 0))
  }

  animate(time) {
    super.animate(time)
    if (!this.lastCharacterPos) {
      return
    }

    if (this.character.hp < 0) {
      if (!this.isDying) {
        this.isDying = true
        this.playAnimation(this.character.animations.death)
        setTimeout(() => (this.shouldRemove = true), 1000)
      }
      return true
    }

    if (!this.character.pos.equals(this.lastCharacterPos)) {
      inspect(this)
      this.playAnimation(this.character.animations.walk)
      this.movementQueue = computePath(
        this.lastCharacterPos.clone(),
        this.character.pos.clone(),
        this.character
      )
      this.lastCharacterPos = this.character.pos.clone()
    }

    if (!this.targetPos && this.movementQueue.length) {
      const pos = this.movementQueue.shift()
      this.targetPos = gridToWorld(pos.x, pos.y)
      this.startingPos = this.pos.clone()
      this.face(pos)
    }

    if (this.wantsTargetYaw) {
      this.yawStart = time
      this.startingYaw = this.mesh.quaternion.clone()
      this.targetYaw = this.wantsTargetYaw

      this.wantsTargetYaw = null
    }

    if (this.targetYaw) {
      const elapsed = Math.min(1, (time - this.yawStart) / 1000 / (this.movementSpeed / 2))

      this.mesh.quaternion.copy(this.startingYaw)
      this.mesh.quaternion.slerp(this.targetYaw, elapsed)

      if (elapsed == 1 || this.mesh.quaternion.dot(this.targetYaw) > 0.999) {
        this.targetYaw = null
        this.yawStart = null
      } else {
        return true
      }
    }

    if (this.targetPos) {
      if (!this.movementStart) {
        this.movementStart = time
      }

      const elapsed = Math.min(1, (time - this.movementStart) / 1000 / this.movementSpeed)
      const toMove = this.targetPos.clone().sub(this.startingPos.clone()).multiplyScalar(elapsed)
      this.setPos(toMove.add(this.startingPos))
      if (elapsed == 1) {
        this.targetPos = null
        this.movementStart = null
        this.startingGridPos = null

        if (!this.movementQueue.length) {
          this.playAnimation(this.character.animations.idle)
        }
      }

      return true
    }

    return false
  }

  createHPBar() {
    // const hp = {}
    // this.hpbar = hp
    // hp.canvas = document.createElement("canvas")
    // hp.ctx = canvas.getContext("2d")
    // hp.texture = new THREE.CanvasTexture(canvas)
    // hp.canvas.width = 56
    // hp.canvas.height = 7
    // hp.img_100 = new Image("/images/hp_full.png")
    // hp.img_0 = new Image("/images/hp_empty.png")
  }

  updateHP() {
    if (this.lasthp != this.character.hp) {
      let diff = 0
      if (this.lasthp) {
        diff = this.lasthp - this.character.hp
      }
      this.lasthp = this.character.hp

      // const ctx = hp.ctx
      // const cw = canvas.width, ch = canvas.height
      // ctx.clear(0, 0, cw, ch)

      const hpPct = (this.character.hp / this.character.maxhealth) * 100
      const dmgIndicator = diff > 0 ? `<div class="dmgindicator">-${diff}</div>` : ""

      const html = `
        <div class="charoverlay">
          <div class="hpbar">
            <div class="hp" style="width: ${hpPct}%"></div>
          </div>
          ${dmgIndicator}
        </div>
      `

      if (!this.hpoverlay) {
        this.hpoverlay = document.createElement("div")
        this.hpsprite = new CSS3DSprite(this.hpoverlay)
        this.hpsprite.scale.set(0.25 / 4, 0.25 / 4, 0.25 / 4)
        // this.hpsprite.position.set(0, -0.05 * WORLD_SCALE, 0)
        this.hpsprite.position.set(0, 3.5, 0)
        this.mesh.add(this.hpsprite)
      }

      this.hpoverlay.innerHTML = html
    }
  }
}
