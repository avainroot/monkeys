import DOMPurify from "isomorphic-dompurify";

export const ReviewCard = ({ content }: { content: string }) => {
  return (
    <div
      className="rounded-[15px] bg-paper lg:py-[20px] lg:px-[27px] py-[24px] px-[19px] [&>p]:my-4"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};
