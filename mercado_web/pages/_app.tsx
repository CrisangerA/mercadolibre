//import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/__main.scss';
///import 'bootstrap/dist/css/bootstrap.min.js'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
