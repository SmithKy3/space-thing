import { colors } from '~/common';
import Orbit from 'engine/Orbit';
import Vec3 from 'engine/Vec3';
import GenericBody from './GenericBody';
import Star from './Star';

const ALLOWED_SAT_COLORS = [colors.retroGreen, colors.retroRed, colors.skyBlue];

export interface SatData {
  radius: number;
  velocity: number;
  orbitalRadius: number;
  orbitAxis: Vec3;
}

export default class Satellite extends GenericBody {
  public constructor(
    private parent: Star,
    { radius, velocity, orbitalRadius, orbitAxis }: SatData
  ) {
    super();

    this.color = ALLOWED_SAT_COLORS.randomEntry();

    this.color = ALLOWED_SAT_COLORS.randomEntry();

    this.radius = radius;
    this.velocity = velocity;

    this.orbit = new Orbit(orbitalRadius, parent.center, orbitAxis);
  }

  public updatePosition(): void {
    this.orbit.updateOrigin(this.parent.center);
    this.orbit.shift(this.velocity);
    this.center = this.orbit.getCurrentPosition();
  }
}
