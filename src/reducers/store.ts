import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./user/todoSlice";

const rootReducer = combineReducers({
  todos: todoSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
