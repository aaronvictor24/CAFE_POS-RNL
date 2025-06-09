import type { Ingredients } from "./Ingredients";

export interface ProductIngredient {
  product_ingredient_id: number;
  product_id: number;
  ingredient_id: number;
  quantity_required: number | string;
  ingredient: Ingredients; // full ingredient object for display
  created_at: string;
  updated_at: string;
}
