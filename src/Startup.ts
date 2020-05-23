import { getRandomNumber } from '~/common';
import Vec3 from './engine/Vec3';
import { SystemData } from './entities/SolarSystem';
import { StarData } from './entities/Star';
import SphericalCoordinate from './engine/SphericalCoordinate';
import { isMainThread } from 'worker_threads';

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

// Return the data needed to create a single system containing one star and one satellite at the center of the page
export const getInitialSystemData = (): SystemData => {
  const { clientWidth, clientHeight } = document.body;
  const pageCenter = new Vec3(clientWidth / 2, clientHeight / 2, 0);
  const starRadius = Math.min(clientWidth, clientHeight) / 10;
  let orbitAxis = new SphericalCoordinate(1, Math.PI / 2, Math.PI / 2);

  const starData: StarData = {
    radius: starRadius,
    velocity: 0,
    orbitalRadius: 0,
    orbitCenter: pageCenter,
    orbitAxis,
  };

  const orbitalRadius = Math.min(starRadius * 5, clientWidth / 2);
  orbitAxis = orbitAxis.clone();

  const satData = [
    {
      radius: getRandomNumber(starRadius / 8, starRadius / 4),
      velocity: 1,
      orbitalRadius,
      orbitAxis,
    },
  ];

  return { starData, satData };
};
