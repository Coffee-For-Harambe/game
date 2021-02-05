function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { buildGrid, distanceTo } from "../gridutils.js";
import { Vector2 } from "../../../_snowpack/pkg/three.js";
import * as sounds from "../../client/sounds/index.js";
import astar from "../astar.js";
export default class Character {
  constructor(x, y) {
    _defineProperty(this, "name", "Basic Character");

    _defineProperty(this, "shortCode", "??");

    _defineProperty(this, "modelName", "Skeleton.glb");

    _defineProperty(this, "hp", 5000);

    _defineProperty(this, "damage", 3000);

    _defineProperty(this, "movement", 5);

    _defineProperty(this, "attackRange", 5);

    _defineProperty(this, "attackName", "Splash");

    _defineProperty(this, "sounds", {
      attack: [sounds.swish0, sounds.swish1, sounds.swish2, sounds.swish3],
      footstep: [sounds.foot0, sounds.foot1, sounds.foot2, sounds.foot3, sounds.foot4],
      ouch: [sounds.hit0, sounds.hit1, sounds.hit2]
    });

    _defineProperty(this, "attackSound", "sound");

    _defineProperty(this, "damageSound", "sound");

    _defineProperty(this, "damageResist", -0.3);

    _defineProperty(this, "initiative", 2);

    _defineProperty(this, "points", 0);

    _defineProperty(this, "influencePos", 0);

    _defineProperty(this, "influenceDiag", 0);

    _defineProperty(this, "characterSelected", false);

    _defineProperty(this, "actionPoints", 2);

    _defineProperty(this, "movedThisRound", false);

    _defineProperty(this, "attackedThisRound", false);

    _defineProperty(this, "renderer", null);

    this.x = x;
    this.y = y;
    this.pos = new Vector2(x, y);
  }

  setTeam(team) {
    this.team = team;
    this.game = team.game;
  }

  setRenderer(renderer) {
    this.renderer = renderer;
  }

  whoAmI() {
    console.log(this.name, this.x, this.y, this.hp, this.movedThisRound // this.active,
    // this.turn
    );
  }

  debugStr() {
    return this.constructor.name + ": " + this.hp + " hp " + this.x + "," + this.y;
  }

  selected() {
    console.log(whoAmI);
  }

  receiveDamage(damage) {
    this.hp -= damage - damage * this.damageResist;
    let audio = new Audio(this.damageSound);
    audio.play();
  }

  attack(targetCharacter) {
    console.log("attack");
    targetCharacter.receiveDamage(this.damage);
    let audio = new Audio(this.damageSound);
    audio.play();
  }

  moveSprite(vec) {
    //vec
    this.y = vec.y; //vec.y

    this.x = vec.x; //vec.x

    this.pos.copy(vec);
    this.game.update();
  }

  canReach(square) {
    const ourPos = {
      y: this.y,
      x: this.x
    }; //is distanceTo <= this.character.movement

    let distance = distanceTo(square, ourPos);

    if (distance <= this.movement) {
      astar.search(buildGrid(), ourPos, square);
    } else {
      return false;
    }
  }

  canReachAttack(square) {
    const ourAtt = {
      y: this.y,
      x: this.x
    };
    let distance = distanceTo(square, ourAtt);

    if (distance <= this.attackRange) {
      return true;
    } else {
      return false;
    }
  }

  influenceGrid(g) {
    const touchCell = (x, y, influence) => {
      if (x < 0 || y < 0 || x >= g.length || y >= g.length) {
        // Outside of grid bounds
        return;
      }

      if (g[y][x] <= 0) {
        // Non-Walkable OR has enemy on it
        return;
      }

      if (g[y][x] > 1) {
        // Something else already influenced it, lower it to indicate danger
        g[y][x] = Math.max(g[y][x], influence) - Math.min(g[y][x], influence);
      } else if (g[y][x] < 1) {
        // Cell has already been yoinked too many times, let it stay negative
        g[y][x] = g[y][x] - influence;
      } else {
        // Cell is at its default value, give it our influence
        g[y][x] = influence;
      }
    };

    const x = this.x,
          y = this.y; // Top row

    touchCell(x - 1, y - 1, this.influenceDiag);
    touchCell(x, y - 1, this.influencePos);
    touchCell(x + 1, y - 1, this.influenceDiag); // Our Row

    touchCell(x - 1, y, this.influencePos);
    g[y][x] = 0; // Set the cell we're standing on to 0

    touchCell(x + 1, y, this.influencePos); // Top row

    touchCell(x - 1, y + 1, this.influenceDiag);
    touchCell(x, y + 1, this.influencePos);
    touchCell(x + 1, y + 1, this.influenceDiag);
  }

  getOpposingTeam() {
    return this.team.getOpposingTeam();
  }

}
//# sourceMappingURL=base.js.map
