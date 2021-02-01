import Character from "./character/index.js"

export function createEnemyTeam() {
  return [
    new Character.Dragon(0, 0),
    new Character.Dragon(1, 0),
    new Character.Skeleton(2, 0),
    new Character.Skeleton(3, 0),
    new Character.Skeleton(4, 0),
    new Character.Skeleton(5, 0),
  ]
}

export function createFriendlyTeam() {
  return [
    new Character.Rogue(1, 15),
    new Character.Monk(2, 15),
    new Character.Ranger(3, 15),
    new Character.Warrior(4, 15),
    new Character.Wizard(5, 15),
  ]
}
