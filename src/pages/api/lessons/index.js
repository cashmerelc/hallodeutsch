import dbConnect from "../../../utils/dbConnect";
import Lesson from "../../../models/Lesson";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const session = await getSession({ req });
        if (!session) {
          return res
            .status(401)
            .json({ success: false, message: "Not authenticated" });
        }

        const lesson = await Lesson.create({ ...req.body });
        res.status(201).json({ success: true, data: lesson });
      } catch (error) {
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
