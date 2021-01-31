import CharacterDefinition from "../characterdefinition"

export default class Rogue extends CharacterDefinition {
  name = "Xavier, the Shadow Maw"
  hp = 3500
  damage = ((Math.random()*3)*1000)*2
  movement = 7
  attackRange = 
  damageResist = -.5
  initiative  = 1
  points = 1000
}