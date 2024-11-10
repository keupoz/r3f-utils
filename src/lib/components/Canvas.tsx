import type { CanvasProps } from '@react-three/fiber'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import { forwardRef } from 'react'
import { LinearSRGBColorSpace, NoToneMapping } from 'three'

export const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
  const { legacy = true, gl, children, ...restProps } = props

  return (
    <R3FCanvas
      ref={ref}
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
})
