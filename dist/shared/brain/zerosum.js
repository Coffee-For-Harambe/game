// class ZeroSumBrain {}

/*
"There is a cancer eating at the Imperium. With each decade it advances deeper, leaving drained,dead worlds in its wake. This horror, this abomination, has thought and purpose which functions on an unimaginable, galactic scale and all we can do is try to stop the swarms of bio-engineered monsters it unleashes upon us by instinct. We have given the horror a name to salve our fears; we call it the Tyranid race, but if it is aware of us at all it must know us only as Prey."
    — Inquisitor Bronislaw Czevak at the Conclave of Har
*/
// BBBBBBRRRRAAAAAAAIIIIIINNNSSSSSSS.
function npcMove(char) {
  let cx = char.x,
      cy = char.y;
  let goodChoice = [];
  let bestChoice = {
    x: cx,
    y: cy,
    influence: human.influenceGrid[cy][cx]
  };

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const weight = human.influenceGrid[y][x];

      let _dist = distanceTo({
        x: cx,
        y: cy
      }, {
        x: x,
        y: y
      });

      if (_dist > char.movement) {
        _dist *= 1.5;
      }

      const realInfluence = weight - _dist;

      if (realInfluence > bestChoice.influence) {
        goodChoice.push(bestChoice);
        bestChoice = {
          x: x,
          y: y,
          influence: realInfluence
        };
      }
    }
  } // This is where the AI cheats a little. But you can see where everything is, so should it.


  let dist = 0;
  let curPC = 0;

  for (let i = 0; i < human.characters.length; i++) {
    curPC = i; //Find each PC on the grid, if distanceTo = 1 attack at its x, y.

    dist = distanceTo({
      x: cx,
      y: cy
    }, {
      x: human.characters[curPC].x,
      y: human.characters[curPC].y
    });

    if (dist == 1) {//pass attack function @ human.characters[curPC]
    }
  } // if we cannot attack then we need to check for moves


  if (cy != bestChoice.y) {
    if (cx != bestChoice.x) {
      // add a distance check to PC's if greater than 1
      // move to bestChoice.y, bestChoice.x
      console.log("MOVE ME");
    }
  }

  if (cy == bestChoice.y) {
    if (cx == bestChoice.x) {
      // console.log("I AM STUCK")
      // Hack move for the time being, it's not stupid if it works. 
      bestChoice = {
        x: cx + 7,
        y: cy
      }; // pass moveTo(char) function here with bestChoice.y, bestChoice.x
    }
  }

  console.log(char.shortCode, "x=", cx, "y=", cy);
  console.log("Our best choice so far seems to be", bestChoice);
}
//# sourceMappingURL=zerosum.js.map
