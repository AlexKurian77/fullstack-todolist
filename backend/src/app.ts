import authRoutes from "./routes/auth.routes";
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import { errorLogger } from "./middleware/error.middleware";

export const app = express();

app.use(cors());
app.use(express.json());

// Temporary route to test server
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorLogger);