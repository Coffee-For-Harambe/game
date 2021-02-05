function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Warrior extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Conan, the Bar-... Warrior");

    _defineProperty(this, "shortCode", "Wa");

    _defineProperty(this, "modelName", "Warrior.glb");

    _defineProperty(this, "hp", 6000);

    _defineProperty(this, "damage", Math.random() * 5 * 1000);

    _defineProperty(this, "movement", 4);

    _defineProperty(this, "damageResist", 0.2);

    _defineProperty(this, "attackRange", 1);

    _defineProperty(this, "attackName", "CONAN SMAAASH");

    _defineProperty(this, "sounds", {
      swordAtk: [sounds.sword0, sounds.sword1, sounds.sword2]
    });

    _defineProperty(this, "initiative", 5);

    _defineProperty(this, "points", 0);

    _defineProperty(this, "influencePos", 10);

    _defineProperty(this, "influenceDiag", 4);

    _defineProperty(this, "characterSelected", false);

    _defineProperty(this, "actionPoints", 2);

    _defineProperty(this, "movedThisRound", false);

    _defineProperty(this, "attackedThisRound", false);
  }

}
//# sourceMappingURL=warrior.js.map
