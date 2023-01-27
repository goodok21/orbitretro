import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'
import { COLUMN_NAMES, ItemTypes } from '../../constants'

type ColumnProps = PropsWithChildren<Readonly<{ title: string }>>

const Column: React.FC<ColumnProps> = ({ children, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    // canDrop: (item: any) => {
    //   const { DO_IT, IN_PROGRESS, AWAITING_REVIEW } = COLUMN_NAMES
    //   const { currentColumnName } = item

    //   return (
    //     currentColumnName === title ||
    //     (currentColumnName === DO_IT && title === IN_PROGRESS) ||
    //     (currentColumnName === IN_PROGRESS &&
    //       (title === DO_IT || title === AWAITING_REVIEW)) ||
    //     (currentColumnName === AWAITING_REVIEW &&
    //       (title === IN_PROGRESS || title === DONE)) ||
    //     (currentColumnName === DONE && title === AWAITING_REVIEW)
    //   )
    // },
  })

  // const getBackgroundColor = () => {
  //   if (isOver) {
  //     if (canDrop) {
  //       return 'rgb(188,251,255)'
  //     } else if (!canDrop) {
  //       return 'rgb(255,188,188)'
  //     }
  //   } else {
  //     return ''
  //   }
  // }

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
      {children}
    </div>
  )
}

export default Column
