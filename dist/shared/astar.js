import Game from "./game.js";
import { Vector2 } from "../../_snowpack/pkg/three.js";

class Node {
  constructor(x, y, g = Infinity, h = Infinity) {
    this.x = x;
    this.y = y;
    this.g = g;
    this.h = h;
  }

  get pos() {
    return {
      x: this.x,
      y: this.y
    };
  }

  set pos(obj) {
    this.x = obj.x;
    this.y = obj.y;
  } // get f() {
  //   this.g + this.h
  // }


  equals(other) {
    return this.x == other.x && this.y == other.y;
  }

} //search closedlist for node, return truthy if present


function findGraphNode(node) {
  for (i = 0; i < closedList.length; i++) {
    if (closedList[i] == node) {
      break;
    }
  }
} //callout tiles we can't move on


function isWall(neighbor) {
  if (neighbor.y == 16 || neighbor.x == 16 || neighbor.y == 0 || neighbor.x == 0 || Game.Instance.characterGrid[y][x] != 0) {
    true;
  }
}

export function computePath(start, end, char) {
  start = new Node(start.x, start.y, 0, heuristic(start, end));
  end = new Node(end.x, end.y);
  const grid = Game.Instance.characterGrid;
  let openList = [];
  let closedList = [];
  openList.push(start);

  while (openList.length > 0) {
    // Grab the lowest f(x) to process next
    let lowInd = 0;

    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) {
        lowInd = i;
      }
    }

    let currentNode = openList[lowInd]; // end case -- result has been found, return the traced path

    if (currentNode.equals(end)) {
      let curr = currentNode;
      let ret = [];

      while (curr.parent) {
        ret.push(new Vector2(curr.x, curr.y));
        curr = curr.parent;
      }

      return ret.reverse();
    } // Normal case -- move currentNode from open to closed, process each of its neighbors


    openList.splice(lowInd, 1);
    closedList.push(currentNode);
    let neighbors = getNeighbors(grid, currentNode, char);

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      let isInClosed = false;

      for (let _i = 0; _i < closedList.length; _i++) {
        if (neighbor.equals(closedList[_i])) {
          isInClosed = true;
          break;
        }
      }

      if (isInClosed) {
        continue;
      } // g score is the shortest distance from start to current node, we need to check if
      //   the path we have arrived at this neighbor is the shortest one we have seen yet


      let gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor

      let gScoreIsBest = false;
      let preExisting = null;

      for (let _i2 = 0; _i2 < openList.length; _i2++) {
        if (neighbor.equals(openList[_i2])) {
          neighbor = openList[_i2];
          preExisting = true;
          break;
        }
      }

      if (!preExisting) {
        //rewrite this
        // This the the first time we have arrived at this node, it must be the best
        // Also, we need to take the h (heuristic) score since we haven't done so yet
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor.pos, end.pos);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        // We have already seen the node, but last time it had a worse g (distance from start)
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        // Found an optimal (so far) path to this node.   Store info on how we got here and
        //  just how good it really is...
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
      }
    }
  } // No result was found -- empty array signifies failure to find path


  return [];
}
window.computePath = computePath;

function heuristic(pos0, pos1) {
  // This is the Manhattan distance
  let d1 = Math.abs(pos1.x - pos0.x);
  let d2 = Math.abs(pos1.y - pos0.y);
  return d1 + d2;
}

function getNeighbors(grid, node, char) {
  let ret = [];
  let x = node.x;
  let y = node.y;

  if (y - 1 >= 0 && grid[y - 1] && (grid[y - 1][x] == 0 || grid[y - 1][x] == char)) {
    ret.push(new Node(x, y - 1));
  }

  if (y + 1 <= 15 && grid[y + 1] && (grid[y + 1][x] == 0 || grid[y + 1][x] == char)) {
    ret.push(new Node(x, y + 1));
  }

  if (x - 1 >= 0 && (grid[y][x - 1] == 0 || grid[y][x - 1] == char)) {
    ret.push(new Node(x - 1, y));
  }

  if (x + 1 <= 15 && (grid[y][x + 1] == 0 || grid[y][x + 1] == char)) {
    ret.push(new Node(x + 1, y));
  }

  return ret;
}
//# sourceMappingURL=astar.js.map
