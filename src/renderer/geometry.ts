import { mat4 } from 'gl-matrix';

export interface GeometryParameters {
  /** Position parameters */
  position?: { x?: number, y?: number, z?: number };
  /** Rotation parameters */
  rotation?: { x?: number, y?: number, z?: number };
  /** Scale parameters */
  scale?: { x?: number, y?: number, z?: number };
}

/**
 * Class representing a geometry.
 * @author Fabián Jaña
 */
export abstract class Geometry {
  public scale;
  public color;
  public transformMatrix = mat4.create() as Float32Array;
  public rotateMatrix = mat4.create() as Float32Array;
  public pipeline!: GPURenderPipeline;
  public verticesBuffer!: GPUBuffer;
  public vertices!: unknown[];
  public transformationBuffer!: GPUBuffer;
  public transformationBindGroup!: GPUBindGroup;
  public colorBuffer!: GPUBuffer;

  /**
   * Creates a geometry.
   * @param scale - Initial scale
   * @param color - Color of the geometry
   */
  constructor (
    scale?: { x: number; y: number; z: number; },
    color?: { r: number; g: number; b: number; }
  ) {
    this.scale = scale || { x: 1, y: 1, z: 1 };
    this.color = color || { r: 0.5, g: 0.7, b: 0.3 };
  }

  /**
   * Initialize this geometry.
   * @param device - Device on which the geometry will be rendered.
   * @param cameraUniformBuffer - Uniform Buffer to control the camera.
   * @param lightDataBuffer - Uniform Buffer to control the lights.
   * @param lightDataSize - Size of the lights.
   */
  public abstract init(
    device: GPUDevice,
    cameraUniformBuffer:GPUBuffer,
    lightDataBuffer: GPUBuffer,
    lightDataSize: number,
  ): void;
}
