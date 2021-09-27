class Renderer {
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  static test(): void {
    console.log('TEST');
  }
}

export { Renderer };
