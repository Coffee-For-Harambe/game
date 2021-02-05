import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Warrior extends Character {
  name = "Conan, the Bar-... Warrior"
  shortCode = "Wa"
  modelName = "Warrior.glb"
  hp = 6000
  damage = damage()
  movement = 4
  damageResist = 0.2
  attackRange = 1
  attackName = "CONAN SMAAASH"
  sounds = {
    attack: [sounds.sword0, sounds.sword1, sounds.sword2],
    footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
    ouch: [sounds.hit0, sounds.hit1, sounds.hit2],
  }
  animations = {
    attack: "Sword_Attack", // Sword_AttackFast

    idle: "Idle",
    walk: "Walk",
    damage: "ReceiveHit",
  }
  initiative = 5
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
