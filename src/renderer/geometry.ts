import { mat4 } from 'gl-matrix';

export interface GeometryParameters {
  position?: { x?: number, y?: number, z?: number };
  rotation?: { x?: number, y?: number, z?: number };
  scale?: { x?: number, y?: number, z?: number };
}

export abstract class Geometry {
  public transformMatrix = mat4.create() as Float32Array;
  public rotateMatrix = mat4.create() as Float32Array;
  public pipeline!: GPURenderPipeline;
  public verticesBuffer!: GPUBuffer;
  public vertices!: unknown[];
  public transformationBuffer!: GPUBuffer;
  public transformationBindGroup!: GPUBindGroup;

  public abstract init(device: GPUDevice, cameraUniformBuffer: GPUBuffer, lightDataBuffer: GPUBuffer, lightDataSize: number, scale: { x: number; y: number; z: number; }, color: { r: number; g: number; b: number; }): void;
}
