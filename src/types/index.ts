export interface TodoType {
  _id: string;
  title: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  userId: string;
  __v?: number;
}
