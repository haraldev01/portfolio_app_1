export interface LikesRequest {
  postId: string;
}

export interface LikesResponse {
  postId: string;
  likeCount: number;
}
