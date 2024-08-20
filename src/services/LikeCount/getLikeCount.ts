import { LikesRequest, LikesResponse } from "./types";

export default async function getLikeCount({
  postId,
}: LikesRequest): Promise<LikesResponse> {
  await new Promise((res) => setTimeout(res, 1000));
  return { postId, likeCount: Math.ceil(Math.random() * 1000) };
}
