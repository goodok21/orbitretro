import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Column from 'components/Column'
import { useRecoilState } from 'recoil'
import { columnListState } from 'recoil_state'

const ColumnsContainer = () => {
  const [columns] = useRecoilState(columnListState)
  // const [cards, setCards] = useRecoilState(cardListState)

  // const returnItemsForColumn = (columnName) => {
  //   return items
  //     .filter((item) => item.column === columnName)
  //     .map((item, index) => (
  //       <MovableItem
  //         key={item.id}
  //         name={item.name}
  //         currentColumnName={item.column}
  //         setItems={setItems}
  //         index={index}
  //         moveCardHandler={moveCardHandler}
  //       />
  //     ))
  // }

  // const { DO_IT, IN_PROGRESS, AWAITING_REVIEW } = COLUMN_NAMES

  return (
    <div className="flex flex-row min-h-screen justify-items-stretch p-6 bg-background">
      <div className="flex-1 grid grid-flow-col auto-cols-fr gap-10">
        <DndProvider backend={HTML5Backend}>
          {columns.map((column) => (
            <Column key={column.id} {...column} />
          ))}
          {/* <Column title={DO_IT}>{returnItemsForColumn(DO_IT)}</Column>
          <Column title={IN_PROGRESS}>
            {returnItemsForColumn(IN_PROGRESS)}
          </Column>
          <Column title={AWAITING_REVIEW}>
            {returnItemsForColumn(AWAITING_REVIEW)}
          </Column> */}
        </DndProvider>
      </div>
    </div>
  )
}

export default ColumnsContainer
