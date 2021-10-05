import { mat4, vec3 } from 'gl-matrix';

export class Camera {
  public static matrixSize = 4 * 16; // 4x4 matrix

  public position = { x: 0, y: 0, z: 0 };
  public rotation = { x: 0, y: 0, z: 0 };

  public fovy: number = (2 * Math.PI) / 5;
  public aspect: number = 16 / 9;

  public near = 0.1;
  public far = 1000;

  public lookAt: vec3 = vec3.fromValues(0, 0, 0);

  public init(aspect: number): void {
    this.aspect = aspect;
  }

  public getViewMatrix(): mat4 {
    const viewMatrix = mat4.create();

    mat4.lookAt(viewMatrix, vec3.fromValues(this.position.x, this.position.y, this.position.z), this.lookAt, vec3.fromValues(0, 1, 0));

    mat4.rotateX(viewMatrix, viewMatrix, this.rotation.x);
    mat4.rotateY(viewMatrix, viewMatrix, this.rotation.y);
    mat4.rotateZ(viewMatrix, viewMatrix, this.rotation.z);
    return viewMatrix;
  }

  public getProjectionMatrix(): mat4 {
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, this.fovy, this.aspect, this.near, this.far);
    return projectionMatrix;
  }

  public getCameraViewProjMatrix(): mat4 {
    const viewProjMatrix = mat4.create();
    const view = this.getViewMatrix();
    const proj = this.getProjectionMatrix();
    mat4.multiply(viewProjMatrix, proj, view);
    return viewProjMatrix;
  }

}
