import Head from 'next/head'
import { orbitClient } from 'lib'
import { useEffect } from 'react'
import ColumnsContainer from 'components/ColumnsContainer'

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // orbitClient()
      console.log('run')
    }
  }, [])

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

      <ColumnsContainer />
    </>
  )
}
