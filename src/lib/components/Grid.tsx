import type { GridProps as DreiGridProps } from '@react-three/drei'
import type { RefObject } from 'react'
import type { ColorRepresentation, Mesh } from 'three'
import { Grid as DreiGrid } from '@react-three/drei'

export interface GridProps extends DreiGridProps {
  ref?: RefObject<Mesh>
  color?: ColorRepresentation
}

export function Grid({ ref, color, ...props }: GridProps) {
  return (
    <DreiGrid
      ref={ref}
      args={[10, 10]}
      cellSize={1}
      cellThickness={1}
      cellColor={color}
      sectionSize={10}
      sectionThickness={1.5}
      sectionColor={color}
      fadeDistance={256}
      infiniteGrid
      {...props}
    />
  )
}
