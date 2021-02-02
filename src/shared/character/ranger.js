import Character from "./base"

export default class Ranger extends Character {
  name = "Santi, of The Post Wood"
  shortCode = "Rn"
  hp = 4000
  damage = Math.random(0 * 4) * 1000
  movement = 5
  attackRange = 5
  attackName = "Sure Shot"
  attackSound = "sound"
  damageSound = "sound"
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
