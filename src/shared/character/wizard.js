import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Mage extends Character {
  name = "Ishmael, Storm Bender"
  shortCode = "Wz"
  modelName = "Wizard.glb"
  hp = 3500
  damage = Math.random() * 4 * 1000
  movement = 5
  attackRange = 6
  attackName = "Smite-ning"
  sounds = {
    zap: [sounds.zap0, sounds.zap1],
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
