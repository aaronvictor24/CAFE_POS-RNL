export interface Order {
  order_id: number;
  employee_id: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
  // Remove order_number, order_date, items
}
