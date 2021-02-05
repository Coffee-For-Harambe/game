import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Skeleton extends Character {
  name = "Revenant"
  shortCode = "Sk"
  modelName = "Skeleton.glb"
  hp = 3000
  damage = damage()
  movement = 8
  attackRange = 1
  attackName = "Bash and Slash"
  sounds = {
    ouch: [sounds.sGroan0, sounds.sGroan1, sounds.sGroan2],
    attack: [sounds.swish0, sounds.swish1, sounds.swish2, sounds.swish3],
    footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
  }
  animations = {
    walk: "Running",
    damage: "Spawn",
    idle: "Idle",

    attack: "Attack",
  }
  damageResist = -0.1
  initiative = 1
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
