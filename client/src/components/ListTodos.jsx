import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../api/api";
import { setEditingTodoId } from "../features/slices/editingTodoSlice";
import { deleteTodo } from "../features/slices/todosSlice";
import { EditTodo } from "./EditTodo";

export const ListTodos = ({ todos }) => {
  const dispatch = useDispatch();
  const todoEditingId = useSelector(state => state.editingId.editingTodoId);
  const query = useSelector((state) => state.query.query);

  async function handleDelete(todoId) {
    try {
      await client.delete(`/todos/${todoId}`);

      dispatch(deleteTodo(todoId))
    } catch (error) {
      console.log(error);
    }
  }

  // function handleOnClick(todoId) {
  //   dispatch(setEditingTodoId(todoId));
  // }

  return (
    <div className="mt-4">
      <ul className="list">
        {todos.map((todo) => {
          const { todo_id, description } = todo;
          const isCurrentTodoEditing = todoEditingId === todo_id;

          return (
            <li key={todo_id} className="mt-3">
              {isCurrentTodoEditing ? (
                <EditTodo query={query} todoId={todo_id} />
              ) : (
                <p>{description}</p>
              )}

              <div className="d-flex gap-3">
                {!isCurrentTodoEditing && (
                  <button
                    className="btn btn-warning my-btn"
                    // onClick={handleOnClick(todo_id)}
                    onClick={() => {
                      dispatch(setEditingTodoId(todo_id))
                    }}
                  >
                    Edit
                  </button>
                )}

                {!isCurrentTodoEditing && (
                  <button
                    type="button"
                    className="close btn"
                    aria-label="Close"
                    onClick={() => handleDelete(todo_id)}>
                    <span aria-hidden="true" className="close-btn">
                      &times;
                    </span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
