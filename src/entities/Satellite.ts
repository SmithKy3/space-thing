import SphericalCoordinate from 'src/engine/SphericalCoordinate';
import { getRandomNumber, colors } from 'src/common/badGlobalConstants';
import Star from './Star';
import GenericBody from './BaseBody';
import { IInitialSatelliteData } from './types';
import Vec3 from 'src/engine/Vec3';
import Orbit from 'src/engine/Orbit';

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
