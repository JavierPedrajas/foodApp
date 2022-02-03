import { IIngredient } from ".";

export interface ITime {
  hour: number;
  minutes: number;
}

export interface IMeal {
  id: number;
  name: string;
  time: ITime;
}

export interface IRecipe {
  id: number;
  name: string;
  ingredients: IIngredient[];
  meals: IMeal[];
}
