import api from "./axios";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const signupUser = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const forgotPasswordApi = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPasswordApi = async ({ token, newPassword }: { token: string; newPassword: string }) => {
  const res = await api.post(`/auth/reset-password/${token}`, { newPassword });
  return res.data;
};
