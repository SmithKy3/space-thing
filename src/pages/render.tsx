import * as React from 'react';
import styled from 'styled-components';
import { WarpSpeed, WarpSpeedObject } from 'warpspeed';
import FrameService from 'engine/FrameService';

const HomeButton = styled.i`
  position: fixed;
  z-index: 10;
  top: 5vh;
  left: 5vw;
  font-size: 2rem;
  color: white;

  &:hover {
    color: var(--retroRed);
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

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
