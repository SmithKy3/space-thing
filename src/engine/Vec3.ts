import SphericalCoordinate from './SphericalCoordinate';

// A three dimensional vector class, to make the calculation of orbit locations, etc. much easier.
export default class Vec3 {
  /* x is left to right on the screen, z is up top to bottom and y is in/out of the screen */
  public constructor(
    private _x: number,
    private _y: number,
    private _z: number
  ) {}

  public get x() {
    return this._x;
  }
  public get y() {
    return this._y;
  }
  public get z() {
    return this._z;
  }

  // Returns a new Vec3 instance with identical components to the existing
  public clone(): Vec3 {
    const { x, y, z } = this;
    return new Vec3(x, y, z);
  }

  // Translates the current instance to the point given in the params
  public translateTo(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  // Translates the current instance by the given quantites (pixels in terms of canvas) in each dimension
  public translateByScalars(x: number, y: number, z: number): Vec3 {
    this._x += x;
    this._y += y;
    this._z += z;

    // Returns the instance so that methods can be chained
    return this;
  }

  public add(translation: Vec3): Vec3 {
    const { x, y, z } = translation;
    return this.translateByScalars(x, y, z);
  }

  public sub(translation: Vec3): Vec3 {
    const { x, y, z } = translation;
    return this.translateByScalars(-x, -y, -z);
  }

  // Performs scalar multiplication to this instance using the given scalar
  public scale(scalar: number): Vec3 {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;

    return this;
  }

  // Returns the dot product of this instance and another vector passed as  aprameter
  public dot(other: Vec3): number {
    const { _x: x1, _y: y1, _z: z1 } = this;
    const { _x: x2, _y: y2, _z: z2 } = other;

    return x1 * x2 + y1 * y2 + z1 * z2;
  }

  // Performs cross product on this instance with otehr vector provided as parameter
  public cross(other: Vec3): Vec3 {
    const { _x: x1, _y: y1, _z: z1 } = this;
    const { _x: x2, _y: y2, _z: z2 } = other;

    return new Vec3(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
  }

  // Replaces this instance with a vector in the same driection but with a magnitude of one
  public normalise(): Vec3 {
    const { x, y, z } = this;
    const magnitude = Math.sqrt(x * x + y * y + z * z);

    if (magnitude === 1) {
      return this;
    }

    this.scale(1 / magnitude);

    return this;
  }

  // Rotates the current instance about the axis param that is passed
  public rotateAboutAxis(angleInDegrees: number, rotationAxis: Vec3): Vec3 {
    const axis = rotationAxis.normalise();
    const parallel = axis.clone().scale(this.dot(axis));
    const perpendicular = this.clone().sub(parallel.clone());

    const radians = angleInDegrees * (Math.PI / 180);
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);

    const rotated = parallel
      .scale(1 - cos)
      .add(this.clone().scale(cos))
      .add(axis.cross(this).scale(sin));
    const { _x, _y, _z } = rotated;
    this._x = _x;
    this._y = _y;
    this._z = _z;

    return this;
  }

  public static getXAxis(): Vec3 {
    return new Vec3(1, 0, 0);
  }
  public static getYAxis(): Vec3 {
    return new Vec3(0, 1, 0);
  }
  public static getZAxis(): Vec3 {
    return new Vec3(0, 0, 1);
  }

  public toCartesian(): SphericalCoordinate {
    const { _x, _y, _z } = this;
    const r = Math.sqrt(_x ** 2 + _y ** 2 + _z ** 2);
    const theta = Math.acos(_z / r);
    const phi = Math.atan(_y / _x);

    return new SphericalCoordinate(r, theta, phi);
  }
}
