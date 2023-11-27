"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { question, content, author, path } = params;
    const newAnswer = await Answer.create({
      question,
      content,
      author,
    });

  
    await Question.findByIdAndUpdate(question, {
      $push: { answer: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
