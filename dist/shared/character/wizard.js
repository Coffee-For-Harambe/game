function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Mage extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Ishmael, Storm Bender");

    _defineProperty(this, "shortCode", "Wz");

    _defineProperty(this, "modelName", "Wizard.glb");

    _defineProperty(this, "hp", 3500);

    _defineProperty(this, "damage", Math.random() * 4 * 1000);

    _defineProperty(this, "movement", 5);

    _defineProperty(this, "attackRange", 6);

    _defineProperty(this, "attackName", "Smite-ning");

    _defineProperty(this, "sounds", {
      zap: [sounds.zap0, sounds.zap1]
    });

    _defineProperty(this, "damageResist", -0.1);

    _defineProperty(this, "points", 0);

    _defineProperty(this, "influencePos", 10);

    _defineProperty(this, "influenceDiag", 4);

    _defineProperty(this, "characterSelected", false);

    _defineProperty(this, "actionPoints", 2);

    _defineProperty(this, "movedThisRound", false);

    _defineProperty(this, "attackedThisRound", false);
  }

}
//# sourceMappingURL=wizard.js.map
