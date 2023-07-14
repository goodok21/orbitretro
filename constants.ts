export enum COLUMN_IDS {
  DO_IT,
  IN_PROGRESS,
  AWAITING_REVIEW,
}

export type Column = {
  id: COLUMN_IDS
  title: string
}

export const COLUMN_NAMES: Array<Column> = [
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

export const defaultTasks = [
  { id: '1', text: 'one' },
  { id: '2', text: 'two' },
  { id: '3', text: 'three' },
  { id: '4', text: 'four' },
]

export const ItemTypes = {
  CARD: 'card',
}

export type Card = {
  id: string
  text: string
  // column: COLUMN_IDS
}
