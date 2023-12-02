import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionsCard from "../cards/QuestionsCard";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | undefined;
}
const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { totalQuestions, questions } = await getUserQuestions({
    userId,
  });
  return (
    <>
      {questions.map((question) => (
        <QuestionsCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionTab;
