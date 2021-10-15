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
  private vertexShader: string;
  private fragmentShader: string;

  public vertices: { pos: number[]; norm: number[]; uv: number[]; }[];
  public scale: { x: number; y: number; z: number; };
  public color: { r: number; g: number; b: number; a: number };
  public transformMatrix = mat4.create() as Float32Array;
  public rotateMatrix = mat4.create() as Float32Array;
  public pipeline!: GPURenderPipeline;
  public verticesBuffer!: GPUBuffer;
  public transformationBuffer!: GPUBuffer;
  public colorBuffer!: GPUBuffer;
  public bindGroup!: GPUBindGroup;

  /**
   * Creates a geometry.
   * @param scale - Initial scale
   * @param color - Color of the geometry
   */
  constructor (
    vertices: { pos: number[]; norm: number[]; uv: number[]; }[],
    vertexShader: string,
    fragmentShader: string,
    scale?: { x: number; y: number; z: number; },
    color?: { r: number; g: number; b: number; a: number }
  ) {
    this.vertices = vertices;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.scale = scale || { x: 1, y: 1, z: 1 };
    this.color = color || { r: 0.5, g: 0.7, b: 0.3, a: 1 };
  }

  /**
   * Initialize this geometry.
   * @param device - Device on which the geometry will be rendered.
   * @param cameraUniformBuffer - Uniform Buffer to control the camera.
   * @param lightDataBuffer - Uniform Buffer to control the lights.
   * @param lightDataSize - Size of the lights.
   */
  public init(
    device: GPUDevice,
    cameraUniformBuffer: GPUBuffer,
    lightDataBuffer: GPUBuffer,
    lightDataSize: number
  ): void {
    const uniformBufferSize = 256; // 256b aligned?
    const matrixSize = 4 * 16; // 4x4 matrix
    const vertexSize = (3 + 3 + 2); // 3 for position, 3 for normal, 2 for uv, 3 for color
    const stride = vertexSize * 4; // ( 3 (pos) + 3 (norm) + 2 (uv) ) * 4 bytes

    this.pipeline = device.createRenderPipeline({
      vertex: {
        module: device.createShaderModule({ code: this.vertexShader }),
        entryPoint: 'main',
        buffers: [
          {
            arrayStride: stride,
            attributes: [
              { // position
                shaderLocation: 0,
                offset: 0,
                format: 'float32x3',
              },
              { // norm
                shaderLocation: 1,
                offset: 3 * 4,
                format: 'float32x3',
              },
              { // uv
                shaderLocation: 2,
                offset: (3 + 3) * 4,
                format: 'float32x2',
              },
            ],
          } as GPUVertexBufferLayout,
        ],
      },
      fragment: {
        module: device.createShaderModule({ code: this.fragmentShader }),
        entryPoint: 'main',
        targets: [
          {
            format: 'bgra8unorm' as GPUTextureFormat,
          },
        ],
      },
      primitive: {
        topology: 'triangle-list',
        cullMode: 'back',
      },
      // Enable depth testing so that the fragment closest to the camera
      // is rendered in front.
      depthStencil: {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus-stencil8',
      },
    });

    this.verticesBuffer = device.createBuffer({
      size: this.vertices.length * stride,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });

    const mapping = new Float32Array(this.verticesBuffer.getMappedRange());
    this.vertices.forEach((vertex, i) => {
      // (3 * 4) + (3 * 4) + (2 * 4)
      mapping.set([
        vertex.pos[0] * this.scale.x,
        vertex.pos[1] * this.scale.y,
        vertex.pos[2] * this.scale.z,
      ], vertexSize * i + 0);
      mapping.set(vertex.norm, vertexSize * i + 3);
      mapping.set(vertex.uv, vertexSize * i + 6);
    });
    this.verticesBuffer.unmap();

    this.transformationBuffer = device.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.colorBuffer = device.createBuffer({
      size: Float32Array.BYTES_PER_ELEMENT * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const entries = [
      {
        binding: 0,
        resource: {
          buffer: this.transformationBuffer,
          offset: 0,
          size: matrixSize * 2,
        },
      },
      {
        binding: 1,
        resource: {
          buffer: this.colorBuffer,
          offset: 0,
          size: Float32Array.BYTES_PER_ELEMENT * 4,
        },
      },
      {
        binding: 2,
        resource: {
          buffer: cameraUniformBuffer,
          offset: 0,
          size: matrixSize,
        },
      },
      {
        binding: 3,
        resource: {
          buffer: lightDataBuffer,
          offset: 0,
          size: lightDataSize,
        },
      },

    ];

    this.bindGroup = device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: entries as Iterable<GPUBindGroupEntry>,
    });

  }
}
