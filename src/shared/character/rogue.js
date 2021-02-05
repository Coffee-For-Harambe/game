import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Rogue extends Character {
  name = "Xavier, the Shadow Maw"
  shortCode = "Ro"
  modelName = "Rogue.glb"
  hp = 4500
  movement = 7
  attackRange = 1
  attackName = "Slice and Dice!"
  animations = {
    attack: "Dager_Attack", //Dagger_Attack2
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
