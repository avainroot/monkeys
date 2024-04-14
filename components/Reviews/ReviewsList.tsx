import { getReviews } from "@/lib/api";
import { ReviewCard } from "./ReviewCard";

export const ReviewsList = async () => {
  const reviews = await getReviews();
  return (
    <div className="grid gap-[22px] lg:gap-[34px] md:grid-cols-2">
      {reviews.map(({ id, text }) => (
        <ReviewCard key={id} content={text} />
      ))}
    </div>
  );
};
