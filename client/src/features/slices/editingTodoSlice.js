import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editingTodoId: null,
};

export const editingTodoIdSlice = createSlice({
  name: "editingTodoId",
  initialState,
  reducers: {
    setEditingTodoId: (state, action) => {
      state.editingTodoId = action.payload;
    },
  },
});

export const { setEditingTodoId } = editingTodoIdSlice.actions;
export default editingTodoIdSlice.reducer;
