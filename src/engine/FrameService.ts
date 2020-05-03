import Universe from 'src/entities/Universe';
import GenericBody from 'src/entities/BaseBody';
import { getDemo } from './Demo';

export default class FrameService {
  private continueDrawing = true;
  private universe: Universe;
  private drawStack: GenericBody[];

  public constructor(private ctx: CanvasRenderingContext2D) {
    const universeData = getDemo();
    this.universe = new Universe(universeData);

    this.drawStack = this.universe.getAllBodies();
  }

  public sortDrawStack() {
    this.drawStack.sort((a, b) => a.center.z - b.center.z);
  }

  public onWindowResize(): void {}

  public startDrawing = (): void => {
    const { ctx } = this;
    const { width, height } = ctx.canvas;

    const drawFrame = () => {
      this.universe.updatePositions();
      this.sortDrawStack();
      ctx.clearRect(0, 0, width, height);
      this.drawStack.forEach((body) => body.draw(ctx));

      if (this.continueDrawing) {
        window.requestAnimationFrame(drawFrame);
      } else {
        return;
      }
    };

    drawFrame();
  };

  public stopDrawing(): void {
    this.continueDrawing = false;
  }
}
