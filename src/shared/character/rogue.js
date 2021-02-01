import Character from "./base"

export default class Rogue extends Character {
  name = "Xavier, the Shadow Maw"
  hp = 3500
  damage = Math.random() * 3 * 1000 * 2
  movement = 7
  attackRange = 1
  attackName = "Slice and Dice!"
  attackSound = "sound"
  damageSound = "sound"
  damageResist = -0.5
  initiative = 1
  points = 0
  influencePos = 10
  influenceDiag = 4
  movedThisRound = false
  attackedThisRound = false
}
