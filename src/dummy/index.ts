import {
  IDay,
  ICalendarDict,
  IRecipeDict,
  IIngredientsDict,
  ISchedulesDict,
} from "../lib/interfaces";

export const meals: ISchedulesDict = {
  "1": { id: "1", name: "Desayuno", time: { hours: 9, minutes: 0 } },
  "2": { id: "2", name: "Almuerzo", time: { hours: 11, minutes: 0 } },
  "3": { id: "3", name: "Comida", time: { hours: 13, minutes: 30 } },
  "4": { id: "4", name: "Merienda", time: { hours: 17, minutes: 15 } },
  "5": { id: "5", name: "Cena", time: { hours: 21, minutes: 0 } },
};

export const ingredients: IIngredientsDict = {
  "1": { id: "1", name: "Pasta" },
  "2": { id: "2", name: "Tomate" },
};

export const recipes: IRecipeDict = {
  "1": {
    id: "1",
    name: "Leche con cereales",
    ingredientIDs: [],
    scheduleIDs: ["1"],
  },
  "2": {
    id: "2",
    name: "Bocadillo de atún",
    ingredientIDs: [],
    scheduleIDs: ["2"],
  },
  "3": {
    id: "3",
    name: "Macarrones con tomate",
    ingredientIDs: ["1", "2"],
    scheduleIDs: ["3", "5"],
  },
  "4": {
    id: "4",
    name: "Yogur",
    ingredientIDs: [],
    scheduleIDs: ["4"],
  },
  "5": {
    id: "5",
    name: "Salmón con arroz",
    ingredientIDs: [],
    scheduleIDs: ["5"],
  },
};

export const today: IDay = {
  id: "1",
  date: "02/02/2022",
  meals: [
    { scheduleID: "1", recipeID: "1" },
    { scheduleID: "2", recipeID: "2" },
    { scheduleID: "3", recipeID: "3" },
    { scheduleID: "4", recipeID: "4" },
    { scheduleID: "5", recipeID: "5" },
  ],
};

export const week: ICalendarDict = {
  "1": {
    id: "1",
    date: "01/02/2022",
    meals: [
      { scheduleID: "1", recipeID: "1" },
      { scheduleID: "2", recipeID: "2" },
      { scheduleID: "3", recipeID: "3" },
      { scheduleID: "4", recipeID: "4" },
      { scheduleID: "5", recipeID: "5" },
    ],
  },
  "2": {
    id: "2",
    date: "02/02/2022",
    meals: [
      { scheduleID: "1", recipeID: "1" },
      { scheduleID: "2", recipeID: "2" },
      { scheduleID: "3", recipeID: "3" },
      { scheduleID: "4", recipeID: "4" },
      { scheduleID: "5", recipeID: "5" },
    ],
  },
};
