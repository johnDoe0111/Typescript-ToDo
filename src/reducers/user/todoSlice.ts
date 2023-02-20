import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodos, todoState } from "../../types/ITodos";
import { getTodos, addTodos, deleteTodos, changeTodos } from "./todoAction";

const initialState: todoState = {
  todos: [],
  isAddLoading: false,
  isDelLoading: false,
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTodos.fulfilled,
      (state, action: PayloadAction<ITodos[]>) => {
        state.todos = action.payload;
      }
    );
    builder.addCase(addTodos.pending, (state) => {
      state.isAddLoading = true;
    });
    builder.addCase(
      addTodos.fulfilled,
      (state, action: PayloadAction<ITodos>) => {
        state.todos.push(action.payload);
        state.isAddLoading = false;
      }
    );
    builder.addCase(deleteTodos.pending, (state) => {
      state.isDelLoading = true;
    });
    builder.addCase(
      deleteTodos.fulfilled,
      (state, action: PayloadAction<ITodos["_id"]>) => {
        state.todos = state.todos.filter((i) => i._id !== action.payload);
        state.isDelLoading = false;
      }
    );
    builder.addCase(
      changeTodos.fulfilled,
      (state, action: PayloadAction<ITodos>) => {
        state.todos = state.todos.map((i) =>
          i._id === action.payload._id ? action.payload : i
        );
      }
    );
  },
});

export default TodoSlice.reducer;
