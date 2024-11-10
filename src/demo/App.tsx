import type CameraControlsImpl from 'camera-controls'
import type { Mesh, Object3D } from 'three'
import { Box, PerspectiveCamera, RoundedBox, Sphere } from '@react-three/drei'
import { button, useControls } from 'leva'
import { useRef } from 'react'
import { MeshLambertMaterial } from 'three'
import { CameraControls, Canvas, FocusControls, Grid, Lights, setFocus } from '~/lib'

const BASE_MATERIAL = new MeshLambertMaterial({
  flatShading: true,
})

export function App() {
  const controlsRef = useRef<CameraControlsImpl | null>(null)

  const boxRef = useRef<Mesh | null>(null)
  const sphereRef = useRef<Mesh | null>(null)
  const roundedBoxRef = useRef<Mesh | null>(null)
  const rotatedRoundedBoxRef = useRef<Mesh | null>(null)

  function focusObject(object: Object3D | null) {
    if (controlsRef.current && object) {
      setFocus(controlsRef.current, object)
    }
  }

  const { resetToChildren } = useControls({
    'resetToChildren': false,
    'Focus box': button(() => focusObject(boxRef.current)),
    'Focus sphere': button(() => focusObject(sphereRef.current)),
    'Focus rounded box': button(() => focusObject(roundedBoxRef.current)),
    'Focus rotated rounded box': button(() => focusObject(rotatedRoundedBoxRef.current)),
  })

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[32, 32, 32]} />
      <CameraControls ref={controlsRef} makeDefault />

      <Lights />

      <Grid color={0x252525} />

      <FocusControls resetToChildren={resetToChildren}>
        <Box ref={boxRef} args={[8, 8, 16]} material={BASE_MATERIAL} position={[-10, 4, -16]} />
        <Sphere ref={sphereRef} args={[6]} material={BASE_MATERIAL} position={[12, 6, -8]} />
        <RoundedBox ref={roundedBoxRef} args={[6, 6, 8]} material={BASE_MATERIAL} position={[10, 3, 10]} radius={0.5} />
        <RoundedBox ref={rotatedRoundedBoxRef} args={[6, 6, 8]} material={BASE_MATERIAL} position={[-10, 3, 10]} radius={0.5} scale={1.5} rotation={[Math.PI / 3, Math.PI / 4, Math.PI / 6]} />
      </FocusControls>
    </Canvas>
  )
}
