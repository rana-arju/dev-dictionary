import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";

async function RightSidebar() {
  
  const popularTags = [
    {
      _id: "1",
      name: "Javascript",
      totalQuestion: 5,
    },
    {
      _id: "2",
      name: "Next Js",
      totalQuestion: 4,
    },
    {
      _id: "3",
      name: "React Js",
      totalQuestion: 10,
    },
    {
      _id: "4",
      name: "Node Js",
      totalQuestion: 8,
    },
    {
      _id: "5",
      name: "MongoDb",
      totalQuestion: 14,
    },
  ];

  const hotQuestion = await getHotQuestions();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestion.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                width={20}
                height={20}
                className="invert-colors"
                alt="arrow"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              name={tag.name}
              totalQuestion={tag.totalQuestion}
              _id={tag._id}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
