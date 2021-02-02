export default class Character {
  name = "Basic Character"
  shortCode = "??"
  modelName = "Skeleton.glb"
  hp = 5000
  damage = 3000
  movement = 5
  attackRange = 5
  attackName = "Splash"
  attackSound = "sound"
  damageSound = "sound"
  damageResist = -0.3
  initiative = 2
  points = 0
  influencePos = 0
  influenceDiag = 0
  characterSelected = false
  actionPoints = 2
  movedThisRound = false
  attackedThisRound = false
  renderer = null

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  setTeam(team) {
    this.team = team
    this.game = team.game
  }

  setRenderer(renderer) {
    this.renderer = renderer
  }

  whoAmI() {
    console.log(
      this.name,
      this.x,
      this.y,
      this.hp,
      this.movedThisRound
      // this.active,
      // this.turn
    )
  }
  selected() {
    console.log(whoAmI)
  }

  receiveDamage(damage) {
    this.hp -= damage - damage * this.damageResist
    let audio = new Audio(this.damageSound)
    audio.play()
  }

  attack(targetCharacter) {
    console.log("attack")
    targetCharacter.receiveDamage(this.damage)
    let audio = new Audio(this.damageSound)
    audio.play()
  }

  moveSprite(x, y) {
    this.y = y
    this.x = x
    this.game.update()
  }

  characterCanReach(square) {
    const ourPos = game.state.selectedSquare
    //is distanceTo <= this.character.movement
    let distance = distanceTo(square, ourPos)
    if (distance <= this.movement) {
      moveSprite()
    } else {
      alert("Impassible! Try clicking on a higlighted square.")
    }
  }

  characterCanAttack(square) {
    const ourAtt = game.state.selectedsquare
    let distance = attackTo(square, ourAtt)
    if (distance <= this.attackRange) {
      attack()
    } else {
      alert("You cannot attack that! Find something closer.")
    }
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
