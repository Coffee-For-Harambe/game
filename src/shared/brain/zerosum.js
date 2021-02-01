class ZeroSumBrain {}

class tempCharacter {
  constructor(x, y, influence = 50) {
    this.x = x
    this.y = y
    this.influence = influence
  }

  influenceGrid(g) {
    const touchCell = (x, y, influence) => {
      if (x < 0 || y < 0 || x >= g.length || y >= g.length) {
        // Outside of grid bounds
        return
      }

      if (g[y][x] <= 0) {
        // Non-Walkable OR has enemy on it
        return
      }

      if (g[y][x] > 1) {
        // Something else already influenced it, lower it to indicate danger
        // g[y][x] = Math.max(0, g[y][x] - influence)

        g[y][x] = Math.max(g[y][x], influence) - Math.min(g[y][x], influence)
      } else {
        g[y][x] = influence
      }

      /*
      const cur = g[y][x]
      if (cur == 0) {
        // Non-Walkable OR has enemy on it
        return
      } else if (cur == 1) {
        g[y][x] = influence * 5
      } else if (cur > 1) {
        // Something else already influenced it, lower it to indicate danger
        // g[y][x] = Math.max(0, g[y][x] - influence)
        g[y][x] = cur * -1 - influence
      }  else { // 
        g[y][x] -= influence
      }
    }
      */
    }

    const x = this.x,
      y = this.y,
      influence = this.influence

    // Top row
    touchCell(x - 1, y - 1, influence * 0.4)
    touchCell(x, y - 1, influence)
    touchCell(x + 1, y - 1, influence * 0.4)

    // Our Row
    touchCell(x - 1, y, influence)
    g[y][x] = 0 // Set the cell we're standing on to 0
    touchCell(x + 1, y, influence)

    // Top row
    touchCell(x - 1, y + 1, influence * 0.4)
    touchCell(x, y + 1, influence)
    touchCell(x + 1, y + 1, influence * 0.4)
  }
}

let characters = [
  new tempCharacter(3, 3),
  new tempCharacter(4, 3),
  new tempCharacter(7, 5),
]

function buildZeroGrid(size) {
  const grid = Array(size)
  for (let i = 0; i < size; i++) {
    grid[i] = Array(size).fill(1)
  }

  return grid
}

function padNum(i, nc) {
  return ("0" + i).slice(-nc)
}

function printGrid(grid, nc) {
  let ret = ""
  for (let y = 0; y < grid.length; y++) {
    let str = ""
    for (let x = 0; x < grid.length; x++) {
      str += padNum(grid[y][x], nc || 2) + ", "
    }
    ret += str.slice(0, -2) + "\n"
  }

  return ret
}

function rebuildInfluenceGrid() {
  // Reset the grid because we build it up from scratch each time to avoid conflicts
  const grid = buildZeroGrid(16)

  // Output grid example: https://xavier.lol/i/1Z9UKtD.png
  characters.forEach((c) => {
    if (c /* TODO: character is an enemy */) {
      c.influenceGrid(grid)
    }
  })

  console.log(printGrid(grid))
}

// Any time a character moves, rebuild the grid
rebuildInfluenceGrid()
