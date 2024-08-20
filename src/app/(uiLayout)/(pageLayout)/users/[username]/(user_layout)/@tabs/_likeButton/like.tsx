import { getIsLiked } from "@/services/IsLiked/getIsLiked";
import getLikeCount from "@/services/LikeCount/getLikeCount";
import { Suspense } from "react";
import AwaitText from "../../@userInformation/awaitText";
import formatBigNumber from "@/utils/formatBigNumber";
import LikeButtonServer from "./likeButtonServer";
import { LoadingLikeButton } from "./loadingLikeButton";

export default function Like({
  postId,
  disabled,
}: {
  postId: string;
  disabled?: boolean;
}) {
  const getLikesRequest = getLikeCount({ postId });
  const getIsLikedRequest = getIsLiked({ payload: { postId } });

  return (
    <div className="relative grid grid-cols-[1fr_auto] grid-rows-1 gap-2 items-center justify-center group/likeButton before:block before:absolute before:-inset-2">
      <Suspense
        fallback={
          <div className="h-3 w-10 rounded-md animate-pulse bg-muted-foreground/50" />
        }
      >
        <div className="text-xs sm:text-sm font-semibold">
          <AwaitText
            promise={getLikesRequest}
            extractText={(item) => String(formatBigNumber(item.likeCount))}
          />
        </div>
      </Suspense>
      <Suspense fallback={<LoadingLikeButton />}>
        <LikeButtonServer isLikedPromise={getIsLikedRequest} />
      </Suspense>
    </div>
  );
}
