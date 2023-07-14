import Head from 'next/head'

import { RecoilRoot } from 'recoil'
import ColumnsContainer from 'components/ColumnsContainer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { gunDB } from 'lib'

export default function Home() {
  const router = useRouter()
  const boardId = router.query.board
  const boardKey = `board:${boardId}`

  // const user = gun.user && gun.user();
  useEffect(() => {
    if (!boardId) {
      return
    }

    if (typeof window !== 'undefined') {
      console.log('🚀 ~ file: [board].tsx:23 ~ useEffect ~ boardKey:', boardKey)

      gunDB.get(boardKey).put({
        name: 'test board',
      })

      gunDB.get(boardKey).on((data, key) => {
        console.log('realtime updates:', data, key)
      }, true)

      return () => {
        gunDB.get(boardKey).off()
      }
    }
  }, [boardId, boardKey])

  const handleClick = () => {
    gunDB.get(boardKey).get('live').put(new Date().valueOf())
  }

  return (
    <>
      <Head>
        <title>Orbit Retro | {boardId}</title>
      </Head>

      <button onClick={handleClick}>change</button>

      <RecoilRoot>
        <ColumnsContainer />
      </RecoilRoot>
    </>
  )
}
