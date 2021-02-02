import Team from "./team"
import Character from "./character"

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
      new Character.Monk(2, 15),
      new Character.Ranger(3, 15),
      new Character.Warrior(4, 15),
      new Character.Wizard(5, 15),
    ])

    this.teams[1] = new Team([
      new Character.Skeleton(0, 0),
      new Character.Skeleton(1, 0),
      new Character.Skeleton(2, 0),
      new Character.Dragon(3, 0),
      new Character.Skeleton(4, 0),
      new Character.Skeleton(5, 0),
    ])

    this.teams.forEach((team) => {
      team.setGame(this)
    })
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

  update() {
    this.teams.forEach((team) => team.update())
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
      }
    }

    if (
      this.state.selectedCharacter !== null &&
      this.state.selectedSquare == null
    ) {
      this.state.selectedSquare = square
      if (square == null) {
        this.state.selectedCharacter == null
      } else if (square !== null && this.state.selectedCharacter) {
        moveSprite()
      }
    }

    //Active team?
    //Select any character on active team and
    //IF actionPoints > 0, any square clicked with d<=character.movement, move character ELSE "you are out of action points!" OR
    //IF actionPoints > 0, any enemy held square clicked with d<=character.movement or d<=character.movement+character.attackRange, attack ELSE "you are out of action points!" OR
    // any square anywhere holding an ally character (same team, active), character.selected = true
  }
}
