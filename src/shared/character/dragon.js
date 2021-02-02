import Character from "./base"

export default class Dragon extends Character {
  name = "Trogdor, the Burninator"
  hp = 7000
  damage = Math.random() * 5 * 1000
  movement = 7
  attackRange = 5
  attackName = "Burninate!"
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
