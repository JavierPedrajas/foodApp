import {
  IDay,
  ICalendarDict,
  IRecipeDict,
  IIngredientsDict,
  IScheduleDict,
} from "../lib/interfaces";

export const meals: IScheduleDict = {
  "1": { id: "1", name: "Desayuno", time: { hour: 9, minutes: 0 } },
  "2": { id: "2", name: "Almuerzo", time: { hour: 11, minutes: 0 } },
  "3": { id: "3", name: "Comida", time: { hour: 13, minutes: 30 } },
  "4": { id: "4", name: "Merienda", time: { hour: 17, minutes: 15 } },
  "5": { id: "5", name: "Cena", time: { hour: 21, minutes: 0 } },
};

const ingredients: IIngredientsDict = {
  "1": { id: "1", name: "Pasta" },
  "2": { id: "2", name: "Tomate" },
};
export const recipes: IRecipeDict = {
  "1": {
    id: "1",
    name: "Leche con cereales",
    ingredients: [],
    schedules: [meals[0]],
  },
  "2": {
    id: "2",
    name: "Bocadillo de atún",
    ingredients: [],
    schedules: [meals[1]],
  },
  "3": {
    id: "3",
    name: "Macarrones con tomate",
    ingredients: [ingredients[0], ingredients[1]],
    schedules: [meals[2], meals[4]],
  },
  "4": {
    id: "4",
    name: "Yogur",
    ingredients: [],
    schedules: [meals[3]],
  },
  "5": {
    id: "5",
    name: "Salmón con arroz",
    ingredients: [],
    schedules: [meals[4]],
  },
};

export const today: IDay = {
  id: "1",
  date: "02/02/2022",
  meals: [
    { scheduleId: "1", recipeId: "1" },
    { scheduleId: "2", recipeId: "2" },
    { scheduleId: "3", recipeId: "3" },
    { scheduleId: "4", recipeId: "4" },
    { scheduleId: "5", recipeId: "5" },
  ],
};

export const week: ICalendarDict = {
  "1": {
    id: "1",
    date: "01/02/2022",
    meals: [
      { scheduleId: "1", recipeId: "1" },
      { scheduleId: "2", recipeId: "2" },
      { scheduleId: "3", recipeId: "3" },
      { scheduleId: "4", recipeId: "4" },
      { scheduleId: "5", recipeId: "5" },
    ],
  },
  "2": {
    id: "2",
    date: "02/02/2022",
    meals: [
      { scheduleId: "1", recipeId: "1" },
      { scheduleId: "2", recipeId: "2" },
      { scheduleId: "3", recipeId: "3" },
      { scheduleId: "4", recipeId: "4" },
      { scheduleId: "5", recipeId: "5" },
    ],
  },
};
