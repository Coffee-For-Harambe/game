import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Ranger extends Character {
  name = "Santi, of The Post Wood"
  shortCode = "Rn"
  modelName = "Ranger.glb"
  hp = 6000
  //Math.random(0 * 4) * 1000
  movement = 5
  attackRange = 5
  maxDamage = 2500
  minDamage = 750
  attackName = "Sure Shot"
  animations = {
    attack: "Bow_Attack_Draw", //Bow_Attack_Shoot
    idle: "Idle",
    walk: "Walk",
    damage: "RecieveHit",
    death: "Death",
  }
  maxDamage = 2000
  minDamage = 500
  damageResist = 0
  initiative = 2
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
