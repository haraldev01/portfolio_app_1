import getBatchIsLiked from "./getBatchIsLiked";
import { IsLikedRequest, IsLikedResponse } from "./types";
import { createBatchProcessor } from "@/utils/createBatchProcessor";

const getIdFromIsLiked = (item: IsLikedRequest | IsLikedResponse) => {
  if ("postId" in item) {
    return item.postId;
  }
  throw new Error("Invalid item type");
};

export const getIsLiked = createBatchProcessor<IsLikedRequest, IsLikedResponse>(
  getBatchIsLiked,
  10,
  getIdFromIsLiked,
);
