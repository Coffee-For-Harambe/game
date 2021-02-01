import CharacterDefinition from "../characterdefinition"

export default class Skeleton extends CharacterDefinition {
  name = "Revenant"
  hp = 3000
  damage = (Math.random()*3)*1000
  movement = 8
  attackRange = 1
  damageResist = -.10
  initiative = 1
  points = 0
  influencePos = 0
  influenceDiag = 0
}