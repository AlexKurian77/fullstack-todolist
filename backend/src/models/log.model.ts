import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  stack: string;
  route: string;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  message: { type: String, required: true },
  stack: { type: String, required: true },
  route: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Log = mongoose.model<ILog>("Log", logSchema);
