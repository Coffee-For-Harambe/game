function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Character from "./base.js";
import * as sounds from "../../client/sounds/index.js";
export default class Warrior extends Character {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "name", "Conan, the Bar-... Warrior");

    _defineProperty(this, "shortCode", "Wa");

    _defineProperty(this, "modelName", "Warrior.glb");

    _defineProperty(this, "hp", 9000);

    _defineProperty(this, "movement", 4);

    _defineProperty(this, "damageResist", 0.2);

    _defineProperty(this, "attackRange", 1);

    _defineProperty(this, "attackName", "CONAN SMAAASH");

    _defineProperty(this, "sounds", {
      attack: [sounds.sword0, sounds.sword1, sounds.sword2],
      footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
      ouch: [sounds.hit0, sounds.hit1, sounds.hit2]
    });

    _defineProperty(this, "animations", {
      attack: "Sword_Attack",
      // Sword_AttackFast
      idle: "Idle",
      walk: "Walk",
      damage: "RecieveHit",
      death: "Death"
    });

    _defineProperty(this, "maxDamage", 3000);

    _defineProperty(this, "minDamage", 1000);

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
