import GenericBody from '~/entities/GenericBody';

export default class FrameService {
  private frameId: number;
  private drawStack = new Array<GenericBody>();

  public constructor(private ctx: CanvasRenderingContext2D) {}

  public addBody(...bodies: GenericBody[]) {
    this.drawStack.push(...bodies);
  }

  public removeBody(id: Symbol) {
    const i = this.drawStack.findIndex((body) => body.id === id);

    if (!i) {
      return;
    }

    this.drawStack.splice(i, 1);
  }

  public sortDrawStack() {
    this.drawStack.sort((a, b) => a.center.z - b.center.z);
  }

  public onWindowResize(): void {}

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

  public stopDrawing = (): void => {
    window.cancelAnimationFrame(this.frameId);
  };
}
