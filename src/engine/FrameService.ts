import { getInitialSystemData } from '~/Startup';
import GenericBody from '~/entities/GenericBody';
import Star from '~/entities/Star';
import Satellite from '~/entities/Satellite';
import { EventBus, EventType } from '~/engine/EventBus';

// Class responsible for handling all canvas drawing
export default class FrameService {
  private frameId: number;
  private drawStack = new Array<GenericBody>();

  public constructor(private ctx: CanvasRenderingContext2D) {}

  // Adds a body (star/satellite) to the draw stack
  public addBody(...bodies: GenericBody[]) {
    this.drawStack.push(...bodies);
  }

  // Same as above but backwards
  public removeBody(id: Symbol) {
    const i = this.drawStack.findIndex((body) => body.id === id);

    if (!i) {
      return;
    }

    this.drawStack.splice(i, 1);
  }

  // Sorts draw stack so that bodies with a higher z position are drawn first
  public sortDrawStack() {
    this.drawStack.sort((a, b) => a.center.z - b.center.z);
  }

  public onWindowResize(): void {
    /* Currently the canvas automatically resizes and rescales itself on resize but the bodies need to respond to this too.
    Need to think about how to calculate relative new positions and sizes for all bodies on resize. Hmm... */

    // For now, I'll just restart the demo
    this.initDemo();
  }

  // Starts drawing of all bodies in draw stack in continuous loop, using requestAnimationFrame
  public startDrawing = (): void => {
    const { ctx } = this;
    const { width, height } = ctx.canvas;

    const drawFrame = () => {
      this.drawStack.forEach((body) => {
        body.updatePosition();
      });

      this.sortDrawStack();
      ctx.clearRect(0, 0, width, height);

      this.drawStack.forEach((body) => {
        body.draw(ctx);
      });

      this.frameId = window.requestAnimationFrame(drawFrame);
    };

    drawFrame();
  };

  // Uses animation frame id to stop drawing loop
  public stopDrawing = (): void => {
    if (!this.frameId) {
      return;
    }

    window.cancelAnimationFrame(this.frameId);
  };

  // I dont really like this being here but for now, it kinda needs to be
  public initDemo(): void {
    const demoData = getInitialSystemData();
    const star = new Star(demoData.starData);
    const sat = new Satellite(star, demoData.satData[0]);
    this.drawStack.length = 0;
    this.addBody(star);
    this.addBody(sat);

    EventBus.publish(EventType.BodySelected, sat);
  }
}
