import Character from "./base"

export default class Dragon extends Character {
  name = "Trogdor, the Burninator"
  hp = 7000
  damage = Math.random() * 5 * 1000
  movement = 7
  attackRange = 5
  damageResist = -0.3
  initiative = 2
  points = 0
  influencePos = 10
  influenceDiag = 4
}
