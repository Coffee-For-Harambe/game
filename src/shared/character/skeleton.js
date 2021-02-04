import Character from "./base"

export default class Skeleton extends Character {
  name = "Revenant"
  shortCode = "Sk"
  modelName = "Skeleton.glb"
  hp = 3000
  damage = Math.random() * 3 * 1000
  movement = 8
  attackRange = 1
  attackName = "Bash and Slash"
  sounds = {
    sGroan: [sounds.sGroan0, sounds.sGroan1, sounds.sGroan2],
  }
  damageResist = -0.1
  initiative = 1
  points = 0
  influencePos = 10
  influenceDiag = 4
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
}
