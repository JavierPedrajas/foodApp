export interface IIngredient {
  id: string;
  name: string;
}

export interface IIngredientDict {
  [key: string]: IIngredient;
}
