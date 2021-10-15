import { mat4, vec3 } from 'gl-matrix';
import { Geometry, GeometryParameters } from './geometry';

/**
 * Class representing a mesh.
 * Mesh allows to join multiple geometries in a body.
 * @author Fabián Jaña
 */
export class Mesh {
  private geometries: Geometry[];

  public position = { x: 0, y: 0, z: 0 };
  public rotation = { x: 0, y: 0, z: 0 };
  public scale = { x: 1, y: 1, z: 1 };

  /**
   * Creates a mesh
   * @param geometry - The first geometry attached to the mesh.
   * @param initTransformation - Initial position, scale and rotation.
   */
  constructor(geometry?: Geometry, initTransformation?: GeometryParameters) {
    this.geometries = [];
    this.setParameters(initTransformation);
    if (geometry) this.add(geometry);
  }

  /**
   * Initialize all the geometries on the mesh.
   * @param device - Device on which the mesh will be rendered.
   * @param cameraUniformBuffer - Uniform Buffer to control the camera.
   * @param lightDataBuffer - Uniform Buffer to control the lights.
   * @param lightDataSize - Size of the lights.
   */
  public init(device: GPUDevice, cameraUniformBuffer: GPUBuffer, lightDataBuffer: GPUBuffer, lightDataSize: number): void {
    this.geometries.forEach((geometry) => {
      geometry.init(device, cameraUniformBuffer, lightDataBuffer, lightDataSize);
    });
  }

  /**
   * Add a new geometry to the mesh.
   * @param geometry - Geometry to attach to this mesh.
   */
  public add(geometry: Geometry): void {
    this.geometries.push(geometry);
  }

  /**
   * Render each geometry from the mesh.
   * @param passEncoder - Render pass encoder on which the geometries will be drawn.
   * @param device - Device on which the geometries will be rendered.
   */
  public render(passEncoder: GPURenderPassEncoder, device: GPUDevice): void {
    this.updateTransformationMatrix();

    this.geometries.forEach(geometry => {
      passEncoder.setPipeline(geometry.pipeline);

      // Write position buffer
      device.queue.writeBuffer(
        geometry.transformationBuffer,
        0,
        geometry.transformMatrix.buffer,
        geometry.transformMatrix.byteOffset,
        geometry.transformMatrix.byteLength
      );

      // Write rotation buffer
      device.queue.writeBuffer(
        geometry.transformationBuffer,
        64,
        geometry.rotateMatrix.buffer,
        geometry.rotateMatrix.byteOffset,
        geometry.rotateMatrix.byteLength
      );

      const uniformColor = new Float32Array([geometry.color.r, geometry.color.g, geometry.color.b, geometry.color.a]);
      device.queue.writeBuffer(
        geometry.colorBuffer,
        0,
        uniformColor.buffer,
        uniformColor.byteOffset,
        uniformColor.byteLength
      );

      passEncoder.setVertexBuffer(0, geometry.verticesBuffer);
      passEncoder.setBindGroup(0, geometry.bindGroup);
      passEncoder.draw(geometry.vertices.length, 1, 0, 0);
    });
  }


  /**
   * Update the transformations matrices of the geometries.
   */
  private updateTransformationMatrix() {
    const transform = mat4.create();
    const rotate = mat4.create();

    mat4.translate(transform, transform, vec3.fromValues(this.position.x, this.position.y, this.position.z));
    mat4.rotateX(transform, transform, this.rotation.x);
    mat4.rotateY(transform, transform, this.rotation.y);
    mat4.rotateZ(transform, transform, this.rotation.z);

    mat4.rotateX(rotate, rotate, this.rotation.x);
    mat4.rotateY(rotate, rotate, this.rotation.y);
    mat4.rotateZ(rotate, rotate, this.rotation.z);

    this.geometries.forEach(geometry => {
      mat4.copy(geometry.transformMatrix, transform);
      mat4.copy(geometry.rotateMatrix, rotate);
    });
  }

  /**
   * Set a new position, scale or rotation to the mesh.
   * @param parameters - Parameters to set.
   */
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
