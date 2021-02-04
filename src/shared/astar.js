import Team from "./team"
import squareClicked from "../game"
import buildGrid from "./gridutils"

export default class astar {
  constructor(grid, selectedCharacter, square) {
    this.grid = grid
    this.selectedCharacter = game.selectedCharacter
    this.square = game.square
  }

  init(grid) {
    grid = buildGrid()
    return grid
  }
  //remove the node from openlist, add it to closedList
  removeGraphNode(node) {
    for (node in openList) {
      if (node == currentNode) closedList.push(node)
    }
  }
  //search closedlist for node, return truthy if present
  findGraphNode(node) {
    for (i = 0; i < closedList.length; i++) {
      if (closedList[i] == node) {
        break
      }
    }
  }
  //callout tiles we can't move on
  isWall(neighbor) {
    if (
      neighbor.y == 16 ||
      neighbor.x == 16 ||
      neighbor.y == 0 ||
      neighbor.x == 0 ||
      neighbor == getCharacterGrid()
    ) {
      true
    }
  }

  search(grid, selectedCharacter, square) {
    astar.init(grid)

    let openList = []
    let closedList = []
    openList.push(selectedCharacter)

    while (openList.length > 0) {
      // Grab the lowest f(x) to process next
      let lowInd
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowInd].f) {
          lowInd = i
        }
      }
      let currentNode = openList[lowInd]

      // square case -- result has been found, return the traced path
      if (currentNode.pos == square.pos) {
        let curr = currentNode
        let ret = []
        while (curr.parent) {
          ret.push(curr)
          curr = curr.parent
        }
        return ret.reverse()
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors
      openList.removeGraphNode(currentNode) //REWRITE THIS TO TAKE CURRENT NODE OUT OF OPENLIST
      closedList.push(currentNode)
      let neighbors = astar.neighbors(grid, currentNode)

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i]
        if (closedList.findGraphNode(neighbor) || neighbor.isWall()) {
          //REWRITE THIS TO TAKE OUT EXCEPTIONS TO NODE PROCESS (ENEMIES, ALLIES, ETC.)
          // not a valid node to process, skip to next neighbor
          continue
        }

        // g score is the shortest distance from start to current node, we need to check if
        //   the path we have arrived at this neighbor is the shortest one we have seen yet
        let gScore = currentNode.g + 1 // 1 is the distance from a node to it's neighbor
        let gScoreIsBest = false

        if (!openList.findGraphNode(neighbor)) {
          //rewrite this
          // This the the first time we have arrived at this node, it must be the best
          // Also, we need to take the h (heuristic) score since we haven't done so yet

          gScoreIsBest = true
          neighbor.h = astar.heuristic(neighbor.pos, square.pos)
          openList.push(neighbor)
        } else if (gScore < neighbor.g) {
          // We have already seen the node, but last time it had a worse g (distance from start)
          gScoreIsBest = true
        }

        if (gScoreIsBest) {
          // Found an optimal (so far) path to this node.   Store info on how we got here and
          //  just how good it really is...
          neighbor.parent = currentNode
          neighbor.g = gScore
          neighbor.f = neighbor.g + neighbor.h
          neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h
        }
      }
    }

    // No result was found -- empty array signifies failure to find path
    return []
  }

  heuristic(pos0, pos1) {
    // This is the Manhattan distance
    let d1 = Math.abs(pos1.x - pos0.x)
    let d2 = Math.abs(pos1.y - pos0.y)
    return d1 + d2
  }

  neighbors(grid, node) {
    let ret = []
    let x = node.pos.x
    let y = node.pos.y

    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y])
    }
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y])
    }
    if (grid[x][y - 1] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1])
    }
    if (grid[x][y + 1] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1])
    }
    return ret
  }
}

let astarInstance = new astar.search(grid, { x: 3, y: 5 }, { x: 9, y: 8 })
