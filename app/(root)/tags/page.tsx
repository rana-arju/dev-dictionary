import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filter";

async function Tags() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> All Tags</h1>

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
        {Tags.length > 0 ? (
          "tag render"
        ) : (
          <NoResult
            title="No Tags Found!"
            description="It looks like there is no tags found!"
            link="/ask-question"
            linkTitle="ASk a question"
          />
        )}
      </section>
    </>
  );
}

export default Tags;
