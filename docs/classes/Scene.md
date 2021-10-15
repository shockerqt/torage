[torage](../README.md) / [Exports](../modules.md) / Scene

# Class: Scene

## Table of contents

### Constructors

- [constructor](Scene.md#constructor)

### Properties

- [meshes](Scene.md#meshes)
- [pointLightPosition](Scene.md#pointlightposition)
- [lightDataSize](Scene.md#lightdatasize)

### Methods

- [add](Scene.md#add)
- [getMeshes](Scene.md#getmeshes)
- [getPointLightPosition](Scene.md#getpointlightposition)
- [init](Scene.md#init)

## Constructors

### constructor

• **new Scene**()

## Properties

### meshes

• `Private` **meshes**: [`Mesh`](Mesh.md)[] = `[]`

#### Defined in

[scene.ts:9](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L9)

___

### pointLightPosition

• **pointLightPosition**: `Float32Array`

#### Defined in

[scene.ts:7](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L7)

___

### lightDataSize

▪ `Static` **lightDataSize**: `number`

#### Defined in

[scene.ts:6](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L6)

## Methods

### add

▸ **add**(`mesh`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | [`Mesh`](Mesh.md) |

#### Returns

`void`

#### Defined in

[scene.ts:11](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L11)

___

### getMeshes

▸ **getMeshes**(): [`Mesh`](Mesh.md)[]

#### Returns

[`Mesh`](Mesh.md)[]

#### Defined in

[scene.ts:19](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L19)

___

### getPointLightPosition

▸ **getPointLightPosition**(): `Float32Array`

#### Returns

`Float32Array`

#### Defined in

[scene.ts:23](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L23)

___

### init

▸ **init**(`device`, `cameraUniformBuffer`, `lightDataBuffer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `device` | `GPUDevice` |
| `cameraUniformBuffer` | `GPUBuffer` |
| `lightDataBuffer` | `GPUBuffer` |

#### Returns

`void`

#### Defined in

[scene.ts:15](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/scene.ts#L15)
