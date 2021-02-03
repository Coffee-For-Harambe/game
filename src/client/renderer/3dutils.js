import { Vector3 } from "three"

export const WORLD_SCALE = 10
export const WORLD_SCALE_V = new Vector3(WORLD_SCALE, WORLD_SCALE, WORLD_SCALE)
const v1 = new Vector3(1, 0, 1)
export function gridToWorld(x, y) {
  return new Vector3(x, 0, y).multiplyScalar(WORLD_SCALE * 2)
}
