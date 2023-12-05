import QuestionsCard from '@/components/cards/QuestionsCard';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getQuestionTag } from '@/lib/actions/tag.action'
import { URLProps } from '@/types';

async function SingleTag({params, searchParams}:URLProps) {
  const { tagTitle, questions , isNext} = await getQuestionTag({
    tagId: params.id,

    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });
    
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 uppercase">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag question"
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionsCard
              _id={question._id}
              title={question.title}
              clerkId={question.author.clerkId}
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
            title="There’s no tag question to show"
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

export default SingleTag