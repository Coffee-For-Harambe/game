import CharacterDefinition from "../characterdefinition"

export default class Ranger extends CharacterDefinition {
  name = "Santi, of The Post Wood"
  hp = 4000
  damage = (Math.random(0*4))*1000
  movement = 5
  attackRange = 5
  damageResist = 0
  initiative = 2
  points = 1000
}