// light xyz position
[[block]] struct LightData {
  lightPos: vec3<f32>;
};

// output from vertex stage shader
struct FragmentInput {
  [[location(0)]] fragColor: vec3<f32>;
  [[location(1)]] fragNorm: vec3<f32>;
  [[location(2)]] uv: vec2<f32>;
  [[location(3)]] fragPos: vec3<f32>;
};

// bind light data buffer
[[group(0), binding(3)]] var<uniform> lightData: LightData;

// constants for light
let ambientLightFactor: f32 = 0.25; // ambient light

[[stage(fragment)]]
fn main(input : FragmentInput) -> [[location(0)]] vec4<f32> {
  let lightDirection: vec3<f32> = normalize(lightData.lightPos - input.fragPos);

  // lambert factor
  let lambertFactor: f32 = dot(lightDirection, input.fragNorm);

  var lightFactor: f32 = lambertFactor;
  let lightingFactor: f32 = max(min(lightFactor, 1.0), ambientLightFactor);

  return vec4<f32>(input.fragColor * lightingFactor, 1.0);
}