import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIngredient, IIngredientsDict } from "lib/interfaces";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  INGREDIENTS_API,
} from "lib/services";
import { RootState } from "./";

export interface IngredientsState {
  ingredients: IIngredientsDict;
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: {},
  isLoading: false,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    const response = await getItems(INGREDIENTS_API);
    return response as IIngredientsDict;
  }
);

export const addIngredient = createAsyncThunk(
  "ingredients/addIngredient",
  async (ingredient: IIngredient) => {
    const response = await addItem(INGREDIENTS_API, ingredient);
    return response as IIngredientsDict;
  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/updateIngredient",
  async (ingredient: IIngredient) => {
    const response = await updateItem(INGREDIENTS_API, ingredient);
    return response as IIngredientsDict;
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/deleteIngredient",
  async (ingredient: IIngredient) => {
    const response = await deleteItem(INGREDIENTS_API, ingredient);
    return response as IIngredientsDict;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredientsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(updateIngredient.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addIngredient.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateIngredient.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteIngredient.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const selectIngredients = (state: RootState) =>
  state.ingredientsStore.ingredients;
export const selectIsLoadingIngredients = (state: RootState) =>
  state.ingredientsStore.isLoading;

export default ingredientsSlice.reducer;
