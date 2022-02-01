import { IIngredient } from ".";

export interface IMeal {
  id: number;
  name: string;
}

export interface IRecipe {
  name: string;
  ingredients: IIngredient[];
  meals: IMeal[];
}
