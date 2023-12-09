import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";
import { getAllUser } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "All Users | Dev Connected",
  description:
    "A community-driven platform for asking and answering questions about software development. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, game development, algorithms, data structures, and more.",
};
async function Community({ searchParams }: SearchParamsProps) {
  const { users, isNext } = await getAllUser({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  

  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazine minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4  ">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user}></UserCard>)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto  max-w-4xl text-center">
            <p>No users yet</p>
            <Link href={"/sign-up"} className="mt-5 font-bold text-accent-blue">
              Join to be first!
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}

export default Community;
