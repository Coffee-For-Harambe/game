function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Dragon extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Trogdor, the Burninator");

    _defineProperty(this, "shortCode", "Dr");

    _defineProperty(this, "modelName", "Dragon.glb");

    _defineProperty(this, "hp", 10000);

    _defineProperty(this, "movement", 6);

    _defineProperty(this, "attackRange", 4);

    _defineProperty(this, "attackName", "Burninate!");

    _defineProperty(this, "sounds", {
      footstep: [sounds.flap],
      attack: [sounds.dGrowl0, sounds.dGrowl1],
      ouch: [sounds.sGroan0, sounds.sGroan1, sounds.sGroan2]
    });

    _defineProperty(this, "maxDamage", 1750);

    _defineProperty(this, "minDamage", 750);

    _defineProperty(this, "animations", {
      damage: "Hit",
      walk: "Idle",
      attack: "Attack",
      idle: "Idle",
      death: "Death"
    });

    _defineProperty(this, "damageResist", 0.3);

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
