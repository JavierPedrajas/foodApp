import { IMeal, IRecipe } from ".";

export interface IMealCalendar {
  mealId: number;
  recipeId: number;
}

export interface IDay {
  date: string;
  meals: IMealCalendar[];
}

export type TCalendar = IDay[];
