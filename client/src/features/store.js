import { configureStore } from '@reduxjs/toolkit'
import querySlice from './slices/querySlice'
import todosSlice from './slices/todosSlice'
import editingTodoSlice from './slices/editingTodoSlice'

export const store = configureStore({
  reducer: {
    query: querySlice,
    todos: todosSlice,
    editingId: editingTodoSlice,
  }
})