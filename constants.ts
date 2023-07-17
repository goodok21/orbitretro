import { COLUMN_IDS, ICard, IColumn } from 'types'

export const COLUMN_NAMES: Array<IColumn> = [
  {
    id: COLUMN_IDS.DO_IT,
    title: 'Do it',
  },
  {
    id: COLUMN_IDS.IN_PROGRESS,
    title: 'In Progress',
  },
  {
    id: COLUMN_IDS.AWAITING_REVIEW,
    title: 'Awaiting review',
  },
]

export const defaultTasks: Array<ICard> = [
  { id: '1', text: 'one', column: COLUMN_IDS.DO_IT },
  { id: '2', text: 'two', column: COLUMN_IDS.DO_IT },
  { id: '3', text: 'three', column: COLUMN_IDS.IN_PROGRESS },
  { id: '4', text: 'four', column: COLUMN_IDS.AWAITING_REVIEW },
]

export const ItemTypes = {
  CARD: 'card',
}
