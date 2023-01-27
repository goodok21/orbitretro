import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import Column from 'components/Column'
import MovableItem from 'components/MovableItem'
import { COLUMN_NAMES } from '../../constants'

const { DO_IT } = COLUMN_NAMES

export const tasks = [
  { id: 1, name: 'one', column: DO_IT },
  { id: 2, name: 'two', column: DO_IT },
  { id: 3, name: 'three', column: DO_IT },
  { id: 4, name: 'four', column: DO_IT },
]

const ColumnsContainer = () => {
  const [items, setItems] = useState(tasks)

  // console.table(items)

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex]
    console.log(
      '🚀 ~ file: ColumnsContainer.tsx:26 ~ moveCardHandler ~ dragItem',
      dragItem
    )

    setItems(
      update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      })
    )
  }

  const returnItemsForColumn = (columnName) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ))
  }

  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW } = COLUMN_NAMES

  return (
    <div className="flex flex-row min-h-screen justify-items-stretch p-6 bg-background">
      <div className="flex-1 grid grid-flow-col auto-cols-fr gap-10">
        <DndProvider backend={HTML5Backend}>
          <Column title={DO_IT}>{returnItemsForColumn(DO_IT)}</Column>
          <Column title={IN_PROGRESS}>
            {returnItemsForColumn(IN_PROGRESS)}
          </Column>
          <Column title={AWAITING_REVIEW}>
            {returnItemsForColumn(AWAITING_REVIEW)}
          </Column>
        </DndProvider>
      </div>
    </div>
  )
}

export default ColumnsContainer
