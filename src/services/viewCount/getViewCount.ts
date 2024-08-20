import { ViewsRequest, ViewsResponse } from "./types";

export default async function getViewCount({
  postId,
}: ViewsRequest): Promise<ViewsResponse> {
  await new Promise((res) => setTimeout(res, 1000));
  return {
    postId,
    viewCount: Math.floor(Math.random() * 10000),
  };
}
