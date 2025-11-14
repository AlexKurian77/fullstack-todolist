import { useParams } from "react-router-dom";
import { useState } from "react";
import { useResetPassword } from "../hooks/useAuthQuery";
import { useForm } from "react-hook-form";
import { resetSchema, type ResetInput } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();
  const resetMutation = useResetPassword();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = (data: ResetInput) => {
    resetMutation.mutate({
      token: token!,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="reset-container">
      <div className="reset-wrapper">
        <div className="gradient-bg"></div>

        <div className="reset-card">
          {/* Header */}
          <div className="reset-header">
            <div className="logo-circle">
              <span className="logo-icon">🔑</span>
            </div>
            <h1>Create New Password</h1>
            <p className="subtitle">Enter a secure password for your account</p>
          </div>

          {/* Description */}
          <p className="description">
            Please enter a new password that you haven't used before. Make sure
            it's strong and secure.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">New Password</label>

              <div
                className={`input-wrapper ${
                  focusedField === "password" ? "focused" : ""
                }`}
              >
                <span className="input-icon">🔑</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  {...register("newPassword")}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* ⭐ Error message */}
              {errors.newPassword && (
                <p className="error-msg">{errors.newPassword.message}</p>
              )}

              <p className="password-hint">• At least 6 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="reset-button"
              disabled={resetMutation.isPending}
            >
              {resetMutation.isPending ? (
                <>
                  <span className="spinner"></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="reset-footer">
            <p>
              <a href="/" className="back-link">
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
