# React Three Fiber utils

![NPM version](https://img.shields.io/npm/v/@keupoz/r3f-utils)

This is a small set of personal R3F utils I use in my projects.

## Installation

```sh
npm install @keupoz/r3f-utils @react-three/fiber @react-three/drei three camera-controls
```

## Usage

```tsx
import { CameraControls, Canvas, FocusControls, Grid, Lights } from '@keupoz/r3f-utils'
import { Box, PerspectiveCamera } from '@react-three/drei'

export function App() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[32, 32, 32]} />
      <CameraControls makeDefault />

      <Lights />

      <Grid color={0x252525} />

      <FocusControls>
        <Box />
      </FocusControls>
    </Canvas>
  )
}
```

## Included components

### `CameraControls`

Adapted version of [CameraControls](https://drei.docs.pmnd.rs/controls/camera-controls) from Drei. It has fixes for the `demand` frameloop and a bit better structured code.

### `Canvas`

Just the Canvas component from R3F with some preconfigured properties such as `demand` frameloop and linear color space.

### `FocusControls`

A simple components that allows the user to focus the camera on scene object of their choice. Also includes a simple highlight of the hovered object.

How to use:

- Double click on any object to focus on them.
- Double click on empty space to reset focus.

### `Grid`

Just the [Grid](https://drei.docs.pmnd.rs/gizmos/grid) component from Drei with some preconfigured properties.

### `Lights`

A preset of scene lights.

## Included utils

### `setFocus(controls: CameraControls, object: Object3D)`

Internally used by FocusControls. Exposed to be able to set focus on any specified object.

## Known issues

- CameraControls doesn't properly update when its methods are called without enabled transition. I won't bother fixing as I only need them with enabled transition.
