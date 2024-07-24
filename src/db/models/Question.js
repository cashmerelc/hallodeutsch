import mongoose from "mongoose";
import { Schema } from "mongoose";

const questionSchema = new Schema({
  content: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // index of the correct option
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
