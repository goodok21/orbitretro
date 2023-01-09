import { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'
import { COLUMN_NAMES } from '../../constants'

type ColumnProps = PropsWithChildren<Readonly<{ title: string }>>

const Column: React.FC<ColumnProps> = ({ children, title }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES
      const { currentColumnName } = item
      return (
        currentColumnName === title ||
        (currentColumnName === DO_IT && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS &&
          (title === DO_IT || title === AWAITING_REVIEW)) ||
        (currentColumnName === AWAITING_REVIEW &&
          (title === IN_PROGRESS || title === DONE)) ||
        (currentColumnName === DONE && title === AWAITING_REVIEW)
      )
    },
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
      className="flex flex-col p-2 gap-6 border rounded"
      // style={{ backgroundColor: getBackgroundColor() }}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}

export default Column
