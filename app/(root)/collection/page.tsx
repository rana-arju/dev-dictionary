import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { QuestionFilters } from "@/constants/filter";
import NoResult from "@/components/shared/NoResult";
import QuestionsCard from "@/components/cards/QuestionsCard";
import { auth } from "@clerk/nextjs";
import { getSavedQuestion } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Saved Questions | Dev dictionary",
  description:
    "A community-driven platform for asking and answering questions about software development. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, game development, algorithms, data structures, and more.",
};
export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  const { questions, isNext } = await getSavedQuestion({
    clerkId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionsCard
              _id={question._id}
              title={question.title}
              clerkId={clerkId}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              key={question._id}
            />
          ))
        ) : (
          <NoResult
            title="There’s no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}
