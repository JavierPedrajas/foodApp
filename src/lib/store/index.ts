import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ingredientsSlice from "lib/store/ingredientsSlice";
import recipesSlice from "lib/store/recipesSlice";
import schedulesSlice from "lib/store/schedulesSlice";

export const store = configureStore({
  reducer: {
    ingredientsStore: ingredientsSlice,
    schedulesStore: schedulesSlice,
    recipesStore: recipesSlice,
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
