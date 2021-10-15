[torage](../README.md) / [Exports](../modules.md) / Geometry

# Class: Geometry

Class representing a geometry.

**`author`** Fabián Jaña

## Hierarchy

- **`Geometry`**

  ↳ [`CubeGeometry`](CubeGeometry.md)

## Table of contents

### Constructors

- [constructor](Geometry.md#constructor)

### Properties

- [color](Geometry.md#color)
- [pipeline](Geometry.md#pipeline)
- [rotateMatrix](Geometry.md#rotatematrix)
- [scale](Geometry.md#scale)
- [transformMatrix](Geometry.md#transformmatrix)
- [transformationBindGroup](Geometry.md#transformationbindgroup)
- [transformationBuffer](Geometry.md#transformationbuffer)
- [vertices](Geometry.md#vertices)
- [verticesBuffer](Geometry.md#verticesbuffer)

### Methods

- [init](Geometry.md#init)

## Constructors

### constructor

• **new Geometry**(`scale?`, `color?`)

Creates a geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scale?` | `Object` | Initial scale |
| `scale.x` | `number` | - |
| `scale.y` | `number` | - |
| `scale.z` | `number` | - |
| `color?` | `Object` | Color of the geometry |
| `color.b` | `number` | - |
| `color.g` | `number` | - |
| `color.r` | `number` | - |

#### Defined in

[geometry.ts:33](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L33)

## Properties

### color

• **color**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `b` | `number` |
| `g` | `number` |
| `r` | `number` |

#### Defined in

[geometry.ts:19](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L19)

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Defined in

[geometry.ts:22](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L22)

___

### rotateMatrix

• **rotateMatrix**: `Float32Array`

#### Defined in

[geometry.ts:21](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L21)

___

### scale

• **scale**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Defined in

[geometry.ts:18](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L18)

___

### transformMatrix

• **transformMatrix**: `Float32Array`

#### Defined in

[geometry.ts:20](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L20)

___

### transformationBindGroup

• **transformationBindGroup**: `GPUBindGroup`

#### Defined in

[geometry.ts:26](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L26)

___

### transformationBuffer

• **transformationBuffer**: `GPUBuffer`

#### Defined in

[geometry.ts:25](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L25)

___

### vertices

• **vertices**: `unknown`[]

#### Defined in

[geometry.ts:24](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L24)

___

### verticesBuffer

• **verticesBuffer**: `GPUBuffer`

#### Defined in

[geometry.ts:23](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L23)

## Methods

### init

▸ `Abstract` **init**(`device`, `cameraUniformBuffer`, `lightDataBuffer`, `lightDataSize`): `void`

Initialize this geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `device` | `GPUDevice` | Device on which the geometry will be rendered. |
| `cameraUniformBuffer` | `GPUBuffer` | Uniform Buffer to control the camera. |
| `lightDataBuffer` | `GPUBuffer` | Uniform Buffer to control the lights. |
| `lightDataSize` | `number` | Size of the lights. |

#### Returns

`void`

#### Defined in

[geometry.ts:48](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L48)
