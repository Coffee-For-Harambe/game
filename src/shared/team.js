import { rebuildInfluenceGrid, buildZeroGrid } from "./gridutils"
export default class Team {
  constructor(characters) {
    this.characters = characters
  }

  setGame(game) {
    this.game = game
    this.characters.forEach((character) => {
      character.setTeam(this)
    })
  }

  removeTheDead() {
    this.characters = this.characters.filter((x) => x.health > 0)
  }

  update() {
    this.removeTheDead()
    this.influenceGrid = this.getInfluenceGrid()
    this.teamGrid = this.getTeamGrid()
  }

  getInfluenceGrid() {
    return rebuildInfluenceGrid(this.characters)
  }

  getTeamGrid() {
    const grid = buildZeroGrid()
    this.characters.forEach((c) => {
      grid[c.y][c.x] = c
    })

    return grid
  }
}
