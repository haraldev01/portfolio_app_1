export interface IsLikedRequest {
  postId: string;
}

export interface IsLikedResponse {
  postId: string;
  isLiked: boolean;
}
