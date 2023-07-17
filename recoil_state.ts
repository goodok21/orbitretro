import { ICard } from 'types'
import { COLUMN_NAMES, defaultTasks } from './constants'
import { atom, selector } from 'recoil'

export const columnListState = atom({
  key: 'columnListState',
  default: COLUMN_NAMES,
})

export const cardListState = atom<Array<ICard>>({
  key: 'cardListState',
  default: defaultTasks,
})

// export const cardsInColumn = selector({
//   key: 'cardsInColumn',
//   get: ({ get }) => {
//     const cards = get(cardListState)
//     cards.filter()
//     return
//   }
// })

// const todoListFilterState = atom({
//   key: 'todoListFilterState',
//   default: 'Show All',
// })

// const filteredTodoListState = selector({
//   key: 'filteredTodoListState',
//   get: ({ get }) => {
//     const filter = get(todoListFilterState)
//     const list = get(todoListState)

//     switch (filter) {
//       case 'Show Completed':
//         return list.filter((item) => item.isComplete)
//       case 'Show Uncompleted':
//         return list.filter((item) => !item.isComplete)
//       default:
//         return list
//     }
//   },
// })

// const todoListStatsState = selector({
//   key: 'todoListStatsState',
//   get: ({ get }) => {
//     const todoList = get(todoListState)
//     const totalNum = todoList.length
//     const totalCompletedNum = todoList.filter((item) => item.isComplete).length
//     let allText = ''
//     todoList
//       .filter((item) => !item.isComplete)
//       .map((item) => (allText = allText + ' ' + item.text))
//     const totalUncompletedNum = totalNum - totalCompletedNum
//     const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum

//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//       allText,
//     }
//   },
// })

// export {
//   todoListState,
//   todoListFilterState,
//   filteredTodoListState,
//   todoListStatsState,
// }
