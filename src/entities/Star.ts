import { colors } from 'common/badGlobalConstants';
import GenericBody from './BaseBody';
import { IInitialStarData } from './types';
import Orbit from 'engine/Orbit';

export default class Star extends GenericBody {
  public constructor(params: IInitialStarData) {
    super();

    this.color = colors.yellow;

    const { radius, velocity, orbitalRadius, orbitCenter, orbitAxis } = params;

    this.radius = radius;
    this.velocity = velocity;

    this.orbit = new Orbit(orbitalRadius, orbitCenter, orbitAxis);
  }

  public updatePosition(): void {
    this.orbit.shift(this.velocity);
    this.center = this.orbit.getCurrentPosition();
  }
}
