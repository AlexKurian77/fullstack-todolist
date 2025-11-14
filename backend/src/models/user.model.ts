import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    resetToken: { type: String },
    resetTokenExpiry: { type: Number }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
