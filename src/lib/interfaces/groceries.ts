import { IIngredient } from ".";

export interface IGroceryItem {
  id: string;
  completed?: boolean;
}

export interface IGroceryDict {
  [key: string]: IGroceryItem;
}
