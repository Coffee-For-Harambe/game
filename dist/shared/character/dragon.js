function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Dragon extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Trogdor, the Burninator");

    _defineProperty(this, "shortCode", "Dr");

    _defineProperty(this, "modelName", "Dragon.glb");

    _defineProperty(this, "hp", 7000);

    _defineProperty(this, "damage", Math.random() * 5 * 1000);

    _defineProperty(this, "movement", 7);

    _defineProperty(this, "attackRange", 5);

    _defineProperty(this, "attackName", "Burninate!");

    _defineProperty(this, "sounds", {
      flap: [sounds.flap],
      dGrowl: [sounds.dGrowl0, sounds.dGrowl1]
    });

    _defineProperty(this, "attackSound", "sound");

    _defineProperty(this, "damageSound", "sound");

    _defineProperty(this, "damageResist", -0.3);

    _defineProperty(this, "initiative", 2);

    _defineProperty(this, "points", 0);

    _defineProperty(this, "influencePos", 10);

    _defineProperty(this, "influenceDiag", 4);

    _defineProperty(this, "characterSelected", false);

    _defineProperty(this, "actionPoints", 2);

    _defineProperty(this, "movedThisRound", false);

    _defineProperty(this, "attackedThisRound", false);
  }

}
//# sourceMappingURL=dragon.js.map
