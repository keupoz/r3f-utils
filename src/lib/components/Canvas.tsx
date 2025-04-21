import type { CanvasProps } from '@react-three/fiber'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import { LinearSRGBColorSpace, NoToneMapping } from 'three'

export function Canvas({ legacy = true, gl, children, ...props }: CanvasProps) {
  return (
    <R3FCanvas
      frameloop="demand"
      legacy={legacy}
      gl={{
        toneMapping: NoToneMapping,
        outputColorSpace: LinearSRGBColorSpace,
        ...gl,
      }}
      {...props}
    >
      {children}
    </R3FCanvas>
  )
}
