import mongoose from "mongoose";
import { Schema } from "mongoose";

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Exercise =
  mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema);

export default Exercise;
