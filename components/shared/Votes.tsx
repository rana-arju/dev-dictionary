"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/intraction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatBigNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  upvotes: number;
  downvotes: number;
  userId: string;
  itemId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

function Votes({
  type,
  upvotes,
  downvotes,
  userId,
  itemId,
  hasupVoted,
  hasdownVoted,
  hasSaved,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please Login!",
        description: "You must be logged in for vote!",
      });
    }
    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
      toast({
        title: `Upvote ${!hasupVoted ? "added" : "removed"} 🎉`,
        variant: !hasupVoted ? "default" : "destructive",
      });
    }
    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasdownVoted,
          hasupVoted,
          path: pathname,
        });
      }
      toast({
        title: `Downvote ${!hasdownVoted ? "added" : "removed"} 🎉`,
        variant: !hasdownVoted ? "default" : "destructive",
      });
    }
  };
  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };
  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="vote icon"
            height={18}
            width={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-md p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="vote icon"
            height={18}
            width={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-md p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatBigNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="vote icon"
          height={18}
          width={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
}
export default Votes;
