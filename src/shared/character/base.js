import { buildGrid, distanceTo } from "../gridutils"
import { Vector2 } from "three"
import * as sounds from "../../client/sounds"
import { computePath } from "../astar"

export default class Character {
  name = "Basic Character"
  shortCode = "??"
  modelName = "Skeleton.glb"
  hp = 5000
  damage = this.damage()
  movement = 5
  attackRange = 5
  attackName = "Splash"
  sounds = {
    attack: [sounds.swish0, sounds.swish1, sounds.swish2, sounds.swish3],
    footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
    ouch: [sounds.hit0, sounds.hit1, sounds.hit2],
  }

  animations = {
    idle: "Idle",
    walk: "Walk",
    damage: "RecieveHit",
    attack: "Attack",
    death: "Death",
  }

  damageResist = -0.3
  initiative = 2
  points = 0
  influencePos = 0
  influenceDiag = 0
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
  renderer = null

  constructor(x, y) {
    this.x = x
    this.y = y
    this.pos = new Vector2(x, y)
  }

  setTeam(team) {
    this.team = team
    this.game = team.game
    this.maxhealth = this.hp
  }

  setRenderer(renderer) {
    this.renderer = renderer
  }
  damage() {
    return (Math.floor(Math.random() * 3) + 2) * 1000
  }
  whoAmI() {
    console.log(
      this.name,
      this.x,
      this.y,
      this.hp,
      this.movedThisRound
      // this.active,
      // this.turn
    )
  }

  debugStr() {
    return this.constructor.name + ": " + this.hp + " hp " + this.x + "," + this.y
  }

  selected() {
    console.log(whoAmI)
  }

  receiveDamage(damage) {
    this.hp -= damage - damage * this.damageResist
    let audio = this.sounds.ouch
    if (audio.length) {
      audio = audio[Math.floor(Math.random() * audio.length)]
    }
    audio.play()

    if (this.model) {
      this.model.playAnimation(this.animations.damage, true, false)
    }
  }

  attack(targetCharacter) {
    setTimeout(() => {
      targetCharacter.receiveDamage(this.damage)
    }, 700)

    let audio = this.sounds.attack
    if (audio.length) {
      audio = audio[Math.floor(Math.random() * audio.length)]
    }
    audio.play()

    if (this.model) {
      this.model.face(targetCharacter.pos)
      this.model.playAnimation(this.animations.attack, true, false)
    }
  }

  moveSprite(vec) {
    //vec
    this.y = vec.y //vec.y
    this.x = vec.x //vec.x
    this.pos.copy(vec)
    this.game.update()
  }

  canReach(square) {
    const ourPos = { y: this.y, x: this.x }
    //is distanceTo <= this.character.movement
    let distance = distanceTo(square, ourPos)
    if (distance <= this.movement) {
      const path = computePath(ourPos, square)
      if (path.length > 0 && path.length <= this.movement) {
        return true
      }
    }

    return false
  }

  canReachAttack(square) {
    const ourAtt = { y: this.y, x: this.x }
    let distance = distanceTo(square, ourAtt)
    if (distance <= this.attackRange) {
      return true
    } else {
      return false
    }
  }

  influenceGrid(g) {
    const touchCell = (x, y, influence) => {
      if (x < 0 || y < 0 || x >= g.length || y >= g.length) {
        // Outside of grid bounds
        return
      }

      if (g[y][x] <= 0) {
        // Non-Walkable OR has enemy on it
        return
      }

      if (g[y][x] > 1) {
        // Something else already influenced it, lower it to indicate danger
        g[y][x] = Math.max(g[y][x], influence) - Math.min(g[y][x], influence)
      } else if (g[y][x] < 1) {
        // Cell has already been yoinked too many times, let it stay negative
        g[y][x] = g[y][x] - influence
      } else {
        // Cell is at its default value, give it our influence
        g[y][x] = influence
      }
    }

    const x = this.x,
      y = this.y

    // Top row
    touchCell(x - 1, y - 1, this.influenceDiag)
    touchCell(x, y - 1, this.influencePos)
    touchCell(x + 1, y - 1, this.influenceDiag)

    // Our Row
    touchCell(x - 1, y, this.influencePos)
    g[y][x] = 0 // Set the cell we're standing on to 0
    touchCell(x + 1, y, this.influencePos)

    // Top row
    touchCell(x - 1, y + 1, this.influenceDiag)
    touchCell(x, y + 1, this.influencePos)
    touchCell(x + 1, y + 1, this.influenceDiag)
  }

  getOpposingTeam() {
    return this.team.getOpposingTeam()
  }
}
