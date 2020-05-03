import Star from './Star';
import Vec3 from 'src/engine/Vec3';

export interface IInitialStarData {
  radius: number;
  velocity: number;
  orbitalRadius: number;
  orbitCenter: Vec3;
  orbitAxis: Vec3;
}

export interface IInitialSatelliteData {
  radius: number;
  velocity: number;
  orbitalRadius: number;
  orbitAxis: Vec3;
}

export interface IInitialSystemData {
  starData: IInitialStarData;
  satellitesData: IInitialSatelliteData[];
}
