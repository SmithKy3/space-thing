import { getRandomNumber } from '~/common';
import Vec3 from './engine/Vec3';
import { SystemData } from './entities/SolarSystem';
import { StarData } from './entities/Star';

export function* orbitalRadiusGenerator(
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

export const getInitialSystemData = (): SystemData => {
  const { clientWidth, clientHeight } = document.body;
  const pageCenter = new Vec3(clientWidth / 2, clientHeight / 2, 0);
  const starRadius = Math.min(clientWidth, clientHeight) / 10;

  const starData: StarData = {
    radius: starRadius,
    velocity: 0,
    orbitalRadius: 0,
    orbitCenter: pageCenter,
    orbitAxis: new Vec3(0, 1, 0),
  };

  const orbitalRadius = Math.min(starRadius * 5, clientWidth / 2);
  const orbitAxis = new Vec3(0, 10, -2);

  const satData = [
    {
      radius: getRandomNumber(starRadius / 8, starRadius / 4),
      velocity: getRandomNumber(-2, 2),
      orbitalRadius,
      orbitAxis,
    },
  ];

  return { starData, satData };
};

/*
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
*/
