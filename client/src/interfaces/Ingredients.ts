import type { Category } from "./Category";

export interface Ingredients {
  ingredient_id: number;
  name: string;
  category: Category;
  unit: string; // e.g., grams, ml, pcs
  cost_per_unit: number;
  quantity_in_stock: number;
  low_stock_threshold: number | null;
  status: string; // "In Stock", "Low", etc.
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
