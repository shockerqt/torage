[torage](../README.md) / [Exports](../modules.md) / Renderer

# Class: Renderer

## Table of contents

### Constructors

- [constructor](Renderer.md#constructor)

### Properties

- [cameraUniformBuffer](Renderer.md#camerauniformbuffer)
- [canvas](Renderer.md#canvas)
- [context](Renderer.md#context)
- [device](Renderer.md#device)
- [initialized](Renderer.md#initialized)
- [lightDataBuffer](Renderer.md#lightdatabuffer)
- [presentationFormat](Renderer.md#presentationformat)
- [presentationSize](Renderer.md#presentationsize)
- [renderPassDescriptor](Renderer.md#renderpassdescriptor)

### Methods

- [init](Renderer.md#init)
- [render](Renderer.md#render)

## Constructors

### constructor

• **new Renderer**(`canvas`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `canvas` | `HTMLCanvasElement` |

#### Defined in

[renderer.ts:16](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L16)

## Properties

### cameraUniformBuffer

• `Private` **cameraUniformBuffer**: `GPUBuffer`

#### Defined in

[renderer.ts:13](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L13)

___

### canvas

• `Private` **canvas**: `HTMLCanvasElement`

#### Defined in

[renderer.ts:7](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L7)

___

### context

• `Private` **context**: `GPUCanvasContext`

#### Defined in

[renderer.ts:8](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L8)

___

### device

• `Private` **device**: `GPUDevice`

#### Defined in

[renderer.ts:9](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L9)

___

### initialized

• **initialized**: `boolean` = `false`

#### Defined in

[renderer.ts:5](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L5)

___

### lightDataBuffer

• `Private` **lightDataBuffer**: `GPUBuffer`

#### Defined in

[renderer.ts:14](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L14)

___

### presentationFormat

• `Private` **presentationFormat**: `GPUTextureFormat`

#### Defined in

[renderer.ts:11](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L11)

___

### presentationSize

• `Private` **presentationSize**: `GPUExtent3D`

#### Defined in

[renderer.ts:10](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L10)

___

### renderPassDescriptor

• `Private` **renderPassDescriptor**: `GPURenderPassDescriptor`

#### Defined in

[renderer.ts:12](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L12)

## Methods

### init

▸ **init**(`scene`, `camera`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | [`Scene`](Scene.md) |
| `camera` | [`Camera`](Camera.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[renderer.ts:21](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L21)

___

### render

▸ **render**(`scene`, `camera`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | [`Scene`](Scene.md) |
| `camera` | [`Camera`](Camera.md) |

#### Returns

`void`

#### Defined in

[renderer.ts:81](https://github.com/shockerqt/torage/blob/96c778f/src/renderer/renderer.ts#L81)
