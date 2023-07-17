import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Column from 'components/Column'
import { useRecoilState } from 'recoil'
import { columnListState } from 'recoil_state'

const ColumnsContainer = () => {
  const [columns] = useRecoilState(columnListState)

  return (
    <div className="flex flex-row min-h-screen justify-items-stretch p-6 bg-background">
      <div className="flex-1 grid grid-flow-col auto-cols-fr gap-10">
        <DndProvider backend={HTML5Backend}>
          {columns.map((column) => (
            <Column key={column.id} {...column} />
          ))}
        </DndProvider>
      </div>
    </div>
  )
}

export default ColumnsContainer
