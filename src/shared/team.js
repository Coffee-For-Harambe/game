import { rebuildInfluenceGrid } from "./gridutils"
export class Team {
  constructor(characters) {
    this.characters = characters
  }

  removeTheDead() {
    this.characters = this.characters.filter((x) => x.health > 0)
  }

  getInfluenceGrid() {
    this.removeTheDead()
    return rebuildInfluenceGrid(this.characters)
  }
}
