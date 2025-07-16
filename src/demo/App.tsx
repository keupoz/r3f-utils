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

  function focusObject(object: Object3D | null, enableTransition: boolean) {
    if (controlsRef.current && object) {
      setFocus(controlsRef.current, object, enableTransition)
    }
  }

  const { enableTransition, resetToChildren } = useControls({
    'enableTransition': true,
    'resetToChildren': false,
    'Focus box': button(get => focusObject(boxRef.current, get('enableTransition'))),
    'Focus sphere': button(get => focusObject(sphereRef.current, get('enableTransition'))),
    'Focus rounded box': button(get => focusObject(roundedBoxRef.current, get('enableTransition'))),
    'Focus rotated rounded box': button(get => focusObject(rotatedRoundedBoxRef.current, get('enableTransition'))),
  })

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[32, 32, 32]} />
      <CameraControls ref={controlsRef} draggingSmoothTime={enableTransition ? 1 / 24 : 0} makeDefault />

      <Lights />

      <Grid color={0x252525} />

      <FocusControls enableTransition={enableTransition} resetToChildren={resetToChildren}>
        <Box ref={boxRef} args={[8, 8, 16]} material={BASE_MATERIAL} position={[-10, 4, -16]} />
        <Sphere ref={sphereRef} args={[6]} material={BASE_MATERIAL} position={[12, 6, -8]} />
        <RoundedBox ref={roundedBoxRef} args={[6, 6, 8]} material={BASE_MATERIAL} position={[10, 3, 10]} radius={0.5} />
        <RoundedBox ref={rotatedRoundedBoxRef} args={[6, 6, 8]} material={BASE_MATERIAL} position={[-10, 3, 10]} radius={0.5} scale={1.5} rotation={[Math.PI / 3, Math.PI / 4, Math.PI / 6]} />
      </FocusControls>
    </Canvas>
  )
}
