import vertices from './cube_vertices.json';
import vertexShader from './vertex_shader.wgsl';
import fragmentShader from './fragment_shader.wgsl';

import { Geometry } from '../../geometry';

export class CubeGeometry extends Geometry {
  constructor() {
    super();
    this.vertices = vertices;
  }

  public init(device: GPUDevice, cameraUniformBuffer: GPUBuffer, lightDataBuffer: GPUBuffer, lightDataSize: number, scale: { x: number; y: number; z: number; }, color: { r: number; g: number; b: number; }): void {
    const offset = 256; // transformationBindGroup offset must be 256-byte aligned
    const uniformBufferSize = offset;
    const matrixSize = 4 * 16; // 4x4 matrix

    const vertexSize = ( 3 + 3 + 2 ); // 3 for position, 3 for normal, 2 for uv, 3 for color
    const stride = vertexSize * 4; // ( 3 (pos) + 3 (norm) + 2 (uv) ) * 4 bytes

    this.pipeline = device.createRenderPipeline({
      vertex: {
        module: device.createShaderModule({ code: vertexShader }),
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
        module: device.createShaderModule({ code: fragmentShader }),
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
      size: vertices.length * stride,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });

    const mapping = new Float32Array(this.verticesBuffer.getMappedRange());
    vertices.forEach((vertex, i) => {
      // (3 * 4) + (3 * 4) + (2 * 4)
      mapping.set([
        vertex.pos[0] * scale.x,
        vertex.pos[1] * scale.y,
        vertex.pos[2] * scale.z,
      ], vertexSize * i + 0);
      mapping.set(vertex.norm, vertexSize * i + 3);
      mapping.set(vertex.uv, vertexSize * i + 6);
    });
    this.verticesBuffer.unmap();

    this.transformationBuffer = device.createBuffer({
      size: uniformBufferSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    const colorBuffer = device.createBuffer({
      mappedAtCreation: true,
      size: Float32Array.BYTES_PER_ELEMENT * 3,
      usage: GPUBufferUsage.STORAGE,
    });
    const colorMapping = new Float32Array(colorBuffer.getMappedRange());
    colorMapping.set([color.r, color.g, color.b], 0);
    colorBuffer.unmap();


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
          buffer: colorBuffer,
          offset: 0,
          size: Float32Array.BYTES_PER_ELEMENT * 3,
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

    this.transformationBindGroup = device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: entries as Iterable<GPUBindGroupEntry>,
    });

  }
}
