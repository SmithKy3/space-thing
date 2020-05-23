import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { colors, WELCOME_TEXT, INSPO_TEXT, TODO_LIST } from '~/common';

const FadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;
const PageTitle = styled.div`
  position: relative;
  width: 70vw;
  margin: 5vh 0 10vh 15vw;
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

const TextArea = styled.div`
  box-sizing: border-box;
  padding: 1rem 2rem;
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.75);
  text-align: let;
  font-size: 1rem;
  font-family: 'DM Mono';

  > h1 {
    font-size: 2rem;
    text-decoration: underline;
  }

  > ol {
    list-style-position: inside;
  }

  > a {
    color: ${colors.retroGreen};
    text-decoration: italic;
  }
`;

const Welcome = styled(TextArea)`
  width: 60vw;
  margin: 5vh 20vw;
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
const RenderButton = styled.button`
  position: relative;
  width: 30vw;
  box-sizing: border-box;
  margin: 5vh 0 0 35vw;
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

const Inspiration = styled(TextArea)`
  float: left;
  width: 40vw;
  margin: 20vh 5vw;
`;

const ToDo = styled(TextArea)`
  float: right;
  width: 40vw;
  margin: 20vh 5vw;
`;

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dude, where's my space?</title>
      </Head>

      <PageTitle>Get Outer My Space</PageTitle>

      <Welcome>{WELCOME_TEXT}</Welcome>

      <a href="/render">
        <RenderButton>Hello. World:</RenderButton>
      </a>

      <Inspiration>
        <h1>Inspiration</h1>
        <br />
        {INSPO_TEXT}{' '}
        <a target="_blank" href="https://github.com/smithky3/space-thing">
          here
        </a>
        .
      </Inspiration>

      <ToDo>
        <h1>To Do:</h1>
        <ul>
          {TODO_LIST.map((todo) => (
            <>
              <br />
              <li>{todo}</li>
            </>
          ))}
        </ul>
      </ToDo>
    </>
  );
};

export default Home;
