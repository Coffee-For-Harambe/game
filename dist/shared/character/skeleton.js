function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Skeleton extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Revenant");

    _defineProperty(this, "shortCode", "Sk");

    _defineProperty(this, "modelName", "Skeleton.glb");

    _defineProperty(this, "hp", 3000);

    _defineProperty(this, "damage", Math.random() * 3 * 1000);

    _defineProperty(this, "movement", 8);

    _defineProperty(this, "attackRange", 1);

    _defineProperty(this, "attackName", "Bash and Slash");

    _defineProperty(this, "sounds", {
      ouch: [sounds.sGroan0, sounds.sGroan1, sounds.sGroan2],
      attack: [sounds.swish0, sounds.swish1, sounds.swish2, sounds.swish3],
      footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4]
    });

    _defineProperty(this, "animations", {
      walk: "Running",
      damage: "Spawn",
      idle: "Idle",
      attack: "Attack"
    });

    _defineProperty(this, "damageResist", -0.1);

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
//# sourceMappingURL=skeleton.js.map
