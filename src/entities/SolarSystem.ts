import GenericBody from './GenericBody';
import Star, { StarData } from './Star';
import Satellite, { SatData } from './Satellite';

export interface SystemData {
  starData: StarData;
  satData: SatData[];
}

export default class SolarSystem {
  private star: Star;
  private satellites: Satellite[];

  public constructor({ starData, satData }: SystemData) {
    this.star = new Star(starData);
    this.satellites = [];

    satData.forEach((satDatum) =>
      this.satellites.push(new Satellite(this.star, satDatum))
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
