import Character from "./base"

export default class Warrior extends Character {
  name = "Conan, the Bar-... Warrior"
  shortCode = "Wa"
  modelName = "Warrior.glb"
  hp = 6000
  damage = Math.random() * 5 * 1000
  movement = 4
  damageResist = 0.2
  attackRange = 1
  attackName = "CONAN SMAAASH"
  sounds = {
    swordAtk: [sounds.sword0, sounds.sword1, sounds.sword2],
  }
  initiative = 5
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
