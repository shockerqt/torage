export class Input {
  mouse = { x: 0, y: 0};
  buttonMap: { [key: string]: { holding: boolean, down: boolean, up: boolean } } = {};

  constructor(canvas: HTMLCanvasElement) {
    const element = canvas;

    element.oncontextmenu = () => false;

    const noDefault = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    element.onmousedown = (event) => {
      console.log(event);
      noDefault(event);
    };

    element.onmouseup = (event) => {
      console.log(event);
      noDefault(event);
    };

    element.onmousemove = (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    };

    element.onkeydown = (event) => {
      if (!this.buttonMap[event.key]) this.init(event.key);
      const button = this.buttonMap[event.key];

      // If holding for first time, set down to true, else set to false
      if (!button.holding) button.down = true;

      // Update button holding value
      button.holding = true;

      noDefault(event);
    };

    element.onkeyup = (event) => {
      if (!this.buttonMap[event.key]) this.init(event.key);
      const button = this.buttonMap[event.key];

      // If holding for first time, set down to true, else set to false
      if (button.holding) button.up = true;

      // Update button holding value
      button.holding = false;

      noDefault(event);
    };
  }

  private init(key: string) {
    const initState = {
      holding: false,
      down: false,
      up: false,
    };

    this.buttonMap[key] = initState;
  }

  public holding(key: string): boolean {
    if (!this.buttonMap[key]) this.init(key);

    return this.buttonMap[key].holding;
  }

  public down(key: string): boolean {
    if (!this.buttonMap[key]) this.init(key);

    return this.buttonMap[key].down;
  }

  public up(key: string): boolean {
    if (!this.buttonMap[key]) this.init(key);

    return this.buttonMap[key].up;
  }

  public update(): void {
    Object.values(this.buttonMap).forEach((value) => {
      value.down = false;
      value.up = false;
    });
  }

}
