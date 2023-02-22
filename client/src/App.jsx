import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "./api/api";
import { InputTodo } from "./components/InputTodo";
import { ListTodos } from "./components/ListTodos";
import { setTodos } from "./features/slices/todosSlice";

export const App = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  async function getTodos() {
    try {
      const todos = await client.get('/todos');

      dispatch(setTodos(todos.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="content-container">
          <InputTodo />

          {todos.length > 0 && (
            <ListTodos 
              todos={todos}
            />
          )}
        </div>
      </div>
    </div>
  )
}
