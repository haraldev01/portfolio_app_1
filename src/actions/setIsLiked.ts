"use server";

export default async function setIsLiked({
  postId,
  isLiked,
}: {
  postId: string;
  isLiked: boolean;
}) {
  console.log((isLiked ? "like " : "unlike ") + postId);
  await new Promise((res) => setTimeout(res, 500));
  return { success: true };
}
