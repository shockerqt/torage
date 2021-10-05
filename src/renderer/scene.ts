import { vec3 } from 'gl-matrix';

import { Mesh } from './mesh';

export class Scene {
  public static lightDataSize = 3 * 4; // vec3 size in bytes
  public pointLightPosition = vec3.fromValues(0, 0, 0) as Float32Array;

  private meshes: Mesh[] = [];

  public add(mesh: Mesh): void {
    this.meshes.push(mesh);
  }

  public init(device: GPUDevice, cameraUniformBuffer: GPUBuffer, lightDataBuffer: GPUBuffer): void {
    this.meshes.forEach((mesh: Mesh) => mesh.init(device, cameraUniformBuffer, lightDataBuffer, Scene.lightDataSize));
  }

  public getMeshes(): Mesh[] {
    return this.meshes;
  }

  public getPointLightPosition(): Float32Array {
    return this.pointLightPosition;
  }
}
