import { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

import { fetcher } from "./hooks/fetcher";

function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
export default App;
