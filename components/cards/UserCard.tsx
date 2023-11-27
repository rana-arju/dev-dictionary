import { getTopintractedTag } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
    reputation: number;
    saved: string[];
    joinedAt: Date;
  };
}
async function UserCard({ user }: Props) {
  const tags = await getTopintractedTag({ userId: user._id });
  console.log(tags);

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full  max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200  light-border flex  w-full flex-col items-center justify-center rounded-2xl  border p-8">
        <Image
          src={user.picture}
          alt={user.name}
          height={100}
          width={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {tags.length > 0 ? <div className="flex items-center gap-2">
            {
                tags.map(tag => <RenderTag key={tag._id} _id = {tag._id} name={tag.name} />)
            }
          </div> : <Badge>No tags yet!</Badge>}
        </div>
      </article>
    </Link>
  );
}

export default UserCard;
