import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

async function EditQuestion({ params }: ParamsProps) {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  const { question } = await getQuestionById({ questionId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark200_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
}

export default EditQuestion;
