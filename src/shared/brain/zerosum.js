// class ZeroSumBrain {}
/*
"There is a cancer eating at the Imperium. With each decade it advances deeper, leaving drained,dead worlds in its wake. This horror, this abomination, has thought and purpose which functions on an unimaginable, galactic scale and all we can do is try to stop the swarms of bio-engineered monsters it unleashes upon us by instinct. We have given the horror a name to salve our fears; we call it the Tyranid race, but if it is aware of us at all it must know us only as Prey."
    — Inquisitor Bronislaw Czevak at the Conclave of Har
*/

// THIS SHIT HERE MOVES THE NPC AROUND.
function npcMove(char) {
  // Check current position influence.
  const x = char.x
  const y = char.y
  const currentInfluence = human.influenceGrid[y][x]
  // Empty Strings for determining best possible move.
  let highX = 0
  let highY = 0
  let highW = 0
  // let highW = human.influenceGrid[highY][highX]
  // let highW = currentInfluence
  let curPC = 0
  // Get the index value for each character in the grid.
  // for (let i = 0; i < human.characters.length; i++) {
  //   curPC = i
  //   console.log(
  //     "X =",
  //     human.characters[curPC].x,
  //     "Y =",
  //     human.characters[curPC].y
  //   )
  // }

  // for (let n = 0; n < human.characters.length; n++) {
  //   curPC = n
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      let d = distanceTo({ x: highX, y: highY }, { x: i, y: j })
      highX = human.characters[curPC].x
      highY = human.characters[curPC].y
      highW = human.influenceGrid[highY][highX - 1]
      // console.log("High X/Y X =", highX, "Y =", highY)
      // console.log(d)
      console.log(highW)
      // if (d < char.movement && currentInfluence > highW) {
      //   highX = human.characters[curPC].x
      //   highY = human.characters[curPC].y
      //   highW = human.influenceGrid[highX][highY]
      // }
    }
  }
  /*if distance is equal too or less than char movement distance
    then move to new position
    else try and move character */
  // }

  console.log(char)
  console.log("High X/Y X =", highX, "Y =", highY)
  console.log(
    human.characters[curPC].name,
    "X =",
    human.characters[curPC].x,
    "Y =",
    human.characters[curPC].y
  )
  // Find where the PC is on the grid via influence
  // Move towards the highest influence point within the alloted movement distance
}

// function npcAtk(char) {
//   // We should check for attack before performing a move
//   // Just perform a check to make see if the NPC is standing next to a PC,
//   // This check needs to compare attack range to distance from player.
//   // IF YES then perform attack at their grid pos.
//   // else goto move function (eval)
// }
