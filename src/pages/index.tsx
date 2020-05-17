import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { BIO } from '~/common';

const FadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;
const Title = styled.div`
  position: relative;
  margin: 5vh 15vw;
  width: 70vw;
  text-align: center;
  font-family: Righteous, Times;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--retroRed);
  text-shadow 1px 1px 20px var(--retroRed);
  animation: ${FadeIn} 5s;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 100%;
    height: 0.25rem;
    background: var(--retroGreen);
    border-radius: 10px;
  }
`;

const About = styled.div`
  margin: 20vh 20vw 0;
  width: 60vw;
  height: 30vh;
  box-sizing: border-box;
  padding: 1rem 2rem;
  box-shadow: 0 0 2px 1px rgb(255, 255, 255, 0.5);
  color: rgb(255, 255, 255, 0.75);
  text-align: center;
  font-size: 1rem;
  font-family: 'Lobster';
`;

const rotatingBorders = keyframes`
  0%, 100% { transform: scaleX(0.01) scaleY(0.6); transform-origin: top left; }
  8.33% { transform: scaleX(0.25) scaleY(0.1); transform-origin: top left; }
  33.32% { transform: scaleX(0.25) scaleY(0.1); transform-origin: top right; }
  41.65% { transform: scaleX(0.01) scaleY(0.6); transform-origin: top right; }
  49.98% { transform: scaleX(0.01) scaleY(0.6); transform-origin: bottom right;}
  58.31% { transform: scaleX(0.25) scaleY(0.1); transform-origin: bottom right; }
  83.3% { transform: scaleX(0.25) scaleY(0.1); transform-origin: bottom left; }
  91.63% { transform: scaleX(0.01) scaleY(0.6); transform-origin: bottom left; }
`;
const RenderPageLink = styled.a`
  position: fixed;
  bottom: 5vh;
  left: 35vw;
  width: 30vw;
  box-sizing: border-box;
  padding: 1.5rem 0.5rem;
  text-align: center;
  font-family: Righteous, Times;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--retroRed);
  text-shadow: 1px 1px 20px var(--retroRed);

  &::before {
    content: '';
    z-index: -2;
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    background: var(--retroGreen);
    animation: ${rotatingBorders} 6s linear infinite;
  }

  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    background: black;
  }
`;

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dude, where's my space?</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Righteous&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Title>
        WEB SPACE ON THE INTER<s>WEB</s>NET
      </Title>

      <About>{BIO}</About>

      <RenderPageLink href="/render">Do the thing</RenderPageLink>
    </>
  );
};

export default Home;
