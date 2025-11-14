import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "../hooks/useAuthQuery";
import "./ForgotPassword.css";
import { forgotSchema, type ForgotInput } from "../schemas/auth.schema";

export default function ForgotPassword() {
  const forgotMutation = useForgotPassword();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // ⬇ React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotInput) => {
    forgotMutation.mutate(data.email);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-wrapper">
        <div className="gradient-bg"></div>

        <div className="forgot-card">
          {/* Header */}
          <div className="forgot-header">
            <div className="logo-circle">
              <span className="logo-icon">🔓</span>
            </div>
            <h1>Reset Password</h1>
            <p className="subtitle">Enter your email to receive reset link</p>
          </div>

          {/* Description */}
          <p className="description">
            Don’t worry, we’ll help you get back into your account. Enter your
            email address and we’ll send a reset link.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="forgot-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div
                className={`input-wrapper ${
                  focusedField === "email" ? "focused" : ""
                }`}
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

              {/* ⭐ ERROR TEXT FROM ZOD */}
              {errors.email && (
                <p className="error-msg">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="forgot-button"
              disabled={forgotMutation.isPending}
            >
              {forgotMutation.isPending ? (
                <>
                  <span className="spinner"></span>
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="forgot-footer">
            <p>
              Remember your password?{" "}
              <a href="/" className="back-link">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
