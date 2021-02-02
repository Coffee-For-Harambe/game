import Team from "./team"
import Character from "./character"

export default class Game {
  constructor() {
    this.createInitialState()

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

  createInitialState() {
    this.state = {}
    this.state.teamsTurn = 0
    this.state.selectedCharacter = null
    this.state.selectedSquare = null
    this.state.turnStage = "Moving"
  }

  resetTurnState() {
    this.state = {}
    this.state.selectedCharacter = null
    this.selectedSquare = null
    turnStage = "Moving"
    //etc
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

  squareClicked(x, y) {
    // TODO: Do something other than changing the selectedSquare if one is already selected etc
    if (typeof x === "undefined" || typeof y === "undefined") {
      this.selectedSquare = null
    } else {
      this.selectedSquare = { x, y }
    }
    //Active team?
    //Select any character on active team and
    //IF actionPoints > 0, any square clicked with d<=character.movement, move character ELSE "you are out of action points!" OR
    //IF actionPoints > 0, any enemy held square clicked with d<=character.movement or d<=character.movement+character.attackRange, attack ELSE "you are out of action points!" OR
    // any square anywhere holding an ally character (same team, active), character.selected = true

    console.log("Selected square changed to", this.selectedSquare)
  }
}
