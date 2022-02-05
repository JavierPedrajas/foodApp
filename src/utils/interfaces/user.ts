import { IIngredient, IMeal, IRecipe, TCalendar } from ".";

export interface IUser {
  uuid: string;
  name: string;
  email: string;
  config: IConfig;
  calendar: TCalendar;
  meals: IMeal[];
  ingredients: IIngredient[];
  recipes: IRecipe[];
}

export interface IConfig {
  // language:string // TB Implemented
  // weekStart: number // TB Implemented
}
