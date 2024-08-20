import getNotePost from "@/services/getNotePost";
import PostPage from "../../postPage";

export default async function AudioPage({
  params,
}: {
  params: { noteSlug: string; username: string };
}) {
  const { noteSlug, username } = params;
  const post = await getNotePost(noteSlug, username);
  return <PostPage post={post} />;
}
