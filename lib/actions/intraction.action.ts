"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Intraction from "@/database/intraction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
   await connectToDatabase();
    const { userId, questionId } = params;
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    if (userId) {
      const existingIntraction = await Intraction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingIntraction) {
        return console.log("user already viewed!");
        ;
      }
      await Intraction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
