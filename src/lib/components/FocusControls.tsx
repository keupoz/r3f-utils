import type { Group, Object3D } from 'three'
import { type ThreeEvent, useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { type PropsWithChildren, useMemo, useRef } from 'react'
import { BufferGeometry, EdgesGeometry, LineSegments, Mesh } from 'three'
import { setFocus } from '../utils/setFocus'

export interface FocusControlsProps {
  resetToChildren?: boolean
}

export function FocusControls({ resetToChildren, children }: PropsWithChildren<FocusControlsProps>) {
  const scene = useThree(ctx => ctx.scene)
  const invalidate = useThree(ctx => ctx.invalidate)
  const controls = useThree(ctx => ctx.controls)

  const groupRef = useRef<Group | null>(null)
  const lastObjectRef = useRef<Object3D | null>(null)

  const highlight = useMemo(() => {
    const lineSegments = new LineSegments<EdgesGeometry>()
    lineSegments.matrixAutoUpdate = false
    return lineSegments
  }, [])

  function updateHighlight(e: ThreeEvent<PointerEvent>) {
    const object = e.intersections[0]?.object

    if (object === lastObjectRef.current) return
    if (!(object instanceof Mesh)) return

    const geometry = object.geometry

    if (!(geometry instanceof BufferGeometry)) return

    highlight.geometry = new EdgesGeometry(geometry)

    object.updateMatrixWorld()
    highlight.matrix.copy(object.matrixWorld)

    lastObjectRef.current = object
    scene.add(highlight)
    invalidate()
  }

  function hideHighlight() {
    lastObjectRef.current = null
    scene.remove(highlight)
    invalidate()
  }

  function handleDoubleClick(e: ThreeEvent<MouseEvent>) {
    const object = e.intersections[0]?.object

    if (!object) return
    if (!(controls instanceof CameraControls)) return

    setFocus(controls, object)
  }

  function handleMiss(e: MouseEvent) {
    if (e.type !== 'dblclick') return
    if (!(controls instanceof CameraControls)) return

    if (resetToChildren && groupRef.current) {
      setFocus(controls, groupRef.current)
    } else {
      controls.reset(true)
    }
  }

  return (
    <group
      ref={groupRef}
      onPointerMove={updateHighlight}
      onPointerLeave={hideHighlight}

      onDoubleClick={handleDoubleClick}
      onPointerMissed={handleMiss}
    >
      {children}
    </group>
  )
}
