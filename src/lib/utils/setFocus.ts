import type { Object3D } from 'three'
import { invalidate } from '@react-three/fiber'
import CameraControls from 'camera-controls'

export async function setFocus(controls: CameraControls, object: Object3D, enableTransition = true) {
  const sphere = CameraControls.createBoundingSphere(object)
  sphere.radius += 3
  await controls.fitToSphere(sphere, enableTransition)

  if (!enableTransition) invalidate()
}
