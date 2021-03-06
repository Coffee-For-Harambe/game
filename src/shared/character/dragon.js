import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Dragon extends Character {
  name = "Trogdor, the Burninator"
  shortCode = "Dr"
  modelName = "Dragon.glb"
  hp = 10000
  movement = 6
  attackRange = 4
  attackName = "Burninate!"
  sounds = {
    footstep: [sounds.flap],
    attack: [sounds.dGrowl0, sounds.dGrowl1],
    ouch: [sounds.sGroan0, sounds.sGroan1, sounds.sGroan2],
  }
  maxDamage = 1750
  minDamage = 750
  animations = {
    damage: "Hit",
    walk: "Idle",
    attack: "Attack",
    idle: "Idle",
    death: "Death",
  }
  damageResist = 0.3
  initiative = 2
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
