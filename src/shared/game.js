import Team from "./team"
import Character from "./character"
import { buildGrid } from "./gridutils"

export default class Game {
  constructor() {
    this.state = {
      teamsTurn: 0,
      selectedCharacter: null,
      selectedSquare: null,
      turnStage: "Moving",
    }

    this.teams = []
    this.teams[0] = new Team([
      new Character.Rogue(1, 15),
      new Character.Monk(4, 15),
      new Character.Ranger(7, 15),
      new Character.Warrior(10, 15),
      new Character.Wizard(13, 15),
    ])

    this.teams[1] = new Team([
      new Character.Skeleton(0, 0),
      new Character.Skeleton(3, 13),
      new Character.Skeleton(7, 0),
      new Character.Dragon(9, 0),

      new Character.Skeleton(13, 0),
      new Character.Skeleton(15, 0),
    ])

    this.teams.forEach((team) => {
      team.setGame(this)
    })

    this.update()
  }

  getCharacterGrid() {
    const grid = buildGrid()
    this.teams.forEach((team) => {
      team.characters.forEach((c) => {
        grid[c.y][c.x] = c
      })
    })

    return grid
  }

  // createInitialState() {}

  resetTurnState() {
    this.state.selectedCharacter = null
    this.state.selectedSquare = null
    this.state.turnStage = "Moving"
  }

  static _Instance = null
  static get Instance() {
    if (!Game._Instance) {
      Game._Instance = new Game()
      window.GAME = Game._Instance
    }

    return Game._Instance
  }

  advanceTurn() {
    this.state.teamsTurn = (this.state.teamsTurn + 1) % this.teams.length
    this.resetTurnState()
    this.update()
  }

  getActiveTeam() {
    return this.teams[this.state.teamsTurn]
  }

  getActiveTurnStage() {
    return this.teams[this.state.turnStage]
  }

  update() {
    this.teams.forEach((team) => team.update())
    this.characterGrid = this.getCharacterGrid()
    if (this.renderer) {
      this.renderer.update()
    }
  }

  // export function distanceTo(v1, v2) {
  //   let distance = v2.y - v1.y + (v2.x - v2.x)
  //   return distance
  // }

  squareClicked(square) {
    let x, y
    if (square !== null) {
      x = square.x
      y = square.y
    }

    if (this.state.selectedCharacter == null) {
      const selected = this.getActiveTeam().teamGrid[y][x]
      if (selected !== 0) {
        this.state.selectedCharacter = selected
        console.log("We picked our character!", selected)
        return
      }
    }

    if (
      this.state.selectedCharacter !== null &&
      this.state.selectedSquare == null &&
      this.state.turnStage == "Moving"
    ) {
      this.state.selectedSquare = square
      if (square == null) {
        this.state.selectedCharacter == null
        return
      } else {
        if (this.state.selectedCharacter.characterCanReach(square) == true) {
          this.state.selectedCharacter.moveSprite(square)
          this.state.turnStage = "Attacking"
          this.state.selectedSquare = null
          return
        } else {
          alert("You cannot reach this! Try moving somewhere highlighted!")
          return
        }
      }
    }

    if (
      this.state.selectedCharacter !== null &&
      this.state.selectedSquare == null &&
      this.state.turnStage == "Attacking"
    ) {
      if (this.state.selectedCharacter.characterCanAttack(square) == true) {
        let enemy = this.characterGrid[y][x]

        if (enemy.team !== this.state.team) {
          this.state.selectedCharacter.attack(enemy)
          this.advanceTurn()
        }
      } else {
        alert(
          "You wiff, Serr! Try targeting some within the attack range this time."
        )
        return
      }
    }

    //RESET STATE//
  }
}
