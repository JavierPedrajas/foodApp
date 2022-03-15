import { IIngredient } from ".";

export interface ITime {
  hour: number;
  minutes: number;
}

export interface IMeal {
  id: string;
  name: string;
  time: ITime;
}

export interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
  meals: IMeal[];
}
