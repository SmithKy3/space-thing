import { getRandomNumber } from 'src/common/badGlobalConstants';
import GenericBody from './BaseBody';
import SolarSystem from './SolarSystem';
import { IInitialSystemData } from './types';

export default class Universe {
  private systems: SolarSystem[];

  public constructor(allSystemsData: IInitialSystemData[]) {
    this.systems = [];
    allSystemsData.forEach((systemDatum) =>
      this.systems.push(new SolarSystem(systemDatum))
    );
  }

  public getAllBodies = (): GenericBody[] =>
    this.systems.reduce((bodies, system) => {
      bodies.push(...system.getAllBodies());
      return bodies;
    }, []);

  public updatePositions = (): void =>
    this.systems.forEach((system) => system.updatePositions());

  public draw = (ctx: CanvasRenderingContext2D): void =>
    this.systems.forEach((system) => system.draw(ctx));
}
