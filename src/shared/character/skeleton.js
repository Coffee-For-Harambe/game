import Character from "./base"

export default class Skeleton extends Character {
  name = "Revenant"
  hp = 3000
  damage = Math.random() * 3 * 1000
  movement = 8
  attackRange = 1
  attackName = "Bash and Slash"
  attackSound = "sound"
  damageResist = -0.1
  initiative = 1
  points = 0
  influencePos = 10
  influenceDiag = 4
  movedThisRound = false
  attackedThisRound = false
}
