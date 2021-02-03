import "./shared/index"
import Game from "./shared/game"
const game = new Game()

import { printGrid } from "./shared/gridutils"

const human = game.teams[0]
const computer = game.teams[1]

function showGrid(grid, hide = "01") {
  let gridStr = printGrid(grid)
  gridStr = gridStr.replace(new RegExp(hide, "g"), "--")
  console.log(gridStr)
}

function show() {
  showGrid(game.characterGrid, "00")
}

function clamp(i) {
  if (i < 0) return 0
  if (i > 15) return 15
  return i
}

function randomCharacter(team) {
  return team.characters[Math.floor(Math.random() * team.characters.length)]
}

function moveRandomCharacter(team) {
  const character = randomCharacter(team)

  const randX =
    Math.floor(Math.random() * character.movement * 2) - character.movement
  const randY =
    Math.floor(Math.random() * character.movement * 2) - character.movement

  character.moveSprite({
    x: clamp(character.x + randX),
    y: clamp(character.y + randY),
  })
}

/*  ***** USEFUL *****

// Prints the board to the console
show() // OR showGrid(game.characterGrid)

// Print the influence grids
showGrid(human.influenceGrid)
showGrid(computer.influenceGrid)

// Print the team's characters grid
showGrid(human.teamGrid)
showGrid(computer.teamGrid)

// Update the influence, team and character grids at the end of each move
game.advanceTurn()  // <- THIS IS REQUIRED!!!

// Returns a string of the grid without hiding the zeroes or ones
console.log(printGrid(someGrid))

// Get a random cahracter from a team
const char = randomCharacter(team)

// Randomly move a cahracter from that team
moveRandomCharacter(team)
game.advanceTurn()


// Remember to select debug config to "Watch Sandbox" and you can use
// Debugger breakpoints to pause the code and show

*/

/****************************************************************
 * BE CAREFUL NOT TO EDIT ABOVE THIS LINE UNLESS YOU ABSOLUTELY NEED TO
 */

show()

moveRandomCharacter(human)
game.advanceTurn()

show()

moveRandomCharacter(computer)
game.advanceTurn()

show()

moveRandomCharacter(computer)
game.advanceTurn()

show()
