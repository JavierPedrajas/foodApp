import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ingredientsSlice from "lib/store/ingredientsSlice";

export const store = configureStore({
  reducer: {
    ingredientsStore: ingredientsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
