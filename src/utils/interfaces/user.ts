import { IIngredient, IMeal, IRecipe, TCalendar } from ".";

export interface IUser {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  config: IConfig;
}

export interface IConfig {
  meals: IMeal[];
  ingredients: IIngredient[];
  recipes: IRecipe[];
  calendar: TCalendar;
  // language:string // TB Implemented
  // weekStart: number // TB Implemented
}
