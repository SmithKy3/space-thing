import { colors } from 'common/badGlobalConstants';
import Orbit from 'engine/Orbit';
import Vec3 from 'engine/Vec3';

type allowedColor = typeof colors[keyof typeof colors];

export default abstract class GenericBody {
  protected radius: number; // radius of body in pixels
  protected color: allowedColor; // color of body, allowedColors stored in colors object in oddsNSods.ts (great naming m8)
  protected velocity: number; // angle in degrees that body moves around its orbit, per frame
  protected orbit: Orbit;
  public center: Vec3; // Bodies curretn absolute position

  // Should use SphericalCoordinate position and velocity to rotate position some amount around orbit
  public abstract updatePosition(): void;

  // takes canvas context and draws body to it
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
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

  // uses current z position to scale radius, giving the effect of depth
  private getPerspectiveRadius(zPosition: number): number {
    const perspectiveCoeffecient = (zPosition + 2000) / 2000;

    return this.radius * perspectiveCoeffecient;
  }
}
