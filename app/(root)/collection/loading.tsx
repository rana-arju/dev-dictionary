import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1 bg-blue-200" />
        <Skeleton className="h-14 w-28 bg-blue-200" />
      </div>

      <div className="flex flex-col gap-6">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl bg-blue-200" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
