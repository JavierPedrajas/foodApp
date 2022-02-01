import { IMeal, IRecipe } from ".";

export interface IMealCalendar {
  meal: IMeal;
  recipe: IRecipe;
}

export interface IDay {
  date: string;
  meals: IMealCalendar[];
}

export interface IWeek {
  startDate: string;
  endDate: string;
  days: IDay[];
}
