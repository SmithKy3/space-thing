import * as React from 'react';
import styled, { css } from 'styled-components';
import Head from 'next/head';
import { HomeButton, StyledCanvas } from 'src/styled-components/RenderPage';
import FrameService from 'src/engine/FrameService';

class Render extends React.Component<{}, {}> {
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
    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  public componentDidMount(): void {
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
        <a href="/">
          <HomeButton className="material-icons">home</HomeButton>
        </a>

        <StyledCanvas ref={this.canvasRef} />
      </>
    );
  }
}

export default Render;
