export function buildGrid(initial = 0, size = 16) {
  const grid = Array(size)
  for (let i = 0; i < size; i++) {
    grid[i] = Array(size).fill(initial)
  }

  return grid
}

export function padNum(i, nc) {
  if (i.shortCode) {
    i = i.shortCode
  }

  return ("0" + i).slice(-nc)
}

export function printGrid(grid, nc) {
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

if (typeof window !== "undefined") {
  window.printGrid = printGrid
}

export function distanceTo(v1, v2) {
  let distance = v2.y - v1.y + (v2.x - v2.x)
  return distance
}

export function rebuildInfluenceGrid(team) {
  // Reset the grid because we build it up from scratch each time to avoid conflicts
  const grid = buildGrid(1)

  // Output grid example: https://xavier.lol/i/1Z9UKtD.png
  team.forEach((character) => {
    character.influenceGrid(grid)
  })

  return grid
}
