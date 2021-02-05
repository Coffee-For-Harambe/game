function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Mage extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Ishmael, Storm Bender");

    _defineProperty(this, "shortCode", "Wz");

    _defineProperty(this, "modelName", "Wizard.glb");

    _defineProperty(this, "hp", 6000);

    _defineProperty(this, "movement", 5);

    _defineProperty(this, "attackRange", 6);

    _defineProperty(this, "attackName", "Smite-ning");

    _defineProperty(this, "sounds", {
      attack: [sounds.zap0, sounds.zap1],
      footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
      ouch: [sounds.hit0, sounds.hit1, sounds.hit2]
    });

    _defineProperty(this, "animations", {
      attack: "Staff_Attack",
      // Spell1, Spell2
      idle: "Idle",
      walk: "Walk",
      damage: "RecieveHit",
      death: "Death"
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
