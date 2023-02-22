import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../api/api";
import { setEditingTodoId } from "../features/slices/editingTodoSlice";
import { deleteTodo, updateTodo } from "../features/slices/todosSlice";

export const EditTodo = ({ todoId }) => {
  const [newQuery, setNewQuery] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log(newQuery);
      if (!newQuery) {
        await client.delete(`/todos/${todoId}`);

        dispatch(deleteTodo(todoId));

        return;
      }

      client.put(`/todos/${todoId}`, {
        description: newQuery,
      });

      dispatch(updateTodo({ todoId, newQuery }));
      dispatch(setEditingTodoId(null));
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnChange(e) {
    setNewQuery(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-3">
      <input
        className="form-control edit-input"
        value={newQuery}
        onChange={handleOnChange}
      />

      <button className="btn btn-warning my-btn">Rename</button>
    </form>
  );
};
