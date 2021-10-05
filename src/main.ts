import { Camera, Input, Renderer, Scene } from '.';

export class Main {
  static input: Input;
  static updateArray: Array<(delta: number) => void> = [];
  static timestamp = 0;
  static delta = 0;
  static initialized = false;
  static pause = false;
  static canvas?: HTMLCanvasElement;
  static scene: Scene = new Scene;
  static camera: Camera = new Camera;
  static renderer?: Renderer;

  static update(callback: (delta: number) => void): void {
    Main.updateArray.push(callback);
  }

  static async init(canvas: HTMLCanvasElement): Promise<void> {
    Main.canvas = canvas;
    Main.input = new Input(Main.canvas);
    Main.renderer = new Renderer(Main.canvas);
    Main.initialized = true;

    const render = async (timestamp: number) => {
      Main.delta = timestamp - Main.timestamp;
      Main.timestamp = timestamp;

      if (!Main.pause) {
        Main.updateArray.forEach((tick) => {
          tick(timestamp);
        });
      }

      Main.renderer?.render(Main.scene, Main.camera);
      Main.input.update();
      requestAnimationFrame(render);
    };

    await Main.renderer.init(Main.scene, Main.camera);
    requestAnimationFrame(render);
  }

}
