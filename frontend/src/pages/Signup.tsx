import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "../schemas/auth.schema";
import { useSignup } from "../hooks/useAuthQuery";
import "./Signup.css";

export default function Signup() {
  const signupMutation = useSignup();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupInput) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="gradient-bg"></div>

        <div className="signup-card">
          {/* Header */}
          <div className="signup-header">
            <div className="logo-circle">
              <span className="logo-icon">✨</span>
            </div>
            <h1>Create Account</h1>
            <p className="subtitle">Join us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>

              <div
                className={`input-wrapper ${focusedField === "name" ? "focused" : ""}`}
              >
                <span className="input-icon">👤</span>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {errors.name && (
                <p className="error-msg">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div
                className={`input-wrapper ${focusedField === "email" ? "focused" : ""}`}
              >
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

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div
                className={`input-wrapper ${focusedField === "password" ? "focused" : ""}`}
              >
                <span className="input-icon">🔑</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  {...register("password")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {errors.password && (
                <p className="error-msg">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="signup-button"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <a href="/" className="login-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
