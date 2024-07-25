import mongoose from "mongoose";
import { Schema } from "mongoose";

const lessonSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.models.Lesson || mongoose.model("Lesson", lessonSchema);

export default Lesson;
