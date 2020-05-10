import { colors } from 'common/badGlobalConstants';
import GenericBody from './BaseBody';
import Star from './Star';
import { IInitialSatelliteData } from './types';
import Orbit from 'engine/Orbit';

const ALLOWED_SAT_COLORS = [colors.retroGreen, colors.retroRed, colors.skyBlue];

export default class Satellite extends GenericBody {
  public constructor(private parent: Star, params: IInitialSatelliteData) {
    super();

    this.color = ALLOWED_SAT_COLORS.randomEntry();

    this.color = ALLOWED_SAT_COLORS.randomEntry();

    const { radius, velocity, orbitalRadius, orbitAxis } = params;

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
