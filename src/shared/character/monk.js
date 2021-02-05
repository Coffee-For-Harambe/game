import Character from "./base"
import * as sounds from "../../client/sounds"

export default class Monk extends Character {
  name = "Vasily, Fist Whisperer"
  shortCode = "Mo"
  modelName = "Monk.glb"
  hp = 5500
  movement = 6
  damageResist = 0.15
  attackRange = 1
  attackName = "Knuckle Flurry"
  initiative = 4
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
