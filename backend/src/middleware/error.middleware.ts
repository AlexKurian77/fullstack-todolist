import { Request, Response, NextFunction } from "express";
import { Log } from "../models/log.model";

export const errorLogger = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Log.create({
      message: err.message || "Unknown error",
      stack: err.stack || "",
      route: req.originalUrl,
      timestamp: new Date()
    });
  } catch (loggingError) {
    console.error("Failed to log error:", loggingError);
  }

  return res.status(500).json({
    message: "Something broke",
    error: err.message
  });
};
