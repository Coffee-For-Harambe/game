export default class CharacterRenderer {
  constructor(character) {
    this.character = character;
    character.setRenderer(this);
  }

  startMoving() {
    this.state = "MOVING";
  }

}
//# sourceMappingURL=character.js.map
