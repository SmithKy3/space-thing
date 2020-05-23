import Vec3 from './Vec3';
import SphericalCoordinate from './SphericalCoordinate';
import { colors } from '~/common';

// Class for handling current position in orbit and calculating orbit path
export default class Orbit {
  private currentPosition: Vec3; // The current position relative to the page origin
  private path: Path2D;

  public constructor(
    private orbitalRadius: number, // Distance from orbit center to body at any given point
    private orbitOrigin: Vec3, // Point at center of orbit
    private orbitAxis: SphericalCoordinate // Axis which the orbit is rotating about
  ) {
    this.resetPosition();
  }

  // Returns current absolute orbit position (adds current position to orbit origin)
  public getCurrentPosition(): Vec3 {
    return this.orbitOrigin.clone().add(this.currentPosition);
  }

  // Resets position to be 90 degrees from orbit axis
  public resetPosition(): void {
    const sphericalPosition = this.orbitAxis.clone();
    sphericalPosition.r = this.orbitalRadius;
    sphericalPosition.phi -= Math.PI / 2;
    this.currentPosition = sphericalPosition
      .toCartesian()
      .rotateAboutAxis(180, this.orbitAxis.toCartesian());
  }

  // Advances current position around orbit by angle givven
  public shiftPosition(angleInDegrees: number): void {
    this.currentPosition.rotateAboutAxis(
      angleInDegrees,
      this.orbitAxis.toCartesian()
    );
  }

  // Sets the point at the center of the orbit
  public setOrigin(point: Vec3): void {
    this.orbitOrigin = point;
  }

  // Sets elevation angle (angle between z-axis and orbit plane)
  public setElevationAngle(angleInDegrees: number): void {
    this.orbitAxis.phi = angleInDegrees * (Math.PI / 180);

    this.resetPosition();
    this.caclulatePath();
  }
  public getElevationAngle(): number {
    return this.orbitAxis.phi * (180 / Math.PI);
  }

  // Sets tilt angle (angle between x-axis and orbit plane)
  public setTiltAngle(angleInDegrees: number): void {
    this.orbitAxis.theta = angleInDegrees * (Math.PI / 180);

    this.resetPosition();
    this.caclulatePath();
  }
  public getTiltAngle(): number {
    return this.orbitAxis.theta * (180 / Math.PI);
  }

  // Calculates the shape/location of the full orbit and stores it as a Path2D instance for easy drawing later
  private caclulatePath(): void {
    // TODO: Tidy this up, I'm sure there will be a more efficient way of calculating this
    // TODO2: update ellipse center as orbit origin moves (i.e. if entire solar system is also moving)
    const rotationAxis = this.orbitAxis.toCartesian();
    const perpToOrbit = this.orbitAxis.clone();
    perpToOrbit.r = this.orbitalRadius;
    perpToOrbit.phi -= Math.PI / 2;
    const h1 = perpToOrbit.toCartesian();
    const h2 = h1.clone().rotateAboutAxis(180, rotationAxis);
    const yRadius = Math.abs(h1.toXYVector().distanceTo(h2.toXYVector())) / 2;

    const w1 = h1.rotateAboutAxis(90, rotationAxis);
    const w2 = h2.rotateAboutAxis(90, rotationAxis);
    const xRadius = Math.abs(w1.toXYVector().distanceTo(w2.toXYVector())) / 2;
    const { x, y } = this.orbitOrigin;
    const theta = this.orbitAxis.theta + Math.PI / 2;

    const path = new Path2D();
    path.ellipse(x, y, xRadius, yRadius, theta, 0, Math.PI * 2);
    path.closePath();

    this.path = path;
  }

  // Draws orbit path using path property
  public drawPath(ctx: CanvasRenderingContext2D): void {
    if (!this.path) {
      this.caclulatePath();
    }

    ctx.strokeStyle = colors.yellow;
    ctx.stroke(this.path);
  }
}
