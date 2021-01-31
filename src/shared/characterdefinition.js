export default class CharacterDefinition {
  constructor(health, damage, movement, range, resistance, initiative, points) {
    this.name = ""
    this.health = health
    this.damage = damage
    this.movement = movement
    this.range = range
    this.resistance = resistance
    this.initiative = initiative
    this.points = points
  }
  attack() {
    return this.damage
  }
  receiveDamage(damage) {
    this.health -= damage
  }
}
