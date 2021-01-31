import CharacterDefinition from "../characterdefinition"

export default class Dragon extends CharacterDefinition {
  name = "Methuul, the Burninator"
  hp = 7000
  damage = (Math.random()*5)*1000
  movement = 7
  attackRange = 5
  damageResist = -.3
  initiative = 2
  points = -1
}