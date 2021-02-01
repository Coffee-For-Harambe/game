import Character from "./base"

export default class Mage extends Character {
  name = "Ishmael, Storm Bender"
  hp = 3500
  damage = Math.random() * 4 * 1000
  movement = 5
  attackRange = 6
  attackName = "Smite-ning"
  damageResist = -0.1
  points = 0
  influencePos = 10
  influenceDiag = 4
}
