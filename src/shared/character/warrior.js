import Character from "./base"

export default class Warrior extends Character {
  name = "Conan, the Bar-... Warrior"
  hp = 6000
  damage = Math.random() * 5 * 1000
  movement = 4
  damageResist = 0.2
  attackRange = 1
  attackName = "CONAN SMAAASH"
  initiative = 5
  points = 0
  influencePos = 10
  influenceDiag = 4
  movedThisRound = false
}
