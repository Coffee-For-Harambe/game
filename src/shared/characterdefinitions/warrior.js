import CharacterDefinition from "../characterdefinition"

export default class Warrior extends CharacterDefinition {
    name = "Conan, the Bar-... Warrior"
    hp = 6000
    damage = (Math.random() *5)*1000
    movement = 4
    damageResist = .2
    attackRange = 1
    initiative = 5
    points = 1000
}