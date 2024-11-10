import type { Object3D } from 'three'
import CameraControls from 'camera-controls'

export function setFocus(controls: CameraControls, object: Object3D) {
  const sphere = CameraControls.createBoundingSphere(object)
  sphere.radius += 3
  return controls.fitToSphere(sphere, true)
}
