import { BaseModel } from "./base-model";

export interface Task extends BaseModel{
  id: number;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: string;
}
