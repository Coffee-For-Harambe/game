import Team from "./team"

export default class Game {
  constructor() {
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
      new Character.Dragon(0, 0),
      new Character.Dragon(1, 0),
      new Character.Skeleton(2, 0),
      new Character.Skeleton(3, 0),
      new Character.Skeleton(4, 0),
      new Character.Skeleton(5, 0),
    ])
  }

  advanceTurn() {
    this.turn = (this.turn + 1) % this.teams.length
  }

  getActiveTeam() {
    return this.teams[this.turn]
  }
}

window.GAME = new Game()
