import dbConnect from "../../../db/dbConnect";
import Exercise from "../../../db/models/Exercise";
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

        const exercise = await Exercise.create({ ...req.body });
        res.status(201).json({ success: true, data: exercise });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "GET":
      try {
        const exercises = await Exercise.find({}).populate("questions");
        res.status(200).json({ success: true, data: exercises });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
