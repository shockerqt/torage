export class Input {
  mouse = { x: 0, y: 0, wheel: 0};
  buttonMap: { [key: string]: { holding: boolean, down: boolean, up: boolean } } = {};

  constructor(canvas: HTMLCanvasElement) {
    const element = canvas;

    element.oncontextmenu = () => false;

    const noDefault = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    element.onwheel = (event: WheelEvent) => {
      this.mouse.wheel += event.deltaY;
      noDefault(event);
    };

    element.onmousedown = (event: MouseEvent) => {
      const key = `mouse${event.button}`;
      if (!this.buttonMap[key]) this.init(key);
      const button = this.buttonMap[key];

      // If holding for first time, set down to true, else set to false
      if (!button.holding) button.down = true;

      // Update button holding value
      button.holding = true;

      noDefault(event);
    };

    element.onmouseup = (event: MouseEvent) => {
      const key = `mouse${event.button}`;
      if (!this.buttonMap[key]) this.init(key);
      const button = this.buttonMap[key];

      // If holding for first time, set down to true, else set to false
      if (button.holding) button.up = true;

      // Update button holding value
      button.holding = false;

      noDefault(event);
    };

    element.onmousemove = (event: MouseEvent) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    };

    onkeydown = (event: KeyboardEvent) => {
      if (!this.buttonMap[event.key]) this.init(event.key);
      const button = this.buttonMap[event.key];

      // If holding for first time, set down to true, else set to false
      if (!button.holding) button.down = true;

      // Update button holding value
      button.holding = true;

      noDefault(event);
    };

    onkeyup = (event: KeyboardEvent) => {
      if (!this.buttonMap[event.key]) this.init(event.key);
      const button = this.buttonMap[event.key];

      // If holding for first time, set down to true, else set to false
      if (button.holding) button.up = true;

      // Update button holding value
      button.holding = false;

      noDefault(event);
    };
  }

  private init(button: string) {
    const initState = {
      holding: false,
      down: false,
      up: false,
    };

    this.buttonMap[button] = initState;
  }

  public holding(button: string): boolean {
    if (!this.buttonMap[button]) this.init(button);

    return this.buttonMap[button].holding;
  }

  public down(button: string): boolean {
    if (!this.buttonMap[button]) this.init(button);

    return this.buttonMap[button].down;
  }

  public up(button: string): boolean {
    if (!this.buttonMap[button]) this.init(button);

    return this.buttonMap[button].up;
  }

  public update(): void {
    Object.values(this.buttonMap).forEach((value) => {
      value.down = false;
      value.up = false;
    });
    this.mouse.wheel = 0;
  }

}
