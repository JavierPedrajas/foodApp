import {
  IDay,
  IIngredient,
  IMeal,
  IRecipe,
  TCalendar,
} from "../utils/interfaces";

export const meals: IMeal[] = [
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
    meals: [meals[0]],
  },
  { id: "2", name: "Bocadillo de atún", ingredients: [], meals: [meals[1]] },
  {
    id: "3",
    name: "Macarrones con tomate",
    ingredients: [ingredients[0], ingredients[1]],
    meals: [meals[2], meals[4]],
  },
  {
    id: "4",
    name: "Yogur",
    ingredients: [],
    meals: [meals[3]],
  },
  {
    id: "5",
    name: "Salmón con arroz",
    ingredients: [],
    meals: [meals[4]],
  },
];

export const today: IDay = {
  date: "02/02/2022",
  meals: [
    { mealId: "1", recipeId: "1" },
    { mealId: "2", recipeId: "2" },
    { mealId: "3", recipeId: "3" },
    { mealId: "4", recipeId: "4" },
    { mealId: "5", recipeId: "5" },
  ],
};

export const week: TCalendar = [
  {
    date: "01/02/2022",
    meals: [
      { mealId: "1", recipeId: "1" },
      { mealId: "2", recipeId: "2" },
      { mealId: "3", recipeId: "3" },
      { mealId: "4", recipeId: "4" },
      { mealId: "5", recipeId: "5" },
    ],
  },
  {
    date: "02/02/2022",
    meals: [
      { mealId: "1", recipeId: "1" },
      { mealId: "2", recipeId: "2" },
      { mealId: "3", recipeId: "3" },
      { mealId: "4", recipeId: "4" },
      { mealId: "5", recipeId: "5" },
    ],
  },
];
