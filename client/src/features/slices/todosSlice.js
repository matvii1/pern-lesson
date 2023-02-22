import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo.todo_id !== action.payload;
      });
    },
    updateTodo: (state, { payload }) => {
      state.todos = state.todos.map((todo) => {
        let newTodo = todo;

        if (todo.todo_id === payload.todoId) {
          newTodo.description = payload.newQuery;
        }

        return newTodo;
      });
    },
    deleteAllTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { 
  setTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodo,
  addTodo 
} = todosSlice.actions;
export default todosSlice.reducer;
