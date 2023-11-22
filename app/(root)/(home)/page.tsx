import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filter";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionsCard from "@/components/cards/QuestionsCard";
export default function Home() {
  const questions = [
    {
      _id: "afdsdf",
      title: "Redux Toolkit Not Updating State as Expected",
      tags: [
        { _id: "asdfafd", name: "react js" },
        { _id: "asdafda", name: "redux" },
      ],
      author: {
        _id: "adasdfa",
        name: "Rana Arju",
        picture:
          "https://res.cloudinary.com/db8l1ulfq/image/upload/v1686970331/g19pc3lv7duuzevggsqh.jpg",
      },
      upvotes: 108345,
      views: 100232345,
      answers: [],
      createdAt: new Date(
        "Wed Nov 22 2023 20:52:41 GMT+0600 (Bangladesh Standard Time)"
      ),
    },
    {
      _id: "sdfad",
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
      tags: [
        { _id: "asfdasf", name: "react js" },
        { _id: "asdfasdf", name: "Next js" },
      ],
      author: {
        _id: "adasdfa",
        name: "Rana Arju",
        picture:
          "https://res.cloudinary.com/db8l1ulfq/image/upload/v1686970331/g19pc3lv7duuzevggsqh.jpg",
      },
      upvotes: 30,
      views: 500,
      answers: [],
      createdAt: new Date(
        "Wed Nov 22 2023 18:54:19 GMT+0600 (Bangladesh Standard Time)"
      ),
    },
  ];
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for question"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionsCard
              _id={question._id}
              title={question.title}
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
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
