export interface IRecipe {
  id: string;
  name: string;
  ingredientIDs: string[];
  scheduleIDs: string[];
}

export interface IRecipesDict {
  [key: string]: IRecipe;
}
