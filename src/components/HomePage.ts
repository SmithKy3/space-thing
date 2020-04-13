import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;
export const Title = styled.div`
  position: fixed;
  top: 5vh;
  left: 15vw;
  width: 70vw;
  height: max-content;
  text-align: center;
  font-family: Righteous, Times;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--retroGreen);
  text-shadow 1px 1px 20px var(--retroGreen);
  animation: ${FadeIn} 5s;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 0.25rem;
    background: var(--retroRed);
    border-radius: 10px;
    box-shadow 1px 1px 20px 1px var(--retroRed);
  }
`;

export const About = styled.div`
  position: fixed;
  top: 20vh;
  left: 20vw;
  width: 60vw;
  height: 50vh;
  background-color: white;
`;

const rotatingBorders = keyframes``;
export const BlastOff = styled.a`
  position: fixed;
  top: 75vh;
  left: 40vw;
  width: 20vw;
  height: max-content;
  text-align: center;
  font-family: Righteous, Times;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--retroGreen);
`;
