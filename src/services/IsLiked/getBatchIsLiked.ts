import { IsLikedRequest, IsLikedResponse } from "./types";

export default async function getBatchIsLiked(
  payload: IsLikedRequest[],
): Promise<Array<IsLikedResponse>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // simulate a 50% chance of being liked
  // real implementation should batch request from API through a POST request
  // this won't be cached, which will reflect the changing nature of like status
  // and that this is individual for the user (uses auth).
  return payload.map((item) => ({
    postId: item.postId,
    isLiked: Math.random() > 0.5,
  }));
}
