export interface LightsProps {
  /** @default true */
  legacy?: boolean
}

export function Lights({ legacy = true }: LightsProps) {
  const factor = legacy ? Math.PI : 1

  return (
    <>
      <ambientLight intensity={0.5 * factor} />

      <directionalLight intensity={0.25 * factor} position={[0, 1, 1]} />
      <directionalLight intensity={0.25 * factor} position={[0, 1, -1]} />
    </>
  )
}
