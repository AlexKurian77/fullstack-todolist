import { Router } from "express";
import { createTodo, deleteTodo, listTodos, toggleCompleted, updateTodo } from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, createTodo);
router.get("/", authMiddleware, listTodos);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.patch("/:id/toggle", authMiddleware, toggleCompleted);
export default router;
