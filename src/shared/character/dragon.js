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
    flap: [sounds.flap],
    dGrowl: [sounds.dGrowl0, sounds.dGrowl1],
  }
  attackSound = "sound"
  damageSound = "sound"
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
