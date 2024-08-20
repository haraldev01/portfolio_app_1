import getViewCount from "@/services/viewCount/getViewCount";
import { PostType } from "@/types/post";
import { HeadphonesIcon, GlassesIcon } from "lucide-react";

export default async function ViewCount({
  postType,
  postId,
  willIncrement = false,
}: {
  postType: PostType;
  postId: string;
  willIncrement?: boolean;
}) {
  const { viewCount } = await getViewCount({ postId });

  if (viewCount === null) throw new Error("viewCount is null");

  return (
    <div className="grid grid-rows-1 col-span-2 grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr] gap-2 items-center justify-center">
      {postType === "audio" ? (
        <HeadphonesIcon
          stroke="hsl(var(--muted-foreground))"
          className="w-5 h-5 m-0.5"
        />
      ) : (
        <GlassesIcon
          stroke="hsl(var(--muted-foreground))"
          className="w-5 h-5 m-0.5"
        />
      )}
      <div className="text-xs sm:text-sm font-semibold">
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumSignificantDigits: 3,
        }).format(viewCount)}
      </div>
    </div>
  );
}
