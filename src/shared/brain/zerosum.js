// class ZeroSumBrain {}
/*
"There is a cancer eating at the Imperium. With each decade it advances deeper, leaving drained,dead worlds in its wake. This horror, this abomination, has thought and purpose which functions on an unimaginable, galactic scale and all we can do is try to stop the swarms of bio-engineered monsters it unleashes upon us by instinct. We have given the horror a name to salve our fears; we call it the Tyranid race, but if it is aware of us at all it must know us only as Prey."
    — Inquisitor Bronislaw Czevak at the Conclave of Har
*/

// THIS SHIT HERE MOVES THE NPC AROUND.
function npcMove(char) {
  let cx = char.x,
    cy = char.y
  let goodChoice = []
  let bestChoice = { x: cx, y: cy, influence: human.influenceGrid[cy][cx] }
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const weight = human.influenceGrid[y][x]
      let dist = distanceTo({ x: cx, y: cy }, { x: x, y: y })
      if (dist > char.movement) {
        dist *= 1.5
      }
      const realInfluence = weight - dist
      if (realInfluence > bestChoice.influence) {
        goodChoice.push(bestChoice) // No longer the best but we'll keep you in mind
        bestChoice = { x: x, y: y, influence: realInfluence }
      }
      /* check position vs best choice */
    }
    console.log(char.shortCode, "x=", cx, "y=", cy)
    console.log("Our best choice so far seems to be", bestChoice)
  }
}
