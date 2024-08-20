import { IsLikedResponse } from "@/services/IsLiked/types";
import LikeButton from "./likeButton";

export default async function LikeButtonServer({
  isLikedPromise,
}: {
  isLikedPromise: Promise<IsLikedResponse>;
}) {
  const { isLiked: initIsLiked, postId } = await isLikedPromise;
  return <LikeButton isLiked={initIsLiked} postId={postId} />;
}
