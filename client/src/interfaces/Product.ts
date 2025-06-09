import type { Category } from "./Category";

export interface Products {
  product_id: number;
  product: string;
  category: Category;
  unit: string;
  stock_quantity: number;
  price: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
