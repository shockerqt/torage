[[block]] struct Uniforms {     // 4x4 transform matrices
  transform: mat4x4<f32>;    // translate AND rotate
  rotate: mat4x4<f32>;       // rotate only
};
[[block]] struct Camera {     // 4x4 transform matrix
  matrix: mat4x4<f32>;
};
[[block]] struct Color {        // RGB color
  color: vec3<f32>;
};

// bind model/camera/color buffers
[[group(0), binding(0)]] var<uniform> modelTransform: Uniforms;
[[group(0), binding(2)]] var<uniform> cameraTransform: Camera;
[[group(0), binding(1)]] var<storage,read> color: Color;

// output struct of this vertex shader
struct VertexOutput {
  [[builtin(position)]] Position: vec4<f32>;
  [[location(0)]] fragColor: vec3<f32>;
  [[location(1)]] fragNorm: vec3<f32>;
  [[location(2)]] uv: vec2<f32>;
  [[location(3)]] fragPos: vec3<f32>;
};

// input struct according to vertex buffer stride
struct VertexInput {
  [[location(0)]] position: vec3<f32>;
  [[location(1)]] norm: vec3<f32>;
  [[location(2)]] uv: vec2<f32>;
};

[[stage(vertex)]]
fn main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  var transformedPosition: vec4<f32> = modelTransform.transform * vec4<f32>(input.position, 1.0);
  output.Position = cameraTransform.matrix * transformedPosition;             // transformed with model & camera projection
  output.fragColor = color.color;                                             // fragment color from buffer
  output.fragNorm = (modelTransform.rotate * vec4<f32>(input.norm, 1.0)).xyz; // transformed normal vector with model
  output.uv = input.uv;                                                       // transformed uv
  output.fragPos = transformedPosition.xyz;                                   // transformed fragment position with model
  return output;
}