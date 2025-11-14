import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  signupUser,
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/auth.api";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import type { LoginInput, SignupInput } from "../schemas/auth.schema";

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate("/todos");
    },
    onError: () => {
      alert("Wrong email or password");
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupInput) => signupUser(data),
    onSuccess: () => {
      alert("Signup successful! Login now!");
      navigate("/");
    },
    onError: () => {
      alert("Signup failed! Email may already exist");
    },
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      // navigate to reset password page
      navigate(`/reset-password/${data.resetToken}`);
    }
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      alert("Password reset successfully");
      navigate("/");
    }
  });
};