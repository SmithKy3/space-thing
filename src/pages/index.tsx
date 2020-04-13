import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { Title, About, BlastOff } from 'src/components/HomePage';

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

      <About></About>

      <BlastOff href="/theFinalFrontier">To infinity... and beyond!</BlastOff>
    </>
  );
};

export default Home;
