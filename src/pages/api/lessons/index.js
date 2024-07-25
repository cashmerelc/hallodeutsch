import dbConnect from "../../../db/dbConnect";
import Lesson from "../../../db/models/Lesson";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const lesson = await Lesson.create({ ...req.body });
        res.status(201).json({ success: true, data: lesson });
      } catch (error) {
        console.log("POST Error: ", error);
        res.status(400).json({ success: false, error });
      }
      break;
    case "GET":
      try {
        const lessons = await Lesson.find({}).populate("exercises");
        res.status(200).json({ success: true, data: lessons });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
