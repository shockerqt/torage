[torage](../README.md) / [Exports](../modules.md) / CubeGeometry

# Class: CubeGeometry

## Hierarchy

- [`Geometry`](Geometry.md)

  ↳ **`CubeGeometry`**

## Table of contents

### Constructors

- [constructor](CubeGeometry.md#constructor)

### Properties

- [color](CubeGeometry.md#color)
- [pipeline](CubeGeometry.md#pipeline)
- [rotateMatrix](CubeGeometry.md#rotatematrix)
- [scale](CubeGeometry.md#scale)
- [transformMatrix](CubeGeometry.md#transformmatrix)
- [transformationBindGroup](CubeGeometry.md#transformationbindgroup)
- [transformationBuffer](CubeGeometry.md#transformationbuffer)
- [vertices](CubeGeometry.md#vertices)
- [verticesBuffer](CubeGeometry.md#verticesbuffer)

### Methods

- [init](CubeGeometry.md#init)

## Constructors

### constructor

• **new CubeGeometry**()

Creates a geometry.

#### Overrides

[Geometry](Geometry.md).[constructor](Geometry.md#constructor)

#### Defined in

[geometries/cube/cube_geometry.ts:8](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometries/cube/cube_geometry.ts#L8)

## Properties

### color

• **color**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `b` | `number` |
| `g` | `number` |
| `r` | `number` |

#### Inherited from

[Geometry](Geometry.md).[color](Geometry.md#color)

#### Defined in

[geometry.ts:19](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L19)

___

### pipeline

• **pipeline**: `GPURenderPipeline`

#### Inherited from

[Geometry](Geometry.md).[pipeline](Geometry.md#pipeline)

#### Defined in

[geometry.ts:22](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L22)

___

### rotateMatrix

• **rotateMatrix**: `Float32Array`

#### Inherited from

[Geometry](Geometry.md).[rotateMatrix](Geometry.md#rotatematrix)

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

#### Inherited from

[Geometry](Geometry.md).[scale](Geometry.md#scale)

#### Defined in

[geometry.ts:18](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L18)

___

### transformMatrix

• **transformMatrix**: `Float32Array`

#### Inherited from

[Geometry](Geometry.md).[transformMatrix](Geometry.md#transformmatrix)

#### Defined in

[geometry.ts:20](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L20)

___

### transformationBindGroup

• **transformationBindGroup**: `GPUBindGroup`

#### Inherited from

[Geometry](Geometry.md).[transformationBindGroup](Geometry.md#transformationbindgroup)

#### Defined in

[geometry.ts:26](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L26)

___

### transformationBuffer

• **transformationBuffer**: `GPUBuffer`

#### Inherited from

[Geometry](Geometry.md).[transformationBuffer](Geometry.md#transformationbuffer)

#### Defined in

[geometry.ts:25](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L25)

___

### vertices

• **vertices**: `unknown`[]

#### Inherited from

[Geometry](Geometry.md).[vertices](Geometry.md#vertices)

#### Defined in

[geometry.ts:24](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L24)

___

### verticesBuffer

• **verticesBuffer**: `GPUBuffer`

#### Inherited from

[Geometry](Geometry.md).[verticesBuffer](Geometry.md#verticesbuffer)

#### Defined in

[geometry.ts:23](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometry.ts#L23)

## Methods

### init

▸ **init**(`device`, `cameraUniformBuffer`, `lightDataBuffer`, `lightDataSize`): `void`

Initialize this geometry.

#### Parameters

| Name | Type |
| :------ | :------ |
| `device` | `GPUDevice` |
| `cameraUniformBuffer` | `GPUBuffer` |
| `lightDataBuffer` | `GPUBuffer` |
| `lightDataSize` | `number` |

#### Returns

`void`

#### Overrides

[Geometry](Geometry.md).[init](Geometry.md#init)

#### Defined in

[geometries/cube/cube_geometry.ts:13](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/geometries/cube/cube_geometry.ts#L13)
