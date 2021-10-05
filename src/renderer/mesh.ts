import { mat4, vec3 } from 'gl-matrix';
import { Geometry, GeometryParameters } from './geometry';

export class Mesh {
  private geometry: Geometry;

  public position = { x: 0, y: 0, z: 0 };
  public rotation = { x: 0, y: 0, z: 0 };
  public scale = { x: 1, y: 1, z: 1 };
  public color: { r: number; g: number; b: number; };

  constructor(geometry: Geometry, initTransformation?: GeometryParameters, color?: { r: number; g: number; b: number; }) {
    this.geometry = geometry;
    this.color = color || { r: 0.5, g: 0.7, b: 0.3 };
    this.setParameters(initTransformation);
  }

  public init(device: GPUDevice, cameraUniformBuffer: GPUBuffer, lightDataBuffer: GPUBuffer, lightDataSize: number): void {
    this.geometry.init(device, cameraUniformBuffer, lightDataBuffer, lightDataSize, this.scale, this.color);
  }

  public render(passEncoder: GPURenderPassEncoder, device: GPUDevice): void {
    this.updateTransformationMatrix();

    passEncoder.setPipeline(this.geometry.pipeline);
    device.queue.writeBuffer(
      this.geometry.transformationBuffer,
      0,
      this.geometry.transformMatrix.buffer,
      this.geometry.transformMatrix.byteOffset,
      this.geometry.transformMatrix.byteLength
    );
    device.queue.writeBuffer(
      this.geometry.transformationBuffer,
      64,
      this.geometry.rotateMatrix.buffer,
      this.geometry.rotateMatrix.byteOffset,
      this.geometry.rotateMatrix.byteLength
    );
    passEncoder.setVertexBuffer(0, this.geometry.verticesBuffer);
    passEncoder.setBindGroup(0, this.geometry.transformationBindGroup);
    passEncoder.draw(this.geometry.vertices.length, 1, 0, 0);
  }


  private updateTransformationMatrix() {
    // MOVE / TRANSLATE OBJECT
    const transform = mat4.create();
    const rotate = mat4.create();

    mat4.translate(transform, transform, vec3.fromValues(this.position.x, this.position.y, this.position.z));
    mat4.rotateX(transform, transform, this.rotation.x);
    mat4.rotateY(transform, transform, this.rotation.y);
    mat4.rotateZ(transform, transform, this.rotation.z);

    mat4.rotateX(rotate, rotate, this.rotation.x);
    mat4.rotateY(rotate, rotate, this.rotation.y);
    mat4.rotateZ(rotate, rotate, this.rotation.z);

    // APPLY
    mat4.copy(this.geometry.transformMatrix, transform);
    mat4.copy(this.geometry.rotateMatrix, rotate);
  }

  public setParameters(parameters?: GeometryParameters): void {
    this.position.x = parameters?.position?.x || this.position.x;
    this.position.y = parameters?.position?.y || this.position.y;
    this.position.z = parameters?.position?.z || this.position.z;

    this.rotation.x = parameters?.rotation?.x || this.rotation.x;
    this.rotation.y = parameters?.rotation?.y || this.rotation.y;
    this.rotation.z = parameters?.rotation?.z || this.rotation.z;

    this.scale.x = parameters?.scale?.x || this.scale.x;
    this.scale.y = parameters?.scale?.y || this.scale.y;
    this.scale.z = parameters?.scale?.z || this.scale.z;
  }

}
