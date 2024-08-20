import PostPage from "../../postPage";
import getAudioPost, { GetAudioPostBySlugProps } from "@/services/getAudioPost";

export default async function AudioPage({
  params,
}: {
  params: GetAudioPostBySlugProps;
}) {
  const post = await getAudioPost(params);
  // audio listens is incremented in audio player context.
  return <PostPage post={post} />;
}
