import Vec3 from './Vec3';

// Stores a 3D point in spherical format. Useful for creating arbitrary axes for vector rotation
export default class SphericalCoordinate {
  private _r: number; // radius / magnitude / distance from origin to point
  private _theta: number; // polar angle / angle from +ve x-axis to the point in the reference / x-y plane
  private _phi: number; // azimuthal angle / angle from +ve z-axis to the point

  public get r(): number {
    return this._r;
  }
  public set r(val: number) {
    this._r = val;
  }

  public get theta(): number {
    return this._theta;
  }
  public set theta(val: number) {
    /* theta is relative the the x-y plane alone,
    therefore changing it rotates the point about the z-axis */
    const twoPi = Math.PI * 2;
    let newVal = val;

    while (newVal < 0 || newVal > twoPi) {
      newVal += newVal > 0 ? -twoPi : twoPi;
    }

    this._theta = newVal;
  }

  public get phi(): number {
    return this._phi;
  }
  public set phi(val: number) {
    /* phi measures from z-axis to the x-y plane,
    therefore changing it rotates the point about the x-axis */
    const twoPi = Math.PI * 2;
    let newVal = val;

    while (newVal < 0 || newVal > twoPi) {
      newVal += newVal > 0 ? -twoPi : twoPi;
    }

    this._phi = newVal;
  }

  public constructor(r: number, theta: number, phi: number) {
    this.r = r;
    this.theta = theta;
    this.phi = phi;
  }

  // Returns a new identical instance
  public clone(): SphericalCoordinate {
    const { r, theta, phi } = this;
    return new SphericalCoordinate(r, theta, phi);
  }

  // Returns current position in cartesian form, relative to the origin (0, 0, 0)
  public toCartesian(): Vec3 {
    const sinTheta = Math.sin(this.theta);
    const cosTheta = Math.cos(this.theta);
    const sinPhi = Math.sin(this.phi);
    const cosPhi = Math.cos(this.phi);
    const { r } = this;

    const x = r * sinPhi * cosTheta;
    const y = r * sinPhi * sinTheta;
    const z = r * cosPhi;

    return new Vec3(x, y, z);
  }
}
