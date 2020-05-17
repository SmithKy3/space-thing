import * as React from 'react';
import styled from 'styled-components';
import { WarpSpeed, WarpSpeedObject } from 'warpspeed';
import FrameService from 'engine/FrameService';
import { RightMenu } from 'components/RightMenu';
import { getInitialSystemData } from '~/Startup';
import Star from '~/entities/Star';
import Satellite from '~/entities/Satellite';

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
  let background: WarpSpeedObject;
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
    background = WarpSpeed();
    background.mountCanvasTo(backgroundRef.current);
    background.render();

    sizeCanvas();
    window.addEventListener('resize', onWindowResize);

    const initial = getInitialSystemData();
    const star = new Star(initial.starData);
    const sat = new Satellite(star, initial.satData[0]);
    frameService = new FrameService(canvasRef.current.getContext('2d'));
    frameService.addBody(star);
    frameService.addBody(sat);
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
