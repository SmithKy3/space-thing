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

const rotatingBorders = keyframes`
  0% { margin: -4px 0 0 0; transform: scaleX(0); transform-origin: left; }
  12.5% { margin: -4px 0 0 0; transform: scaleX(1); transform-origin: left; }
  12.6% { margin: -4px 0 0 0; transform: scaleX(1); transform-origin: right; }
  25% { margin: -4px 0 0 0; transform: scaleX(0); transform-origin: right; }

  25.1% { margin: 0 -4px 0 0; transform: scaleY(0); transform-origin: top; }
  37.5% { margin: 0 -4px 0 0; transform: scaleY(1); transform-origin: top; }
  37.6% { margin: 0 -4px 0 0; transform: scaleY(1); transform-origin: bottom; }
  50% { margin: 0 -4px 0 0; transform: scaleY(0); transform-origin: bottom; }

  50.1% { margin: 0 0 -4px 0; transform: scaleX(0); transform-origin: right; }
  62.5% { margin: 0 0 -4px 0; transform: scaleX(1); transform-origin: right; }
  62.6% { margin: 0 0 -4px 0; transform: scaleX(1); transform-origin: left; }
  75% { margin: 0 0 -4px 0; transform: scaleX(0); transform-origin: left; }

  75.1% { margin: 0 0 0 -4px; transform: scaleY(0); transform-origin: bottom; }
  87.5% { margin: 0 0 0 -4px; transform: scaleY(1); transform-origin: bottom; }
  87.6% { margin: 0 0 0 -4px; transform: scaleY(1); transform-origin: top; }
  100% { margin: 0 0 0 -4px; transform: scaleY(0); transform-origin: top; }
`;
const colorChase = keyframes`
  0%{ background: transparent; }
  12.5%{ background: var(--retroRed); }
  25%{ background: transparent; }
  37.5%{ background: var(--retroRed); }
  50%{ background: transparent; }
  62.5%{ background: var(--retroRed); }
  75%{ background: transparent; }
  87.5%{ background: var(--retroRed); }
  100%{ background: transparent }
`;
export const BlastOff = styled.a`
  position: fixed;
  top: 75vh;
  left: 35vw;
  width: 30vw;
  height: max-content;
  box-sizing: border-box;
  padding: .5rem;
  text-align: center;
  font-family: Righteous, Times;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--retroGreen);
  text-shadow 1px 1px 20px var(--retroGreen);

  &::before {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -2;
    background: var(--retroRed);
    animation: ${rotatingBorders} 1s infinite, ${colorChase} 1s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -1px;
    background: black;
  }
`;
