import { Vector3, Vector2 } from "../../../_snowpack/pkg/three.js";
export const WORLD_SCALE = 10;
export const WORLD_SCALE_V = new Vector3(WORLD_SCALE, WORLD_SCALE, WORLD_SCALE);
const v1 = new Vector3(1, 0, 1);
export function gridToWorld(x, y) {
  return new Vector3(x, 0, y).multiplyScalar(WORLD_SCALE * 2);
}
export function worldToGrid(v3) {
  return new Vector2(Math.round(v3.x / (WORLD_SCALE * 2)), Math.round(v3.z / (WORLD_SCALE * 2)));
}
//# sourceMappingURL=3dutils.js.map
