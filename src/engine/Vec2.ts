export default class Vec2 {
  /* x is left to right on the screen, y is up/down the screen, in line with the HTML5 canvas */
  public constructor(private _x: number, private _y: number) {}

  public get x() {
    return this._x;
  }
  public get y() {
    return this._y;
  }

  // Returns a new Vec3 instance with identical components to the existing
  public clone(): Vec2 {
    const { _x, _y } = this;
    return new Vec2(_x, _y);
  }

  public magnitude(): number {
    const { _x, _y } = this;
    return Math.sqrt(_x ** 2 + _y ** 2);
  }

  public distanceTo(other: Vec2): number {
    const { _x: x1, _y: y1 } = this;
    const { _x: x2, _y: y2 } = other;

    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}
