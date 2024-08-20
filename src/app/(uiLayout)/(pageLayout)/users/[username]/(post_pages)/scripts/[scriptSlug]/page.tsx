import getScriptPost from "@/services/getScriptPost";
import PostPage from "../../postPage";
import incrementScriptViews from "@/actions/incrementScriptViews";

export default async function AudioPage({
  params,
}: {
  params: { scriptSlug: string; username: string };
}) {
  const { scriptSlug, username } = params;
  const post = await getScriptPost(scriptSlug, username);
  incrementScriptViews({ scriptId: post.scriptId });
  return <PostPage post={post} />;
}
