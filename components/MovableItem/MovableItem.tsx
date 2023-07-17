import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../../constants'
import Card from './Card'

import { ICard } from 'types'

const MovableItem = ({
  id,
  text,
  column,
  index,
  moveCardHandler,
}: ICard & { index: number; moveCardHandler: any }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: any, monitor) {
      console.log('🚀 ~ file: MovableItem.tsx:45 ~ hover ~ item', item)

      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const changeItemColumn = (currentItem, columnName) => {
    console.log(currentItem, columnName)
  }

  const [{ isDragging }, drag] = useDrag({
    item: { index, text, column, type: ItemTypes.CARD },
    // end: (item, monitor) => {
    //   const dropResult: any = monitor.getDropResult()

    //   if (dropResult) {
    //     const { name } = dropResult
    //     if (name) {
    //       changeItemColumn(item, name)
    //     }
    //   }
    // },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: ItemTypes.CARD,
  })

  const opacity = isDragging ? 0.1 : 1
  // const className = `${isDragging ? 'rotate-12' : ''}`

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity }}>
      <Card id={id} text={text} column={column} />
    </div>
  )
}

export default MovableItem
