import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuthQuery";
import "./Login.css";

export default function Login() {
  const loginMutation = useLogin();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="gradient-bg"></div>

        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="logo-circle">
              <span className="logo-icon">🔐</span>
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div className={`input-wrapper ${focusedField === "email" ? "focused" : ""}`}>
                <span className="input-icon">📧</span>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {errors.email && (
                <p className="error-msg">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className={`input-wrapper ${focusedField === "password" ? "focused" : ""}`}>
                <span className="input-icon">🔑</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {errors.password && (
                <p className="error-msg">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="forgot-password">
              <a href="/forgot-password">Forgot your password?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="login-button" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? (
                <>
                  <span className="spinner"></span> Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="signup-link">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
