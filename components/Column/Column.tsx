import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { useRecoilState } from 'recoil'
import MovableItem from 'components/MovableItem'
import { cardListState } from 'recoil_state'
import { Column, ItemTypes } from '../../constants'

const Column: React.FC<Column> = ({ id, title }) => {
  const [cards, setCards] = useRecoilState(cardListState)

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
      className="flex flex-col p-4 gap-6 rounded-xl bg-brandLighter"
      // style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex justify-center align-middle bg-brandLight rounded-md px-2">
          <span className="text-brand text-lg">1</span>
        </div>
      </div>
      {cards
        .filter((card) => card.column === id)
        .map((card, index) => (
          <MovableItem
            // FIXME: key
            key={card.text}
            name={card.text}
            index={index}
            currentColumnName={id}
            // setItems={setItems}
            moveCardHandler={moveCardHandler}
          />
        ))}
    </div>
  )
}

export default Column
