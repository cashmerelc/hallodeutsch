import dbConnect from "../../../utils/dbConnect";
import Question from "../../../models/Question";
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

        const question = await Question.create({ ...req.body });
        res.status(201).json({ success: true, data: question });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "GET":
      try {
        const questions = await Question.find({});
        res.status(200).json({ success: true, data: questions });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
