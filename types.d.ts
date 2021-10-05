declare module '*.wgsl';

interface HTMLCanvasElement extends HTMLElement {
  getContext(contextId: 'webgpu'): GPUCanvasContext | null;
}
