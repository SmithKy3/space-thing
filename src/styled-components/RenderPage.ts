import styled from 'styled-components';

export const HomeButton = styled.i`
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

export const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;
