import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { gunDB } from 'lib'
import { v4 as uuidv4 } from 'uuid'
import ColumnsContainer from 'components/ColumnsContainer'

export default function Home() {
  const router = useRouter()
  const boardId = router.query.board
  const boardKey = `board:${boardId}`

  const [cards, setCards] = useState([])

  useEffect(() => {
    if (!boardId) {
      return
    }

    if (typeof window !== 'undefined') {
      gunDB
        .get(boardKey)
        .get('cards')
        .map()
        .on((card, key) => {
          if (!card.id) {
            return
          }

          setCards((prevState) => [...new Set([...prevState, card])])
        }, true)

      return () => {
        gunDB.get(boardKey).get('cards').off()
      }
    }
  }, [boardId, boardKey])

  const handleAddCard = () => {
    const cardId = uuidv4()

    const cardData = {
      id: cardId,
      title: 'card1',
      description: 'card1 description',
      time: new Date().valueOf(),
    }

    const card = gunDB.get(boardKey).get(`card:${cardId}`).put(cardData)
    gunDB.get(boardKey).get('cards').set(card)
  }

  const handleUpdateCard = (card) => {
    gunDB.get(card['_']['#']).put({ title: 'card updated 2' })
  }

  const handleRemoveCard = (card) => {
    gunDB
      .get(card['_']['#'])
      .put({ id: null, title: null, description: null, time: null })

    setCards((prevState) => prevState.filter(({ id }) => id !== card.id))
  }

  return (
    <>
      <div className="flex flex-col">
        <button onClick={handleAddCard}>handleAddCard</button>

        <ul className="flex flex-col gap-4">
          {cards.map((card) => (
            <li key={card.id}>
              <h1>{card.title}</h1>
              <p>{card.description}</p>
              <p>{card.time}</p>

              <button
                className="px-6 py-2 m-4 border-amber-400 border-2 rounded-lg"
                onClick={() => handleUpdateCard(card)}
              >
                update
              </button>
              <button onClick={() => handleRemoveCard(card)}>remove</button>
            </li>
          ))}
        </ul>
      </div>

      <ColumnsContainer />
    </>
  )
}
