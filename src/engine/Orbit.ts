import Vec3 from './Vec3';
import SphericalCoordinate from './SphericalCoordinate';
import { getRandomNumber } from 'src/common/badGlobalConstants';

export default class Orbit {
  private orbitOrigin: Vec3; // A point which is the center of the orbit
  private orbitAxis: Vec3; // A vector representing the axis that the body rotates around in its orbit
  private currentPosition: Vec3; // The bodies position relative to the origin

  public constructor(
    orbitalRadius: number,
    orbitOrigin: Vec3,
    orbitAxis: Vec3
  ) {
    this.orbitAxis = orbitAxis.normalise();
    this.orbitOrigin = orbitOrigin;
    const startAngle = getRandomNumber(0, 360);
    this.currentPosition = new Vec3(orbitalRadius, 0, 0).rotateAboutAxis(
      startAngle,
      this.orbitAxis
    );
  }

  public getCurrentPosition(): Vec3 {
    return this.orbitOrigin.clone().add(this.currentPosition);
  }

  public shift(angleInDegrees: number): void {
    this.currentPosition.rotateAboutAxis(angleInDegrees, this.orbitAxis);
  }

  public updateOrigin(point: Vec3): void {
    this.orbitOrigin = point;
  }
}
