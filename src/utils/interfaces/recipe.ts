import { IIngredient } from ".";
import { ISchedule } from "./schedules";

export interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
  schedules: ISchedule[];
}

export interface IRecipeDict {
  [key: string]: IRecipe;
}
