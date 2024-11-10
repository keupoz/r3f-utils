import type { ReactThreeFiber } from '@react-three/fiber'
import type { CameraControlsEventMap } from 'camera-controls/dist/types'
import type { EventDispatcher, OrthographicCamera, PerspectiveCamera } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import CameraControlsImpl from 'camera-controls'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { Box3, Matrix4, Quaternion, Raycaster, Sphere, Spherical, Vector2, Vector3, Vector4 } from 'three'

CameraControlsImpl.install({
  THREE: {
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
  },
})

export type CameraControlsUpdateHandler = (event: CameraControlsEventMap['controlstart' | 'transitionstart' | 'control' | 'update']) => void

export type CameraControlsProps = Omit<
  ReactThreeFiber.Overwrite<
    ReactThreeFiber.Node<CameraControlsImpl, typeof CameraControlsImpl>,
    {
      makeDefault?: boolean
      camera?: PerspectiveCamera | OrthographicCamera
      domElement?: HTMLElement
      regress?: boolean
      onChange?: CameraControlsUpdateHandler
    }
  >,
  'ref' | keyof EventDispatcher
>

export const CameraControls = forwardRef<CameraControlsImpl, CameraControlsProps>((props, ref) => {
  const { makeDefault, camera, domElement, regress, onChange, ...restProps } = props

  const defaultCamera = useThree(state => state.camera)
  const glDomElement = useThree(state => state.gl.domElement)
  const connectedDomElement = useThree(state => state.events.connected)
  const performRegress = useThree(state => state.performance.regress)

  const defaultDomElement = connectedDomElement instanceof HTMLElement ? connectedDomElement : glDomElement

  const usedCamera = camera ?? defaultCamera
  const usedDomElement = domElement ?? defaultDomElement

  const controls = useMemo(() => new CameraControlsImpl(usedCamera), [usedCamera])

  const invalidate = useThree(state => state.invalidate)
  const get = useThree(state => state.get)
  const set = useThree(state => state.set)

  const resetDeltaRef = useRef(false)

  useFrame((_state, delta) => {
    if (controls.enabled) {
      controls.update(resetDeltaRef.current ? 0 : delta)
    }
  }, -1)

  useEffect(() => {
    controls.connect(usedDomElement)
    return () => controls.disconnect()
  }, [controls, usedDomElement])

  useEffect(() => {
    const callback: CameraControlsUpdateHandler = (e) => {
      // Fixes jumps when calling methods after long delay since last frame
      resetDeltaRef.current = e.type === 'transitionstart'

      if (regress) performRegress()

      invalidate()
      onChange?.(e)
    }

    /* controls.addEventListener('control', console.log)
    controls.addEventListener('controlend', console.log)
    controls.addEventListener('controlstart', console.log)
    controls.addEventListener('rest', console.log)
    controls.addEventListener('sleep', console.log)
    controls.addEventListener('transitionstart', console.log)
    controls.addEventListener('update', console.log)
    controls.addEventListener('wake', console.log) */

    // Triggered by clicks
    controls.addEventListener('controlstart', callback)

    // Triggered by mouse wheel and method calls
    controls.addEventListener('transitionstart', callback)

    // Triggered by user controls
    controls.addEventListener('control', callback)

    // Required to correctly finish transitions
    controls.addEventListener('update', callback)

    return () => {
      /* controls.removeEventListener('control', console.log)
      controls.removeEventListener('controlend', console.log)
      controls.removeEventListener('controlstart', console.log)
      controls.removeEventListener('rest', console.log)
      controls.removeEventListener('sleep', console.log)
      controls.removeEventListener('transitionstart', console.log)
      controls.removeEventListener('update', console.log)
      controls.removeEventListener('wake', console.log) */

      controls.removeEventListener('controlstart', callback)
      controls.removeEventListener('transitionstart', callback)
      controls.removeEventListener('control', callback)
      controls.removeEventListener('update', callback)
    }
  }, [controls, invalidate, onChange, performRegress, regress])

  useEffect(() => {
    if (makeDefault) {
      const old = get().controls
      set({ controls: controls as unknown as EventDispatcher })
      return () => set({ controls: old })
    }
  }, [controls, get, makeDefault, set])

  return <primitive ref={ref} object={controls} {...restProps} />
})
