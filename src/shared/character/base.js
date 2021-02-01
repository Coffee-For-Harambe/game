export default class Character {
  constructor(
    name,
    hp,
    damage,
    movement,
    attackRange,
    damageResist,
    initiative,
    points,
    influencePos,
    influenceDiag,
    x,
    y
  ) {
    this.name = name
    this.hp = hp
    this.damage = damage
    this.movement = movement
    this.attackRange = attackRange
    this.damageResist = damageResist
    this.initiative = initiative
    this.points = points
    this.influencePos = influencePos
    this.influenceDiag = influenceDiag
    this.x = x
    this.y = y
  }

  receiveDamage(damage) {
    this.hp -= damage - damage * this.damageResist
  }

  moveSprite() {
    /*https://stackoverflow.com/questions/27532099/moving-chess-pieces-in-native-javascript*/
  }

  influenceGrid(g) {
    const touchCell = (x, y, influence) => {
      if (x < 0 || y < 0 || x >= g.length || y >= g.length) {
        // Outside of grid bounds
        return
      }

      if (g[y][x] <= 0) {
        // Non-Walkable OR has enemy on it
        return
      }

      if (g[y][x] > 1) {
        // Something else already influenced it, lower it to indicate danger
        g[y][x] = Math.max(g[y][x], influence) - Math.min(g[y][x], influence)
      } else if (g[y][x] < 1) {
        // Cell has already been yoinked too many times, let it stay negative
        g[y][x] = g[y][x] - influence
      } else {
        // Cell is at its default value, give it our influence
        g[y][x] = influence
      }
    }

    const x = this.x,
      y = this.y

    // Top row
    touchCell(x - 1, y - 1, this.influenceDiag)
    touchCell(x, y - 1, this.influencePos)
    touchCell(x + 1, y - 1, this.influenceDiag)

    // Our Row
    touchCell(x - 1, y, this.influencePos)
    g[y][x] = 0 // Set the cell we're standing on to 0
    touchCell(x + 1, y, this.influencePos)

    // Top row
    touchCell(x - 1, y + 1, this.influenceDiag)
    touchCell(x, y + 1, this.influencePos)
    touchCell(x + 1, y + 1, this.influenceDiag)
  }
}
