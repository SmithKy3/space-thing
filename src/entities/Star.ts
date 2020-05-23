import { colors } from '~/common/';
import Orbit from 'engine/Orbit';
import Vec3 from 'engine/Vec3';
import GenericBody from './GenericBody';
import SphericalCoordinate from '~/engine/SphericalCoordinate';

export interface StarData {
  radius: number;
  velocity: number;
  orbitalRadius: number;
  orbitCenter: Vec3;
  orbitAxis: SphericalCoordinate;
}

export default class Star extends GenericBody {
  public constructor({
    radius,
    velocity,
    orbitalRadius,
    orbitCenter,
    orbitAxis,
  }: StarData) {
    super();

    this.color = colors.yellow;

    this.radius = radius;
    this.velocity = velocity;

    this.orbit = new Orbit(orbitalRadius, orbitCenter, orbitAxis);
  }

  public updatePosition(): void {
    this.orbit.shiftPosition(this.velocity);
    this.center = this.orbit.getCurrentPosition();
  }
}
