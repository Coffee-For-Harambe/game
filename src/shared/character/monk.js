import Character from "./base"

export default class Monk extends Character {
  name = "Vasily, Fist Whisperer"
  hp = 4500
  damage = Math.random() * 5 * 1000
  movement = 6
  damageResist = 0.15
  attackRange = 1
  attackName = "Knuckle Flurry"
  attackSound = "sound"
  damageSound = "sound"
  initiative = 4
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
