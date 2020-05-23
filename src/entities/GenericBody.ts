import { colors } from '~/common';
import Orbit from 'engine/Orbit';
import Vec3 from 'engine/Vec3';

type allowedColor = typeof colors[keyof typeof colors];

// A base class for all body types to extend from, includes all shared functionality
export default abstract class GenericBody {
  protected radius: number; // radius of body in pixels
  protected color: allowedColor; // color of body, allowedColors stored in colors object in oddsNSods.ts (great naming m8)
  protected velocity: number; // angle in degrees that body moves around its orbit, per frame
  protected orbit: Orbit;
  public id: Symbol;
  public drawPath = false;
  public center: Vec3; // Bodies curretn absolute position

  public constructor() {
    this.id = Symbol('space-circle');
  }

  public abstract updatePosition(): void;

  // Takes canvas context and draws body to it
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    this.drawPath && this.orbit.drawPath(ctx);
    // Drawing body
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'white';
    const { x, y, z } = this.center;
    const radius = this.getPerspectiveRadius(z);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  public setOrbitElevation(angleInDegrees: number): void {
    this.orbit.setElevationAngle(angleInDegrees);
  }
  public getOrbitElevation(): number {
    return this.orbit.getElevationAngle();
  }

  public setOrbitTilt(angleInDegrees: number): void {
    this.orbit.setTiltAngle(angleInDegrees);
  }
  public getOrbitTilt(): number {
    return this.orbit.getTiltAngle();
  }

  public setVelocity(v: number): void {
    this.velocity = v;
  }
  public getVelocity(): number {
    return this.velocity;
  }

  public togglePathDrawing(): void {
    this.drawPath = !this.drawPath;
  }

  // uses current z position to scale radius, giving the effect of depth
  private getPerspectiveRadius(zPosition: number): number {
    /* TODO: Come up with a better way of scaling the radius.
    Need to think of a way to find the max z value and use that,
    rather than 2000 simply because it works for most screen sizes.
    (Well, okay, i actually used it thinking 1920x1080 is going to
      be the max (not necessarily true) and 2000 is a nice even number but still) */
    const perspectiveCoeffecient = (zPosition + 2000) / 2000;

    return this.radius * perspectiveCoeffecient;
  }
}
