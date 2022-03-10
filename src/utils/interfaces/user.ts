import { IIngredient, IMeal, IRecipe, TCalendar } from ".";

export interface IUser {
  uid: string;
  email: string;
  config?: IConfig;
}

export interface IConfig {
  // language:string // TB Implemented
  // weekStart: number // TB Implemented
}
