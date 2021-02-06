import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Rogue extends Character {
  name = "Xavier, the Shadow Maw"
  shortCode = "Ro"
  modelName = "Rogue.glb"
  hp = 6500
  movement = 7
  attackRange = 1
  attackCount = 2
  maxDamage = 1000
  minDamage = 250
  attackName = "Slice and Dice!"
  animations = {
    attack: "Dagger_Attack", //Dagger_Attack2
    idle: "Idle",
    walk: "Walk",
    damage: "RecieveHit",
    death: "Death",
  }
  damageResist = -0.5
  initiative = 1
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
