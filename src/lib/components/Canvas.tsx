import type { CanvasProps } from '@react-three/fiber'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import { LinearSRGBColorSpace, NoToneMapping } from 'three'

export function Canvas(props: CanvasProps) {
  const { legacy = true, gl, children, ...restProps } = props

  return (
    <R3FCanvas
      frameloop="demand"
      legacy={legacy}
      gl={{
        toneMapping: NoToneMapping,
        outputColorSpace: LinearSRGBColorSpace,
        ...gl,
      }}
      {...restProps}
    >
      {children}
    </R3FCanvas>
  )
}
