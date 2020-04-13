import * as React from 'react';
import styled from 'styled-components';

const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const Canvas: React.FC = () => {
  const resizeCanvas = () => {
    console.log('Resize function is called');
    const { clientWidth, clientHeight } = StyledCanvas;
    StyledCanvas.width = clientWidth;
    StyledCanvas.height = clientHeight;
  };

  React.useEffect(() => {
    window.addEventListener('resize', resizeCanvas);

    return () =>
      window.removeEventListener('resize', () => {
        console.log('Event listenre working');
        resizeCanvas();
        // not working
      });
  });

  return <StyledCanvas id="canvas" />;
};

export default Canvas;
