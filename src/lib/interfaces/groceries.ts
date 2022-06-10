import { IIngredient } from ".";

export interface IGroceryItem {
  ingredientID: string;
  completed?: boolean;
}

export interface IGroceryDict {
  [key: string]: IGroceryItem;
}
