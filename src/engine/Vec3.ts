import SphericalCoordinate from './SphericalCoordinate';
import Vec2 from './Vec2';

// 3D vector class used for almost all coordinates and related calculations
export default class Vec3 {
  /* x is left to right on the screen, y is up top to bottom and z is in/out of the screen */
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

  // Returns a new Vec3 instance with identical components to the existing one
  public clone(): Vec3 {
    const { _x, _y, _z } = this;

    return new Vec3(_x, _y, _z);
  }

  // Adds current vector and one that is passed (good for translating instance the method is called from )
  public add(translation: Vec3): Vec3 {
    const { _x, _y, _z } = translation;

    // You'll see all methods return the current instance where possible, so that they can be daisy-chained
    return this.translateByScalars(_x, _y, _z);
  }

  // Same as above, but backwards
  public sub(translation: Vec3): Vec3 {
    const { _x, _y, _z } = translation;

    return this.translateByScalars(-_x, -_y, -_z);
  }

  // Performs scalar multiplication to this instance using the passed value
  public scale(scalar: number): Vec3 {
    this._x *= scalar;
    this._y *= scalar;
    this._z *= scalar;

    return this;
  }

  // Returns the dot product of this instance and another vector passed as a prameter
  public dot(other: Vec3): number {
    const { _x: x1, _y: y1, _z: z1 } = this;
    const { _x: x2, _y: y2, _z: z2 } = other;

    return x1 * x2 + y1 * y2 + z1 * z2;
  }

  // Returns the cross product of this instance and another vector passed as a prameter
  public cross(other: Vec3): Vec3 {
    const { _x: x1, _y: y1, _z: z1 } = this;
    const { _x: x2, _y: y2, _z: z2 } = other;

    return new Vec3(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2);
  }

  // Returns the magnitude/length of this vector
  public magnitude(): number {
    const { _x, _y, _z } = this;

    return Math.sqrt(_x ** 2 + _y ** 2 + _z ** 2);
  }

  // Reduces this vector's magnitude to one, but maintains the direction
  public normalise(): Vec3 {
    const { _x, _y, _z } = this;
    const magnitude = Math.sqrt(_x ** 2 + _y ** 2 + _z ** 2);

    if (magnitude === 1) {
      return this;
    }

    this.scale(1 / magnitude);

    return this;
  }

  // Returns the Eucladian distance between this vector and the one passed as a parameter
  public distanceTo(other: Vec3): number {
    const { _x: x1, _y: y1, _z: z1 } = this;
    const { _x: x2, _y: y2, _z: z2 } = other;

    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
  }

  // Translates this vector to the points given
  public translateTo(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;

    return this;
  }

  // Translates the current instance by the quantities given in each dimension
  public translateByScalars(x: number, y: number, z: number): Vec3 {
    this._x += x;
    this._y += y;
    this._z += z;

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

  // Converts this vector to a 2d vector using x and y components only
  public toXYVector(): Vec2 {
    const { _x, _y } = this;

    return new Vec2(_x, _y);
  }

  // Converts this vector to spherical form (useful for defining/working with angles)
  public toSpherical(): SphericalCoordinate {
    const { _x, _y, _z } = this;
    const r = Math.sqrt(_x ** 2 + _y ** 2 + _z ** 2);
    const theta = Math.acos(_z / r);
    const phi = Math.atan(_y / _x);

    return new SphericalCoordinate(r, theta, phi);
  }

  // The below methods return unit vectors in the stated axes, primarily used for rotating about said axes

  public static getXAxis(): Vec3 {
    return new Vec3(1, 0, 0);
  }
  public static getYAxis(): Vec3 {
    return new Vec3(0, 1, 0);
  }
  public static getZAxis(): Vec3 {
    return new Vec3(0, 0, 1);
  }
}
