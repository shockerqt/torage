import { Camera } from './camera';
import { Scene } from './scene';

export class Renderer {
  public initialized = false;

  private canvas: HTMLCanvasElement;
  private context!: GPUCanvasContext;
  private device!: GPUDevice;
  private presentationSize!: GPUExtent3D;
  private presentationFormat!: GPUTextureFormat;
  private renderPassDescriptor!: GPURenderPassDescriptor;
  private cameraUniformBuffer!: GPUBuffer;
  private lightDataBuffer!: GPUBuffer;

  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) throw new Error('Missing canvas');
    this.canvas = canvas;
  }

  public async init(scene: Scene, camera: Camera): Promise<void> {
    if (this.initialized) {
      console.warn('Already initialized');
    }

    const adapter = await navigator.gpu.requestAdapter() as GPUAdapter;
    this.device = await adapter.requestDevice() as GPUDevice;

    if (!this.device) throw new Error('No gpu found');

    this.context = this.canvas.getContext('webgpu') as GPUCanvasContext;

    this.presentationFormat = this.context.getPreferredFormat(adapter);
    this.presentationSize = [
      this.canvas.clientWidth * devicePixelRatio,
      this.canvas.clientHeight * devicePixelRatio,
    ];

    this.context.configure({
      device: this.device,
      format: this.presentationFormat,
      size: this.presentationSize,
    });

    this.renderPassDescriptor = {
      colorAttachments: [
        {
          view: undefined,
          loadValue: { r: 0.25, g: 0.25, b: 0.25, a: 1.0 },
        },
      ],
      depthStencilAttachment: {
        view: this.device.createTexture({
          size: this.presentationSize,
          format: 'depth24plus-stencil8',
          usage: GPUTextureUsage.RENDER_ATTACHMENT,
        }).createView(),
        depthLoadValue: 1.0,
        depthStoreOp: 'store',
        stencilLoadValue: 0,
        stencilStoreOp: 'store',
      },
    } as GPURenderPassDescriptor;

    this.cameraUniformBuffer = this.device.createBuffer({
      size: Camera.matrixSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.lightDataBuffer = this.device.createBuffer({
      size: Scene.lightDataSize,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    scene.init(this.device, this.cameraUniformBuffer, this.lightDataBuffer);
    camera.init(this.canvas.width / this.canvas.height);

    this.initialized = true;
  }

  public render(scene: Scene, camera: Camera): void {
    if (!this.initialized) throw Error('Not initialized');

    // camera buffer
    const cameraViewProjectionMatrix = camera.getCameraViewProjMatrix() as Float32Array;
    this.device.queue.writeBuffer(
      this.cameraUniformBuffer,
      0,
      cameraViewProjectionMatrix.buffer,
      cameraViewProjectionMatrix.byteOffset,
      cameraViewProjectionMatrix.byteLength
    );

    // light buffer
    const lightPosition = scene.getPointLightPosition();
    this.device.queue.writeBuffer(
      this.lightDataBuffer,
      0,
      lightPosition.buffer,
      lightPosition.byteOffset,
      lightPosition.byteLength
    );

    const { colorAttachments } = this.renderPassDescriptor;
    (colorAttachments as [GPURenderPassColorAttachment])[0].view = this.context.getCurrentTexture().createView();

    const commandEncoder = this.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass(this.renderPassDescriptor);

    scene.getMeshes().forEach(mesh => {
      mesh.render(passEncoder, this.device);
    });

    passEncoder.endPass();
    this.device.queue.submit([commandEncoder.finish()]);
  }
}
