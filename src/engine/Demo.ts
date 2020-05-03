import {
  IInitialSystemData,
  IInitialStarData,
  IInitialSatelliteData,
} from 'src/entities/types';
import { getRandomNumber } from 'src/common/badGlobalConstants';
import Vec3 from './Vec3';
import SphericalCoordinate from './SphericalCoordinate';

function* orbitalRadiusGenerator(
  min: number,
  max: number
): IterableIterator<number> {
  let startRadius = getRandomNumber(min, max);

  while (true) {
    const nextRadius = startRadius;
    yield nextRadius;
    startRadius += getRandomNumber(min, max);
  }
}

export const getDemo = (): IInitialSystemData[] => {
  const { clientWidth, clientHeight } = document.body;
  const pageCenter = new Vec3(clientWidth / 2, clientHeight / 2, 0);
  const starRadius = Math.min(clientWidth, clientHeight) / 10;

  const starData: IInitialStarData = {
    radius: starRadius,
    velocity: 0,
    orbitalRadius: 0,
    orbitCenter: pageCenter,
    orbitAxis: new Vec3(0, 1, 0),
  };

  const satelliteRadii = orbitalRadiusGenerator(starRadius, starRadius * 3);
  const satellitesData: IInitialSatelliteData[] = [];
  const orbitAxis = new Vec3(0, 10, -2);

  for (let i = Math.round(getRandomNumber(0, 5)); i > 0; i--) {
    const satDatum = {
      radius: getRandomNumber(starRadius / 8, starRadius / 4),
      velocity: getRandomNumber(-2, 2),
      orbitalRadius: satelliteRadii.next().value,
      orbitAxis,
    };

    satellitesData.push(satDatum);
  }

  const universeData = [{ starData, satellitesData }];
  return universeData;
};
