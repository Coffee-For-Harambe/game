import { rebuildInfluenceGrid, buildGrid } from "./gridutils"
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
    this.characters = this.characters.filter((x) => x.hp > 0)
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
    const grid = buildGrid()
    this.characters.forEach((character) => {
      grid[character.y][character.x] = character
    })

    return grid
  }

  getOpposingTeam() {
    return this.game.getOpposingTeam(this)
  }
}
