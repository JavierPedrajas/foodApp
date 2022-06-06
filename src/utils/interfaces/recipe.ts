import { IIngredient } from ".";

export interface ITime {
  hour: number;
  minutes: number;
}

export interface ISchedule {
  id: string;
  name: string;
  time: ITime;
}

export interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
  schedules: ISchedule[];
}
