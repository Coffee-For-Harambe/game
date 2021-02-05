import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Mage extends Character {
  name = "Ishmael, Storm Bender"
  shortCode = "Wz"
  modelName = "Wizard.glb"
  hp = 5500
  movement = 5
  attackRange = 6
  attackName = "Smite-ning"
  sounds = {
    attack: [sounds.zap0, sounds.zap1],
    footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
    ouch: [sounds.hit0, sounds.hit1, sounds.hit2],
  }
  animations = {
    attack: "Staff_Attack", // Spell1, Spell2
    idle: "Idle",
    walk: "Walk",
    damage: "RecieveHit",
    death: "Death",
  }
  damageResist = -0.1
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
