import "./logic"
import "./brain/zerosum"
import { createFriendlyTeam, createEnemyTeam } from "./teams"
import { rebuildInfluenceGrid } from "./gridutils"

const teamA = createFriendlyTeam()
const teamB = createEnemyTeam()

console.log("Team A:", teamA)
console.log("Team B:", teamB)

console.log("Team A Influence")
const teamAInfluenceGrid = rebuildInfluenceGrid(teamA)
console.log(teamAInfluenceGrid)

console.log("Team B Influence")
const teamBInfluenceGrid = rebuildInfluenceGrid(teamB)
console.log(teamBInfluenceGrid)
