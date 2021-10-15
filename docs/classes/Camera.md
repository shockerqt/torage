[torage](../README.md) / [Exports](../modules.md) / Camera

# Class: Camera

## Table of contents

### Constructors

- [constructor](Camera.md#constructor)

### Properties

- [aspect](Camera.md#aspect)
- [far](Camera.md#far)
- [fovy](Camera.md#fovy)
- [lookAt](Camera.md#lookat)
- [near](Camera.md#near)
- [position](Camera.md#position)
- [rotation](Camera.md#rotation)
- [matrixSize](Camera.md#matrixsize)

### Methods

- [getCameraViewProjMatrix](Camera.md#getcameraviewprojmatrix)
- [getProjectionMatrix](Camera.md#getprojectionmatrix)
- [getViewMatrix](Camera.md#getviewmatrix)
- [init](Camera.md#init)

## Constructors

### constructor

• **new Camera**()

## Properties

### aspect

• **aspect**: `number`

#### Defined in

[camera.ts:10](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L10)

___

### far

• **far**: `number` = `1000`

#### Defined in

[camera.ts:13](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L13)

___

### fovy

• **fovy**: `number`

#### Defined in

[camera.ts:9](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L9)

___

### lookAt

• **lookAt**: `vec3`

#### Defined in

[camera.ts:15](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L15)

___

### near

• **near**: `number` = `0.1`

#### Defined in

[camera.ts:12](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L12)

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

[camera.ts:6](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L6)

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

[camera.ts:7](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L7)

___

### matrixSize

▪ `Static` **matrixSize**: `number`

#### Defined in

[camera.ts:4](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L4)

## Methods

### getCameraViewProjMatrix

▸ **getCameraViewProjMatrix**(): `mat4`

#### Returns

`mat4`

#### Defined in

[camera.ts:38](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L38)

___

### getProjectionMatrix

▸ **getProjectionMatrix**(): `mat4`

#### Returns

`mat4`

#### Defined in

[camera.ts:32](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L32)

___

### getViewMatrix

▸ **getViewMatrix**(): `mat4`

#### Returns

`mat4`

#### Defined in

[camera.ts:21](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L21)

___

### init

▸ **init**(`aspect`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `aspect` | `number` |

#### Returns

`void`

#### Defined in

[camera.ts:17](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/camera.ts#L17)
