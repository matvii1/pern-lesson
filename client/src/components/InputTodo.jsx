import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { client } from "../api/api.js";
import { setQuery } from "../features/slices/querySlice.js";
import { addTodo } from "../features/slices/todosSlice.js";

export const InputTodo = () => {
  const query = useSelector(state => state.query.query);
  const dispatch = useDispatch();

  function handleOnChange(e) {
    dispatch(setQuery(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (query.length > 0) {
      try {
        const newTodo = {
          description: query,
          todo_id: uuidv4(),
        };

        await client.post("/todos", newTodo);

        dispatch(addTodo(newTodo));
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(setQuery(''));
      }
    }
  }

  return (
    <>
      <h1>Todo app</h1>

      <form className="d-flex mt-4 gap-2" onSubmit={handleSubmit}>
        <input
          className="form-control"
          value={query}
          onChange={handleOnChange}
        />

        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};
