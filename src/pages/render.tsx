import * as React from 'react';
import styled from 'styled-components';
// import { WarpSpeed, WarpSpeedObject } from 'warpspeed';
import FrameService from 'engine/FrameService';
import { RightMenu } from 'components/RightMenu';

const HomeButton = styled.i`
  position: fixed;
  z-index: 10;
  top: 5vh;
  left: 1vw;
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

const Render: React.FC<{}> = () => {
  // let background: WarpSpeedObject;
  let backgroundRef = React.createRef<HTMLDivElement>();
  let canvasRef = React.createRef<HTMLCanvasElement>();
  let frameService: FrameService;

  const sizeCanvas = (): void => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const { clientWidth, clientHeight } = canvas;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  };

  const onWindowResize = (): void => {
    sizeCanvas();
    frameService.onWindowResize();
  };

  React.useEffect(() => {
    // background = WarpSpeed();
    // background.mountCanvasTo(backgroundRef.current);
    // background.render();
    /* ^^^^^^^^^^^^^^^^^^^
    I wrote a small NPM package that renders a canvas and runs a star-wars-esque
    warp speed effect. I still want to use it as a background but I need to look
    into some performance problems first, currently makes the FPS take a bit of a hit.
    */

    sizeCanvas();
    window.addEventListener('resize', onWindowResize);

    frameService = new FrameService(canvasRef.current.getContext('2d'));
    frameService.initDemo();
    frameService.startDrawing();

    return () => window.removeEventListener('resize', onWindowResize);
  });

  return (
    <>
      <Background ref={backgroundRef} />
      <a href="/">
        <HomeButton className="material-icons">home</HomeButton>
      </a>

      <StyledCanvas ref={canvasRef} />
      <RightMenu />
    </>
  );
};

export default Render;
