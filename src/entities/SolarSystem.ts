import { getRandomNumber } from 'src/common/badGlobalConstants';
import Vec3 from 'src/engine/Vec3';
import GenericBody from './BaseBody';
import Star from './Star';
import Satellite from './Satellite';
import { IInitialSystemData } from './types';

export default class SolarSystem {
  private star: Star;
  private satellites: Satellite[];

  public constructor(params: IInitialSystemData) {
    const { starData, satellitesData } = params;
    this.star = new Star(starData);
    this.satellites = [];

    satellitesData.forEach((satelliteDatum) =>
      this.satellites.push(new Satellite(this.star, satelliteDatum))
    );
  }

  public getAllBodies(): GenericBody[] {
    return [this.star, ...this.satellites];
  }

  public updatePositions = (): void => {
    this.star.updatePosition();
    this.satellites.forEach((sat) => sat.updatePosition());
  };

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this.star.draw(ctx);
    this.satellites.forEach((sat) => sat.draw(ctx));
  };
}
