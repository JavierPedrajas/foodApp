import { ISchedule, IRecipe } from ".";

export interface IMealCalendar {
  scheduleID: string;
  recipeID: string;
}

export interface IDay {
  id: string;
  date: string;
  meals: IMealCalendar[];
}

export interface ICalendarDict {
  [key: string]: IDay;
}
