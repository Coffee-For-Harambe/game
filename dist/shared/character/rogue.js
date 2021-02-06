function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Rogue extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Xavier, the Shadow Maw");

    _defineProperty(this, "shortCode", "Ro");

    _defineProperty(this, "modelName", "Rogue.glb");

    _defineProperty(this, "hp", 6500);

    _defineProperty(this, "movement", 7);

    _defineProperty(this, "attackRange", 1);

    _defineProperty(this, "attackCount", 2);

    _defineProperty(this, "maxDamage", 1000);

    _defineProperty(this, "minDamage", 250);

    _defineProperty(this, "attackName", "Slice and Dice!");

    _defineProperty(this, "animations", {
      attack: "Dagger_Attack",
      //Dagger_Attack2
      idle: "Idle",
      walk: "Walk",
      damage: "RecieveHit",
      death: "Death"
    });

    _defineProperty(this, "damageResist", -0.5);

    _defineProperty(this, "initiative", 1);

    _defineProperty(this, "points", 0);

    _defineProperty(this, "influencePos", 10);

    _defineProperty(this, "influenceDiag", 4);

    _defineProperty(this, "characterSelected", false);

    _defineProperty(this, "actionPoints", 2);

    _defineProperty(this, "movedThisRound", false);

    _defineProperty(this, "attackedThisRound", false);
  }

}
//# sourceMappingURL=rogue.js.map
