import {
  IDay,
  IIngredient,
  ISchedule,
  IRecipe,
  TCalendar,
} from "../Utils/Interfaces";

export const meals: ISchedule[] = [
  { id: "1", name: "Desayuno", time: { hour: 9, minutes: 0 } },
  { id: "2", name: "Almuerzo", time: { hour: 11, minutes: 0 } },
  { id: "3", name: "Comida", time: { hour: 13, minutes: 30 } },
  { id: "4", name: "Merienda", time: { hour: 17, minutes: 15 } },
  { id: "5", name: "Cena", time: { hour: 21, minutes: 0 } },
];

const ingredients: IIngredient[] = [
  { id: "1", name: "Pasta" },
  { id: "2", name: "Tomate" },
];

export const recipes: IRecipe[] = [
  {
    id: "1",
    name: "Leche con cereales",
    ingredients: [],
    schedules: [meals[0]],
  },
  { id: "2", name: "Bocadillo de atún", ingredients: [], schedules: [meals[1]] },
  {
    id: "3",
    name: "Macarrones con tomate",
    ingredients: [ingredients[0], ingredients[1]],
    schedules: [meals[2], meals[4]],
  },
  {
    id: "4",
    name: "Yogur",
    ingredients: [],
    schedules: [meals[3]],
  },
  {
    id: "5",
    name: "Salmón con arroz",
    ingredients: [],
    schedules: [meals[4]],
  },
];

export const today: IDay = {
  date: "02/02/2022",
  meals: [
    { scheduleId: "1", recipeId: "1" },
    { scheduleId: "2", recipeId: "2" },
    { scheduleId: "3", recipeId: "3" },
    { scheduleId: "4", recipeId: "4" },
    { scheduleId: "5", recipeId: "5" },
  ],
};

export const week: TCalendar = [
  {
    date: "01/02/2022",
    meals: [
      { scheduleId: "1", recipeId: "1" },
      { scheduleId: "2", recipeId: "2" },
      { scheduleId: "3", recipeId: "3" },
      { scheduleId: "4", recipeId: "4" },
      { scheduleId: "5", recipeId: "5" },
    ],
  },
  {
    date: "02/02/2022",
    meals: [
      { scheduleId: "1", recipeId: "1" },
      { scheduleId: "2", recipeId: "2" },
      { scheduleId: "3", recipeId: "3" },
      { scheduleId: "4", recipeId: "4" },
      { scheduleId: "5", recipeId: "5" },
    ],
  },
];
