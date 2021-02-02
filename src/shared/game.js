import Team from "./team"
import Character from "./character"

export default class Game {
  constructor() {
    this.round = 1
    this.turn = 0

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

  static _Instance = null
  static get Instance() {
    if (!Game._Instance) {
      Game._Instance = new Game()
      window.GAME = Game._Instance
    }

    return Game._Instance
  }

  advanceRound() {
    for (Character in this.teams) {
    }
  }

  advanceTurn() {
    this.turn = (this.turn + 1) % this.teams.length
    this.update()
  }

  getActiveTeam() {
    return this.teams[this.turn]
  }

  update() {
    this.teams.forEach((team) => team.update())
  }

  squareClicked(x, y) {
    // TODO: Do something other than changing the selectedSquare if one is already selected etc
    if (typeof x === "undefined" || typeof y === "undefined") {
      this.selectedSquare = null
    } else {
      this.selectedSquare = { x, y }
    }

    console.log("Selected square changed to", this.selectedSquare)
  }
}
