import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ingredientsSlice from "lib/store/ingredientsSlice";
import schedulesSlice from "lib/store/schedulesSlice";

export const store = configureStore({
  reducer: {
    ingredientsStore: ingredientsSlice,
    schedulesStore: schedulesSlice,
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
