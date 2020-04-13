import * as React from 'react';
import styled, { css } from 'styled-components';
import Head from 'next/head';
import Canvas from 'src/components/Canvas';

const HomeButton = styled.i`
  position: fixed;
  z-index: 10;
  top: 5vh;
  left: 5vw;
  font-size: 2rem;
  color: var(--retroGreen);
  text-shadow: 1px 1px 30px var(--retroGreen);

  &:hover {
    color: var(--retroRed);
  }
`;

const Space: React.FC = () => {
  return (
    <>
      <Head key="spacePage">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <a href="/">
        <HomeButton className="material-icons">home</HomeButton>
      </a>

      <Canvas />
    </>
  );
};

export default Space;
