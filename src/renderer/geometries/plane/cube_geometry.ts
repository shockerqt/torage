import vertices from './cube_vertices.json';
import vertexShader from '../shaders/vertex_shader.wgsl';
import fragmentShader from '../shaders/fragment_shader.wgsl';

import { Geometry } from '../../geometry';

/**
 * Class representing a cube geometry
 * @author Fabián Jaña
 */
export class CubeGeometry extends Geometry {

  constructor(
    scale?: { x: number; y: number; z: number; },
    color?: { r: number; g: number; b: number; a: number }
  ) {
    super(
      vertices,
      vertexShader,
      fragmentShader,
      scale,
      color
    );
  }
}
