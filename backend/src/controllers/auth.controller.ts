import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists bro" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    res.json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something broke" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Password wrong" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something broke" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    res.json({
      message: "If an account exists with this email, reset link sent",
      resetToken: user ? user._id : null,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something broke" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params; // userId
    const { newPassword } = req.body;

    const user = await User.findById(token);
    if (!user) return res.status(404).json({ message: "Invalid token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something broke" });
  }
};
