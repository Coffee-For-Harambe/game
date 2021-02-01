import CharacterDefinition from "../characterdefinition"

export default class Monk extends CharacterDefinition {
    name = "Vasily, Fist Whisperer"
    hp = 4500
    damage = (Math.random()*5)*1000
    movement = 6
    damageResist = .15
    attackRange = 1
    initiative = 4
    points = 0
    influencePos = 0
    influenceDiag = 0
}