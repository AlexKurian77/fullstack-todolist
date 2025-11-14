import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Type proper email"),
  password: z.string().min(6, "Password must be 6+ chars"),
});
export const signupSchema = z.object({
  name: z.string().min(2, "Type at least 2 letters"),
  email: z.string().email("Type a valid email"),
  password: z.string().min(6, "Password must be 6 chars minimum"),
});
export const forgotSchema = z.object({
  email: z.string().email("Type a valid email"),
});
export const resetSchema = z.object({
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type ResetInput = z.infer<typeof resetSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotInput = z.infer<typeof forgotSchema>;
