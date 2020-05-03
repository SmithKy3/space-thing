import * as React from 'react';
import Head from 'next/head';
import { Title, About, RenderPageLink } from 'src/styled-components/HomePage';
import { BIO } from 'src/common/badGlobalConstants';

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
