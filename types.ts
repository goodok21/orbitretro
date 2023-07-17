export enum COLUMN_IDS {
  DO_IT,
  IN_PROGRESS,
  AWAITING_REVIEW,
}

export type IColumn = {
  id: COLUMN_IDS
  title: string
}

export type ICard = {
  id: string
  text: string
  column: COLUMN_IDS
}
