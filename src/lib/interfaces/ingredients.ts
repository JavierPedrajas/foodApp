export interface IIngredient {
  id: string;
  name: string;
}

export interface IIngredientsDict {
  [key: string]: IIngredient;
}
