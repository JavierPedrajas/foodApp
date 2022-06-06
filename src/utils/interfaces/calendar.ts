import { IMeal, IRecipe } from ".";

export interface IMealCalendar {
  mealId: string;
  recipeId: string;
}

export interface IDay {
  date: string;
  meals: IMealCalendar[];
}

export type TCalendar = IDay[];
