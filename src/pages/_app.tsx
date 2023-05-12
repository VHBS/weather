import '@component/styles/globals.css';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { WeatherContextProvider } from '@component/contexts/WeatherContext';

const lato = Lato({ weight: ['100', '300', '400', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${lato.style.fontFamily};
          color: black;
          min-width: 520px;
        }
      `}</style>
      <WeatherContextProvider>
        <Head>
          <title>Weather</title>
        </Head>
        <Component {...pageProps} />
      </WeatherContextProvider>
    </>
  );
}
