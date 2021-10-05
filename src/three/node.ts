export class Node {
  name: string;
  children: Array<Node> = [];
  composite: Array<Body> = [];

  constructor(name: string) {
    this.name = name;
  }

  public attachObject(body: Body): void {
    this.composite.push(body);
  }
}
