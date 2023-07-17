import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Orbit Retro</title>
        <meta
          name="description"
          content="Orbit Retro is decentralized agile retrospective"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.variable} font-sans`}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </main>
    </>
  )
}
