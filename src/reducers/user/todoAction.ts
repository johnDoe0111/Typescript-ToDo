import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";
import { ITodos } from "../../types/ITodos";

export const getTodos = createAsyncThunk("get/todos", async () => {
  const res = await fetch(`${baseUrl}/todos`);
  return await res.json();
});

export const addTodos = createAsyncThunk<ITodos, string>(
  "set/todos",
  async (title: string) => {
    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return await res.json();
  }
);

export const deleteTodos = createAsyncThunk(
  "del/todos",
  async (_id: string) => {
    fetch(`${baseUrl}/todos/${_id}`, {
      method: "DELETE",
    });
    return _id;
  }
);

export const changeTodos = createAsyncThunk(
  "change/todos",
  async (todo: ITodos) => {
    const res = await fetch(`${baseUrl}/todos/${todo._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return await res.json();
  }
);
