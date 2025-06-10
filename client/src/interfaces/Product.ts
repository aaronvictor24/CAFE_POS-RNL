import type { Category } from "./Category";
import type { Ingredients } from "./Ingredients";

export interface Products {
  product_id: number;
  product: string;
  category: Category;
  unit: string;
  quantity_in_stock: number;
  price: number;
  is_deleted: boolean;
  can_make: boolean;
  ingredients?: Ingredients[];
  created_at: string;
  updated_at: string;
}
