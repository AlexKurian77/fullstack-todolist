import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/todo.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user.id, // comes from JWT payload
    });

    res.json({
      message: "Todo created successfully",
      todo,
    });
  } catch (err) {
    next(err);
  }
};
export const listTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findOne({ _id: id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "No todo found" });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;

    await todo.save();

    res.json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ message: "No todo found" });
    }

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const toggleCompleted = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { completed } = req.body as { completed?: boolean };

    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    if (!todo) {
      return res.status(404).json({ message: "No todo found" });
    }

    if (typeof completed === "boolean") {
      todo.completed = completed;
    } else {
      todo.completed = !todo.completed; // toggle
    }

    await todo.save();

    res.json({
      message: `Todo ${
        todo.completed ? "completed" : "marked incomplete"
      } successfully`,
      todo,
    });
  } catch (err) {
    next(err);
  }
};
