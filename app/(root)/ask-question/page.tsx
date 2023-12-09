import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ask Question | Dev Dictionary",
  description:
    "A community-driven platform for asking and answering questions about software development. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, game development, algorithms, data structures, and more.",
};
async function AskQuestion() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
}

export default AskQuestion;
