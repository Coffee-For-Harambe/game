import CharacterDefinition from "../characterdefinition"

export default class Mage extends CharacterDefinition {
  name = "Ishmael, Storm Bender"
  hp = 3500
  damage = (Math.random()*4)*1000
  movement = 5
  attackRange = 6
  damageResist = -.1
  points = 1000
}
