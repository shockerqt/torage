[torage](../README.md) / [Exports](../modules.md) / Mesh

# Class: Mesh

Class representing a mesh.
Mesh allows to join multiple geometries in a body.

**`author`** Fabián Jaña

## Table of contents

### Constructors

- [constructor](Mesh.md#constructor)

### Properties

- [geometries](Mesh.md#geometries)
- [position](Mesh.md#position)
- [rotation](Mesh.md#rotation)
- [scale](Mesh.md#scale)

### Methods

- [add](Mesh.md#add)
- [init](Mesh.md#init)
- [render](Mesh.md#render)
- [setParameters](Mesh.md#setparameters)
- [updateTransformationMatrix](Mesh.md#updatetransformationmatrix)

## Constructors

### constructor

• **new Mesh**(`geometry?`, `initTransformation?`)

Creates a mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geometry?` | [`Geometry`](Geometry.md) | The first geometry attached to the mesh. |
| `initTransformation?` | `GeometryParameters` | Initial position, scale and rotation. |

#### Defined in

[mesh.ts:22](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L22)

## Properties

### geometries

• `Private` **geometries**: [`Geometry`](Geometry.md)[]

#### Defined in

[mesh.ts:11](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L11)

___

### position

• **position**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Defined in

[mesh.ts:13](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L13)

___

### rotation

• **rotation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Defined in

[mesh.ts:14](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L14)

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

[mesh.ts:15](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L15)

## Methods

### add

▸ **add**(`geometry`): `void`

Add a new geometry to the mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geometry` | [`Geometry`](Geometry.md) | Geometry to attach to this mesh. |

#### Returns

`void`

#### Defined in

[mesh.ts:45](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L45)

___

### init

▸ **init**(`device`, `cameraUniformBuffer`, `lightDataBuffer`, `lightDataSize`): `void`

Initialize all the geometries on the mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `device` | `GPUDevice` | Device on which the mesh will be rendered. |
| `cameraUniformBuffer` | `GPUBuffer` | Uniform Buffer to control the camera. |
| `lightDataBuffer` | `GPUBuffer` | Uniform Buffer to control the lights. |
| `lightDataSize` | `number` | Size of the lights. |

#### Returns

`void`

#### Defined in

[mesh.ts:35](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L35)

___

### render

▸ **render**(`passEncoder`, `device`): `void`

Render each geometry from the mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `passEncoder` | `GPURenderPassEncoder` | Render pass encoder on which the geometries will be drawn. |
| `device` | `GPUDevice` | Device on which the geometries will be rendered. |

#### Returns

`void`

#### Defined in

[mesh.ts:54](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L54)

___

### setParameters

▸ **setParameters**(`parameters?`): `void`

Set a new position, scale or rotation to the mesh.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parameters?` | `GeometryParameters` | Parameters to set. |

#### Returns

`void`

#### Defined in

[mesh.ts:111](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L111)

___

### updateTransformationMatrix

▸ `Private` **updateTransformationMatrix**(): `void`

Update the transformations matrices of the geometries.

#### Returns

`void`

#### Defined in

[mesh.ts:88](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/mesh.ts#L88)
