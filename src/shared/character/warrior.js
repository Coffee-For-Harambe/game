import Character from "./base"

export default class Warrior extends Character {
  name = "Conan, the Bar-... Warrior"
  shortCode = "Wa"
  hp = 6000
  damage = Math.random() * 5 * 1000
  movement = 4
  damageResist = 0.2
  attackRange = 1
  attackName = "CONAN SMAAASH"
  attackSound = "sound"
  damageSound = "sound"
  initiative = 5
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
