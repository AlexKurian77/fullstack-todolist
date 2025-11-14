import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../api/todo.api";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

export const useCreateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useUpdateTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title: string; description?: string } }) =>
      updateTodo(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useToggleTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });
};
