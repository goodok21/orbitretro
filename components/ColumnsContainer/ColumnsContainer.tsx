import Column from 'components/Column'
import MovableItem from 'components/MovableItem'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { COLUMN_NAMES } from '../../constants'

const { DO_IT } = COLUMN_NAMES
export const tasks = [
  { id: 1, name: 'Item 1', column: DO_IT },
  { id: 2, name: 'Item 2', column: DO_IT },
  { id: 3, name: 'Item 3', column: DO_IT },
  { id: 4, name: 'Item 4', column: DO_IT },
]

const ColumnsContainer = () => {
  const [items, setItems] = useState(tasks)

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex]

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState]

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0])

        return coppiedStateArray
      })
    }
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

  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES

  return (
    <div className="grid grid-flow-col auto-cols-max gap-2">
      <DndProvider backend={HTML5Backend}>
        <Column title={DO_IT}>{returnItemsForColumn(DO_IT)}</Column>
        <Column title={IN_PROGRESS}>{returnItemsForColumn(IN_PROGRESS)}</Column>
        <Column title={AWAITING_REVIEW}>
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE}>{returnItemsForColumn(DONE)}</Column>
      </DndProvider>
    </div>
  )
}

export default ColumnsContainer
