import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Dragon extends Character {
  name = "Trogdor, the Burninator"
  shortCode = "Dr"
  modelName = "Dragon.glb"
  hp = 7000
  damage = Math.random() * 5 * 1000
  movement = 7
  attackRange = 5
  attackName = "Burninate!"
  sounds = {
    footstep: [sounds.flap],
    attack: [sounds.dGrowl0, sounds.dGrowl1],
  }
  animations = {
    damage: "Hit",
    walk: "Idle",
    attack: "Attack",
    idle: "Idle",
  }
  damageResist = -0.3
  initiative = 2
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
