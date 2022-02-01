import { IIngredient } from ".";

export interface IGroceryItem {
  item: IIngredient;
  completed?: boolean;
}

export type TList = IGroceryItem[]
