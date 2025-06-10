import type { Genders } from "./Genders";

export interface Employees {
  employee_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix_name: string;
  age: number;
  birth_date: string;
  gender: Genders;
  address: string;
  contact_number: string;
  role: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  access: string[];
}
