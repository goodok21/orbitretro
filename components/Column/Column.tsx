import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { useRecoilState } from 'recoil'
import MovableItem from 'components/MovableItem'
import { cardListState } from 'recoil_state'
import { ItemTypes } from '../../constants'
import clsx from 'clsx'
import { ICard, IColumn } from 'types'

const Column: React.FC<IColumn> = ({ id, title }) => {
  const [cards, setCards] = useRecoilState<Array<ICard>>(cardListState)

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = cards[dragIndex]

    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      })
    )
  }

  return (
    <div
      ref={drop}
      className={clsx(
        'flex flex-col p-4 gap-6 rounded-xl bg-brandLighter border-2 border-transparent transition-all',
        isOver && 'border-slate-300 bg-brandLight'
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex justify-center align-middle bg-brandLight rounded-md px-2">
          <span className="text-brand text-lg">
            {cards.filter(({ column }) => column === id).length}
          </span>
        </div>
      </div>

      {cards
        .filter((card) => card.column === id)
        .map((card, index) => (
          <MovableItem
            key={card.id}
            index={index}
            moveCardHandler={moveCardHandler}
            {...card}
          />
        ))}
    </div>
  )
}

export default Column
