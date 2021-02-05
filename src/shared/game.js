import Team from "./team"
import Character from "./character"
import { buildGrid } from "./gridutils"

export default class Game {
  constructor() {
    this.state = {
      teamsTurn: 0,
      selectedCharacter: null,
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

  getOpposingTeam(team) {
    if (team == this.teams[0]) {
      return this.teams[1]
    } else if (team == this.teams[1]) {
      return this.teams[0]
    }
  }

  resetTurnState() {
    this.state.selectedCharacter = null
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
    console.log("Next teams turn")
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
    let clicked

    const state = this.state
    const selected = state.selectedCharacter

    if (square) {
      x = square.x
      y = square.y
      clicked = this.characterGrid[y][x]
    }

    if (state.turnStage == "Moving") {
      if (clicked && clicked.team == this.getActiveTeam()) {
        state.selectedCharacter = clicked
      } else if (selected !== null) {
        if (square == null) {
          state.selectedCharacter = null
        } else {
          if (selected.canReach(square)) {
            if (!clicked) {
              selected.moveSprite(square)

              let canAttack = false
              for (let potentialEnemy of selected.getOpposingTeam().characters) {
                if (selected.canReachAttack(potentialEnemy.pos)) {
                  canAttack = true
                  break
                }
              }

              if (canAttack) {
                state.turnStage = "Attacking"
              } else {
                this.advanceTurn()
              }
            } else if (selected.canReachAttack(square)) {
              selected.attack(clicked)
              this.advanceTurn()
            }
          } else {
            alert("You can't reach that")
          }
        }
      }
    } else if (state.turnStage == "Attacking") {
      if (!square || !clicked || clicked.team == this.getActiveTeam()) {
        if (confirm("Are you sure you want to end your turn without attacking?")) {
          this.advanceTurn()
        }
      } else {
        if (selected.canReachAttack(square)) {
          selected.attack(clicked)
          this.advanceTurn()
        } else {
          alert("You wiff, Serr! Your attacks can't reach that! :(")
        }
      }
    }

    //RESET STATE//
  }
}
