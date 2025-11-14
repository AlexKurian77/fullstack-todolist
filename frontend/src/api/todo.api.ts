import api from "./axios";

export const createTodo = async (data: { title: string; description?: string }) => {
  const res = await api.post("/todos/create", data);
  return res.data;
};

export const getTodos = async () => {
  const res = await api.get("/todos");
  return res.data;
};

export const updateTodo = async (id: string, data: { title?: string; description?: string }) => {
  const res = await api.put(`/todos/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};

export const toggleTodo = async (id: string) => {
  const res = await api.patch(`/todos/${id}/toggle`, {});
  return res.data;
};
