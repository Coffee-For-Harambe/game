import { Vector3 } from "three"

const v1 = new Vector3(1, 0, 1)
export function gridToWorld(x, y) {
  return new Vector3(x, 0, y).multiplyScalar(2)
}
