import * as React from 'react';
import { WarpSpeed, WarpSpeedObject } from 'warpspeed';
import {
  HomeButton,
  Background,
  StyledCanvas,
} from 'src/styled-components/RenderPage';
import FrameService from 'src/engine/FrameService';

class Render extends React.Component<{}, {}> {
  private background: WarpSpeedObject;
  private backgroundRef: React.RefObject<HTMLDivElement>;
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private frameService: FrameService;

  private sizeCanvas(): void {
    const canvas = this.canvasRef.current;

    if (!canvas) {
      return;
    }

    const { clientWidth, clientHeight } = canvas;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }

  private onWindowResize = (): void => {
    this.sizeCanvas();
    this.frameService.onWindowResize();
  };

  public constructor(props: {}) {
    super(props);
    this.backgroundRef = React.createRef<HTMLDivElement>();
    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  public componentDidMount(): void {
    this.background = WarpSpeed();
    this.background.mountCanvasTo(this.backgroundRef.current);
    this.background.render();

    this.sizeCanvas();
    window.addEventListener('resize', this.onWindowResize);

    this.frameService = new FrameService(
      this.canvasRef.current.getContext('2d')
    );
    this.frameService.startDrawing();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.onWindowResize);
  }

  public render() {
    return (
      <>
        <Background ref={this.backgroundRef} />
        <a href="/">
          <HomeButton className="material-icons">home</HomeButton>
        </a>

        <StyledCanvas ref={this.canvasRef} />
      </>
    );
  }
}

export default Render;
