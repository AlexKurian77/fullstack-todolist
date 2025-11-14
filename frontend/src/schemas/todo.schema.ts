import { z } from "zod";

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  user: string;
}

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;
