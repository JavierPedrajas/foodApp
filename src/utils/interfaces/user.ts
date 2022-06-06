import { LangType } from "context/LangContext";
import { IIngredient, ISchedule, IRecipe, TCalendar } from ".";

export interface IUser {
  uid: string;
  email: string;
  config: IConfig;
}

export interface IConfig {
  language: LangType;
  // weekStart: number // TB Implemented
}
