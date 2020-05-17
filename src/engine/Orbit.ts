import { getRandomNumber } from '~/common';
import Vec3 from './Vec3';

export default class Orbit {
  private orbitOrigin: Vec3; // The center of the orbit
  private orbitAxis: Vec3; // A vector representing the axis that the orbit is rotating around
  private currentPosition: Vec3; // The current position relative to the page origin

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
