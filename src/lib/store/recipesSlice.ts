import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRecipe, IRecipesDict } from "lib/interfaces";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  RECIPES_API,
} from "lib/services";
import { RootState } from ".";

export interface RecipesState {
  recipes: IRecipesDict;
  isLoading: boolean;
}

const initialState: RecipesState = {
  recipes: {},
  isLoading: false,
};

export const getRecipes = createAsyncThunk("recipes/getRecipes", async () => {
  const response = await getItems(RECIPES_API);
  return response as IRecipesDict;
});

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe: IRecipe) => {
    const response = await addItem(RECIPES_API, recipe);
    return response as IRecipesDict;
  }
);

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe: IRecipe) => {
    const response = await updateItem(RECIPES_API, recipe);
    return response as IRecipesDict;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (recipe: IRecipe) => {
    const response = await deleteItem(RECIPES_API, recipe);
    return response as IRecipesDict;
  }
);

export const removeIngredientFromRecipes = createAsyncThunk(
  "recipes/removeIngredientFromRecipes",
  async (
    {
      ingredientId,
      recipes,
    }: {
      ingredientId: string;
      recipes: IRecipe[];
    },
    state
  ) => {
    recipes.forEach((recipe) => {
      if (recipe.ingredientIDs.includes(ingredientId)) {
        const newIngredients = recipe.ingredientIDs.filter(
          (id) => id !== ingredientId
        );
        const newRecipe = { ...recipe, ingredientIDs: newIngredients };
        state.dispatch(updateRecipe(newRecipe));
      }
    });
  }
);

export const removeScheduleFromRecipes = createAsyncThunk(
  "recipes/removeScheduleFromRecipes",
  async (
    {
      scheduleId,
      recipes,
    }: {
      scheduleId: string;
      recipes: IRecipe[];
    },
    state
  ) => {
    recipes.forEach((recipe) => {
      if (recipe.scheduleIDs.includes(scheduleId)) {
        const newSchedules = recipe.scheduleIDs.filter(
          (id) => id !== scheduleId
        );
        const newRecipe = { ...recipe, scheduleIDs: newSchedules };
        state.dispatch(updateRecipe(newRecipe));
      }
    });
  }
);

export const recipesSlice = createSlice({
  name: "recipesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isLoading = false;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isLoading = false;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isLoading = false;
      })
      .addCase(getRecipes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addRecipe.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateRecipe.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteRecipe.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const selectRecipes = (state: RootState) => state.recipesStore.recipes;
export const selectIsLoadingRecipes = (state: RootState) =>
  state.recipesStore.isLoading;

export default recipesSlice.reducer;
