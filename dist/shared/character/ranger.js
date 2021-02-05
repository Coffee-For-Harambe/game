function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Ranger extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Santi, of The Post Wood");

    _defineProperty(this, "shortCode", "Rn");

    _defineProperty(this, "modelName", "Ranger.glb");

    _defineProperty(this, "hp", 4000);

    _defineProperty(this, "damage", 10000);

    _defineProperty(this, "movement", 5);

    _defineProperty(this, "attackRange", 5);

    _defineProperty(this, "attackName", "Sure Shot");

    _defineProperty(this, "animations", {
      attack: "Bow_Attack_Draw",
      //Bow_Attack_Shoot
      idle: "Idle",
      walk: "Walk",
      damage: "ReceiveHit"
    });

    _defineProperty(this, "damageResist", 0);

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
//# sourceMappingURL=ranger.js.map
